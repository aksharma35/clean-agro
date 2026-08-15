import { useState } from 'react';
import { signIn } from '../api/auth.js';

// A domain without a dot is not a deliverable address, so `sunil@cleanagro`
// is rejected while `sunil@cleanagro.in` passes.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Exported so the rules can be exercised directly, not only through the form.
export function validateCredentials({ email, password }) {
  const errors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = 'Enter your email';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Enter your password';
  }

  return errors;
}

export default function LoginForm({ onSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    const errors = validateCredentials({ email, password });
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormError('');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const farmer = await signIn({ email, password });
      // The parent swaps this form for the dashboard, so `submitting` stays
      // true — the button never flashes back to "Sign in" on the way out.
      onSignedIn(farmer);
    } catch (error) {
      setFormError(error.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="eyebrow">Farmer portal</span>
        <h1>Sign in</h1>
        <p>See your soil test results, field visit notes, and payment records.</p>
      </div>

      {formError && (
        <div className="banner banner-error" role="alert">
          {formError}
        </div>
      )}

      {/* noValidate: the browser's own bubble would pre-empt the copy the ticket specifies. */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={fieldErrors.email ? 'true' : undefined}
            aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
          />
          {fieldErrors.email && (
            <span className="field-error" id="login-email-error">
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={fieldErrors.password ? 'true' : undefined}
            aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
          />
          {fieldErrors.password && (
            <span className="field-error" id="login-password-error">
              {fieldErrors.password}
            </span>
          )}
        </div>

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="form-note">
        Trouble signing in? Call your field officer on +91 253 000 0000.
      </p>
    </div>
  );
}
