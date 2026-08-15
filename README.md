# Clean Agro

One Vite project, two pages:

| URL | What it is | Source |
| --- | --- | --- |
| `/` | The public marketing site | `index.html` + `src/site/` (plain HTML/CSS/JS) |
| `/portal/` | The farmer portal — sign in to see soil test results | `portal/index.html` + `src/portal/` (React 18) |

Both deploy together to GitHub Pages on every push to `main`:

- Site → `https://aksharma35.github.io/clean-agro/`
- Portal → `https://aksharma35.github.io/clean-agro/portal/`

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
│     │  ├─ LoginForm.jsx     ← not built yet
│     │  └─ SoilDashboard.jsx Post-login soil readings
│     └─ test/
│        ├─ setup.js          jest-dom matchers, cleanup between tests
│        └─ smoke.test.jsx    Proves the harness is green
├─ vite.config.js             Two-page build + Vitest config
└─ eslint.config.js           ESLint flat config (+ Prettier via .prettierrc.json)
```

`LoginForm.jsx` is a placeholder. It renders a "not built yet" card and is the
one piece of this codebase that has not been written. Its contract with the rest
of the app is a single prop:

```js
onSignedIn(farmer)   // call with the object resolved by signIn()
```

Everything else about it — markup, fields, validation rules, error copy, submit
behaviour — comes from the ticket that specifies it.

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
