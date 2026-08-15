import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App.jsx';
import LoginForm, { validateCredentials } from '../components/LoginForm.jsx';
import { signIn, DEMO_ACCOUNT } from '../api/auth.js';

// The real sign in implementation is kept — it is wrapped in a spy so the
// "no sign in attempt is made" criteria can be asserted on call count while
// the success and failure paths still exercise the actual API.
vi.mock('../api/auth.js', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, signIn: vi.fn(actual.signIn) };
});

// signIn() waits 900ms before settling, so anything awaiting a settled
// request needs more headroom than the 1000ms findBy default.
const SETTLE_TIMEOUT = { timeout: 3000 };

// Exact labels: the reveal control's accessible name is "Show password", so a
// loose /password/i would match both it and the field itself.
const emailField = () => screen.getByLabelText('Email');
const passwordField = () => screen.getByLabelText('Password');
// Matches both "Sign in" and the in-flight "Signing in...".
const submitButton = () => screen.getByRole('button', { name: /sign(ing)? in/i });
const revealToggle = () => screen.getByRole('button', { name: /(show|hide) password/i });
const forgotControl = () => screen.getByRole('button', { name: /forgot password/i });

function renderForm() {
  const onSignedIn = vi.fn();
  const user = userEvent.setup();
  render(<LoginForm onSignedIn={onSignedIn} />);
  return { user, onSignedIn };
}

beforeEach(() => {
  signIn.mockClear();
});

describe('AC1 — email and password are both required', () => {
  it('shows an error under each field and makes no sign in attempt when both are empty', async () => {
    const { user, onSignedIn } = renderForm();

    await user.click(submitButton());

    expect(emailField()).toHaveAccessibleDescription('Enter your email');
    expect(passwordField()).toHaveAccessibleDescription('Enter your password');
    expect(signIn).not.toHaveBeenCalled();
    expect(onSignedIn).not.toHaveBeenCalled();
  });

  it('flags only the password when the email is filled in', async () => {
    const { user } = renderForm();

    await user.type(emailField(), DEMO_ACCOUNT.email);
    await user.click(submitButton());

    expect(passwordField()).toHaveAccessibleDescription('Enter your password');
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
    expect(signIn).not.toHaveBeenCalled();
  });

  it('flags only the email when the password is filled in', async () => {
    const { user } = renderForm();

    await user.type(passwordField(), DEMO_ACCOUNT.password);
    await user.click(submitButton());

    expect(emailField()).toHaveAccessibleDescription('Enter your email');
    expect(screen.queryByText('Enter your password')).not.toBeInTheDocument();
    expect(signIn).not.toHaveBeenCalled();
  });
});

describe('AC2 — the email has to look like an email', () => {
  it('rejects an address with no dot in the domain and does not submit', async () => {
    const { user } = renderForm();

    await user.type(emailField(), 'sunil@cleanagro');
    await user.type(passwordField(), DEMO_ACCOUNT.password);
    await user.click(submitButton());

    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
    expect(emailField()).toHaveAccessibleDescription('Enter a valid email address');
    expect(emailField()).toHaveAttribute('aria-invalid', 'true');
    expect(signIn).not.toHaveBeenCalled();
  });

  it('applies the same rules when called directly', () => {
    expect(validateCredentials({ email: '', password: '' })).toEqual({
      email: 'Enter your email',
      password: 'Enter your password',
    });
    expect(validateCredentials({ email: 'sunil@cleanagro', password: 'x' })).toEqual({
      email: 'Enter a valid email address',
    });
    expect(validateCredentials({ email: '   ', password: 'x' })).toEqual({
      email: 'Enter your email',
    });
    expect(validateCredentials(DEMO_ACCOUNT)).toEqual({});
  });
});

describe('AC3 — the button reports progress and cannot be clicked twice', () => {
  it('reads "Signing in..." and is disabled while the request is in flight', async () => {
    const { user } = renderForm();

    await user.type(emailField(), DEMO_ACCOUNT.email);
    await user.type(passwordField(), DEMO_ACCOUNT.password);
    await user.click(submitButton());

    expect(submitButton()).toHaveTextContent('Signing in...');
    expect(submitButton()).toBeDisabled();

    await user.click(submitButton());

    expect(signIn).toHaveBeenCalledTimes(1);
  });
});

