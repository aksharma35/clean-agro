// Stand-in for the real Clean Agro farmer API.
// Resolves with the signed-in farmer, or rejects with an Error whose
// message is safe to show in the interface.
//
// Test accounts:
//   sunil@cleanagro.in / Nashik@2024   → succeeds
//   anything else                      → rejects after the same delay

const ACCOUNTS = {
  'sunil@cleanagro.in': {
    password: 'Nashik@2024',
    farmer: {
      name: 'Sunil Gaikwad',
      village: 'Ozar, Nashik',
      farmerId: 'CA-MH-04821',
    },
  },
};

const NETWORK_DELAY_MS = 900;

export function signIn({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const account = ACCOUNTS[String(email).trim().toLowerCase()];
      if (!account || account.password !== password) {
        reject(new Error('That email and password do not match. Check both and try again.'));
        return;
      }
      resolve(account.farmer);
    }, NETWORK_DELAY_MS);
  });
}

export const DEMO_ACCOUNT = {
  email: 'sunil@cleanagro.in',
  password: 'Nashik@2024',
};
