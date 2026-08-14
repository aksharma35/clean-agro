# Clean Agro — Company Website

A single-file, dependency-free website for **Clean Agro**, a residue-free farming company from Nashik, Maharashtra. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no framework — so it runs anywhere, including GitHub Pages.

## What's inside

- `index.html` — the entire site (styles and scripts embedded)
- Sections: seed-packet hero, crop ticker, company story + timeline, what we do, audited impact stats, Kharif/Rabi harvest calendar, farmer voices, contact form, footer
- Google Fonts (Young Serif, Karla, IBM Plex Mono) loaded from CDN
- Responsive down to mobile, keyboard-focus styles, and `prefers-reduced-motion` respected

## Run it locally

Just open `index.html` in a browser. That's it.

## Deploy on GitHub Pages

1. Create a new repository on GitHub (e.g. `clean-agro`).
2. Upload `index.html` (and this README) to the repository root, on the `main` branch.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set Source to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
5. Wait a minute — your site goes live at `https://<your-username>.github.io/clean-agro/`.

Alternatively, name the repository `<your-username>.github.io` and the site will live at the root URL.

## Making the contact form actually send

GitHub Pages hosts static files only, so the form currently shows a confirmation without sending anything. To receive real submissions:

1. Create a free form at [formspree.io](https://formspree.io) and copy your endpoint URL.
2. In `index.html`, replace the click handler at the bottom with a `fetch()` POST to that endpoint, or wrap the fields in `<form action="https://formspree.io/f/YOUR_ID" method="POST">`.

## Customising

All design tokens live at the top of the `<style>` block in `:root` — colours, fonts, and spacing. Company copy (story, stats, calendar, testimonials) is plain HTML in each section.

---

*Clean Agro is a fictional company; all names, numbers, and contact details are illustrative.*
