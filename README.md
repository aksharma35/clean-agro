# Clean Agro

Two things live in this repository:

| Path | What it is | Stack |
| --- | --- | --- |
| `index.html` | The public marketing site | Plain HTML/CSS/JS, no build step |
| `portal/` | The farmer portal — sign in to see soil test results | Vite + React + Vitest |

Both deploy together to GitHub Pages on every push to `main`:

- Site → `https://<user>.github.io/clean-agro/`
- Portal → `https://<user>.github.io/clean-agro/portal/`

The marketing site is still a single dependency-free file. Nothing about it
changed except one nav link pointing at the portal.

---

## The marketing site

Open `index.html` in a browser. That's it — no build, no server.

Sections: seed-packet hero, crop ticker, company story and timeline, what we do,
audited impact stats, Kharif/Rabi harvest calendar, farmer voices, contact form,
footer. Design tokens live in `:root` at the top of the `<style>` block.

## The farmer portal

```bash
cd portal
npm install
npm run dev      # http://localhost:5173
npm test         # Vitest
npm run build    # production build into portal/dist
```

Test account: `sunil@cleanagro.in` / `Nashik@2024`

### Structure

```
portal/
├─ index.html
├─ vite.config.js          Vite + Vitest config, Pages base path
└─ src/
   ├─ main.jsx             React entry point
   ├─ App.jsx              Swaps login for dashboard on success
   ├─ styles.css           Design tokens shared with the marketing site
   ├─ api/auth.js          Mock sign-in API (900ms delay, resolves or rejects)
   ├─ components/
   │  ├─ Shell.jsx         Brand nav and footer
   │  ├─ LoginForm.jsx     ← not built yet
   │  └─ SoilDashboard.jsx Post-login soil readings
   └─ test/
      ├─ setup.js          jest-dom matchers, cleanup between tests
      └─ smoke.test.jsx    Proves the harness is green
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

`.github/workflows/deploy.yml` installs, tests, and builds the portal, copies
`index.html` and `portal/dist` into one artifact, and publishes it. If the tests
fail, nothing deploys.

`.github/workflows/ci.yml` runs the same install, test, and build on every pull
request, so a PR shows green or red before it merges.

### One-time Pages setup

Settings → Pages → Build and deployment → Source: **GitHub Actions**.

(Not "Deploy from a branch" — the portal needs a build step, and the workflow
handles it.)

## Running a branch in CodeSandbox

Import the repository from GitHub and pick the branch. `.codesandbox/tasks.json`
installs `portal/` dependencies and starts the dev server automatically, so the
preview matches whatever branch is open.

---

*Clean Agro is a fictional company; all names, numbers, readings, and contact
details are illustrative.*
