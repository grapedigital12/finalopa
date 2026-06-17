# OPALUXE — React Edition

A React (Vite) rebuild of the OPALUXE luxury-fashion demo site. Same look, same
animations, same hand-drawn SVG dress illustrations, same shopping flow
(browse to add to bag to checkout to confirmation) - now built as a proper
component-based React app instead of a single static HTML file.

Verified: clean `npm install` -> `npm run build` -> zero lint errors, and a
full headless-browser run through every screen (home -> collection -> add to
cart -> checkout -> order confirmation) with zero console/runtime errors.

Note: this app has only one URL ("/"). Switching between Home / Collection /
Checkout / Thank-you is done with React state, not the browser History API,
so there is no client-side routing to misconfigure and no "404 on refresh"
risk on any static host.

## Getting started

    npm install
    npm run dev        # local dev server with hot reload
    npm run build       # production build, outputs to dist/
    npm run preview     # preview the production build locally

## Project structure

    src/
      main.jsx                 entry point
      App.jsx                  top-level layout + page router
      index.css                all design tokens & component styles (ported 1:1 from the original CSS)
      context/
        AppContext.jsx          cart, current page, current collection, toast, popup state
      hooks/
        useFadeUp.js             IntersectionObserver hook powering the on-scroll fade-up effect
      data/
        collections.js          product/collection data + price formatter
      components/
        Nav.jsx, Toast.jsx, CartDrawer.jsx, WelcomePopup.jsx
        HomePage.jsx, Hero.jsx, Marquee.jsx, CollectionsSection.jsx, BrandStory.jsx, Footer.jsx
        CollectionPage.jsx, ProductCard.jsx, ShowcaseItem.jsx
        CheckoutPage.jsx, ThankYouPage.jsx
        DressSVG.jsx, HeroGown.jsx, CollectionArt.jsx, DecorativeArt.jsx   (hand-drawn SVG art)

---

## Deploying

You'll need to do the actual hosting-account steps yourself (connecting a
GitHub repo to Vercel/Netlify, enabling Pages, etc.) - I can't sign into
those dashboards for you. Everything below is copy/paste-able and the repo
is already configured for all three.

### 1. Push this project to a GitHub repo first (needed for all 3 options)

    git init
    git add .
    git commit -m "Opaluxe React rebuild"
    git branch -M main
    git remote add origin https://github.com/<your-username>/<your-repo>.git
    git push -u origin main

### 2A. Vercel (fastest, zero config)

Vercel auto-detects Vite — no config file needed.

- Dashboard: go to vercel.com -> "Add New Project" -> import your GitHub repo -> Deploy.
- Or via CLI:

      npm i -g vercel
      vercel        # follow prompts, picks up `npm run build` + `dist` automatically
      vercel --prod

You'll get a live `*.vercel.app` URL immediately, and every push to `main`
auto-deploys a new version.

### 2B. Netlify

A `netlify.toml` is already included (`build = "npm run build"`,
`publish = "dist"`).

- Dashboard: app.netlify.com -> "Add new site" -> "Import an existing project" -> pick your repo -> Deploy.
- Or via CLI:

      npm i -g netlify-cli
      netlify deploy --build          # draft preview URL
      netlify deploy --build --prod   # production URL

### 2C. GitHub Pages

Two ways — pick one:

**Automatic (recommended):** a workflow at
`.github/workflows/deploy.yml` is already included. After you push to
GitHub:

1. Repo Settings -> Pages -> under "Build and deployment", set Source to
   **GitHub Actions**.
2. Since this is a project site (`https://<user>.github.io/<repo>/`), open
   `vite.config.js` and uncomment/set:

       base: '/<your-repo-name>/',

3. Commit + push. The workflow builds and deploys automatically on every
   push to `main` — the live URL appears in the Pages settings page and in
   the workflow run summary.

**Manual (one-off):**

    npm run deploy

This builds the app and pushes `dist/` to a `gh-pages` branch via the
`gh-pages` package (already installed as a dev dependency). Then enable
Pages in Settings with Source = "Deploy from a branch" → `gh-pages`.

---

State (cart contents, which "page" is showing, which collection is open, toast
messages) lives in `AppContext` and is consumed via the `useApp()` hook —
this replaces the original's global variables and `document.getElementById`
calls with normal React state and props.
