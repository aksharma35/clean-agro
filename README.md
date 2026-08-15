# Clean Agro

One Vite project, two pages:

| URL | What it is | Source |
| --- | --- | --- |
| `/` | The public marketing site | `index.html` + `src/site/` (plain HTML/CSS/JS) |
| `/portal/` | The farmer portal — sign in to see soil test results | `portal/index.html` + `src/portal/` (React 18) |

Both deploy together to GitHub Pages on every push to `main`, served from the
custom domain `cleanagro.xyz` (the `public/CNAME` file plus the domain
configured in Settings → Pages):

- Site → `https://cleanagro.xyz/`
- Portal → `https://cleanagro.xyz/portal/`

## Run it

```bash
npm install
npm run dev      # http://localhost:5173 (site) and /portal/ (portal)
npm test         # Vitest
npm run lint     # ESLint
npm run build    # production build into dist/
```

Or open the repo directly in StackBlitz:
`https://stackblitz.com/github/aksharma35/clean-agro/tree/main`

Test account: `sunil@cleanagro.in` / `Nashik@2024`

## Structure

```
clean-agro/
├─ index.html                 Marketing page (markup only)
├─ portal/
│  └─ index.html              Portal page shell
├─ public/
│  └─ CNAME                   Custom domain, copied into the build
├─ src/
│  ├─ site/
│  │  ├─ site.css             Marketing styles (design tokens in :root)
│  │  └─ main.js              Nav toggle, scroll reveal, stat counters, form
│  └─ portal/
│     ├─ main.jsx             React entry point
│     ├─ App.jsx              Swaps login for dashboard on success
│     ├─ styles.css           Design tokens shared with the marketing site
│     ├─ api/auth.js          Mock sign-in API (900ms delay, resolves or rejects)
│     ├─ components/
│     │  ├─ Shell.jsx         Brand nav and footer
│     │  ├─ LoginForm.jsx     Email/password sign-in with validation
│     │  └─ SoilDashboard.jsx Post-login soil readings
│     └─ test/
│        ├─ setup.js          jest-dom matchers, cleanup between tests
│        ├─ smoke.test.jsx    Proves the harness is green
│        └─ login-form.test.jsx  One block per SCRUM-2 acceptance criterion
├─ vite.config.js             Two-page build + Vitest config
└─ eslint.config.js           ESLint flat config (+ Prettier via .prettierrc.json)
```

`LoginForm.jsx` takes a single prop:

```js
onSignedIn(farmer)   // call with the object resolved by signIn()
```

It validates email and password before calling `signIn()`, reports field
problems inline and service errors in a banner above the form, and disables the
submit button while a request is in flight.

## Deployment

`.github/workflows/deploy.yml` installs, tests, and builds on every push to
`main`, then publishes `dist/` to GitHub Pages. If the tests fail, nothing
deploys.

`.github/workflows/ci.yml` runs install, lint, test, and build on every pull
request, so a PR shows green or red before it merges.

### One-time Pages setup

Settings → Pages → Build and deployment → Source: **GitHub Actions**.

(Not "Deploy from a branch" — the build step is what compiles the portal.)

---

*Clean Agro is a fictional company; all names, numbers, readings, and contact
details are illustrative.*