describe('AC4 — wrong credentials surface the service error', () => {
  it('shows the message in a banner above the form and keeps the typed values', async () => {
    const { user, onSignedIn } = renderForm();

    await user.type(emailField(), DEMO_ACCOUNT.email);
    await user.type(passwordField(), 'not-my-password');
    await user.click(submitButton());

    const banner = await screen.findByRole('alert', {}, SETTLE_TIMEOUT);
    expect(banner).toHaveTextContent(
      'That email and password do not match. Check both and try again.'
    );

    // "above the form" — the banner precedes the form in document order.
    const form = document.querySelector('form');
    expect(banner.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(emailField()).toHaveValue(DEMO_ACCOUNT.email);
    expect(passwordField()).toHaveValue('not-my-password');
    expect(submitButton()).toBeEnabled();
    expect(onSignedIn).not.toHaveBeenCalled();
  });
});

describe('AC6-8 — revealing the typed password', () => {
  it('masks the password by default and offers to show it', () => {
    renderForm();

    expect(passwordField()).toHaveAttribute('type', 'password');
    expect(revealToggle()).toHaveTextContent('Show');
    expect(revealToggle()).toHaveAttribute('aria-controls', 'login-password');
  });

  it('reveals the password and then offers the opposite action', async () => {
    const { user } = renderForm();

    await user.type(passwordField(), DEMO_ACCOUNT.password);
    await user.click(revealToggle());

    expect(passwordField()).toHaveAttribute('type', 'text');
    expect(revealToggle()).toHaveTextContent('Hide');
    expect(revealToggle()).toHaveAccessibleName('Hide password');
  });

  it('re-masks the password when activated a second time', async () => {
    const { user } = renderForm();

    await user.type(passwordField(), DEMO_ACCOUNT.password);
    await user.click(revealToggle());
    await user.click(revealToggle());

    expect(passwordField()).toHaveAttribute('type', 'password');
    expect(revealToggle()).toHaveAccessibleName('Show password');
  });

  it('keeps the typed password intact across both directions', async () => {
    const { user } = renderForm();

    await user.type(passwordField(), DEMO_ACCOUNT.password);
    await user.click(revealToggle());
    expect(passwordField()).toHaveValue(DEMO_ACCOUNT.password);

    await user.click(revealToggle());
    expect(passwordField()).toHaveValue(DEMO_ACCOUNT.password);
  });

  it('never submits the form or triggers validation', async () => {
    const { user, onSignedIn } = renderForm();

    // Both fields empty: if the toggle submitted, validation errors would appear.
    await user.click(revealToggle());

    expect(signIn).not.toHaveBeenCalled();
    expect(onSignedIn).not.toHaveBeenCalled();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
    expect(screen.queryByText('Enter your password')).not.toBeInTheDocument();
  });
});

describe('Forgot password — placeholder, intentionally inert', () => {
  // The reset flow is not built. These lock the placeholder's behaviour so it
  // cannot quietly start doing something, and so its inertness reads as a
  // decision rather than an oversight.
  it('is present and marked unavailable to assistive technology', () => {
    renderForm();

    expect(forgotControl()).toBeInTheDocument();
    expect(forgotControl()).toHaveAttribute('aria-disabled', 'true');
  });

  it('is not a link and so navigates nowhere', () => {
    renderForm();

    expect(forgotControl().tagName).toBe('BUTTON');
    expect(forgotControl()).not.toHaveAttribute('href');
    expect(forgotControl()).toHaveAttribute('type', 'button');
  });

  it('does nothing when activated — no submit, no validation, no sign in', async () => {
    const { user, onSignedIn } = renderForm();

    await user.type(emailField(), DEMO_ACCOUNT.email);
    await user.type(passwordField(), DEMO_ACCOUNT.password);
    await user.click(forgotControl());

    expect(signIn).not.toHaveBeenCalled();
    expect(onSignedIn).not.toHaveBeenCalled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    // The form is untouched — nothing was cleared or reset.
    expect(emailField()).toHaveValue(DEMO_ACCOUNT.email);
    expect(passwordField()).toHaveValue(DEMO_ACCOUNT.password);
  });
});

describe('AC5 — the demo account reaches the dashboard', () => {
  it('lands the farmer on the soil dashboard, greeted by name', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Email'), DEMO_ACCOUNT.email);
    await user.type(screen.getByLabelText('Password'), DEMO_ACCOUNT.password);
    await user.click(submitButton());

    expect(
      await screen.findByRole('heading', { name: /namaste, sunil gaikwad/i }, SETTLE_TIMEOUT)
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
  });
});
