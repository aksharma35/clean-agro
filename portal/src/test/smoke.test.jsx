import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Shell from '../components/Shell.jsx';
import SoilDashboard from '../components/SoilDashboard.jsx';
import { signIn } from '../api/auth.js';

// These exist so the test harness is provably green before any
// feature work starts. They do not test the login form.

describe('portal shell', () => {
  it('renders the brand and a way back to the main site', () => {
    render(<Shell><p>hello</p></Shell>);
    expect(screen.getByText('Clean Agro')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to the main site/i })).toBeInTheDocument();
  });
});

describe('soil dashboard', () => {
  it('greets the signed-in farmer and lists their plots', () => {
    render(
      <SoilDashboard
        farmer={{ name: 'Sunil Gaikwad', village: 'Ozar, Nashik', farmerId: 'CA-MH-04821' }}
        onSignOut={() => {}}
      />
    );
    expect(screen.getByRole('heading', { name: /namaste, sunil gaikwad/i })).toBeInTheDocument();
    expect(screen.getByText(/plot a/i)).toBeInTheDocument();
    expect(screen.getByText(/plot b/i)).toBeInTheDocument();
  });
});

describe('auth api', () => {
  it('resolves with the farmer for the demo account', async () => {
    const farmer = await signIn({ email: 'sunil@cleanagro.in', password: 'Nashik@2024' });
    expect(farmer.farmerId).toBe('CA-MH-04821');
  });

  it('rejects with a message safe to show the farmer', async () => {
    await expect(signIn({ email: 'sunil@cleanagro.in', password: 'wrong' }))
      .rejects.toThrow(/do not match/i);
  });
});
