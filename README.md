## MechaOctopus – MkDocs Material

**Live site:** [mechaoctopus.com](https://mechaoctopus.com)

This repository contains the **MechaOctopus** documentation site—hands-on Isaac Lab tutorials for training humanoid robots (built with MkDocs Material).

- MkDocs config: `mkdocs.yml` (at repo root)
- Docs source: `docs/`
- Output (after build): `site/` (ignored by git by default, if configured)

The docs describe how to create and train a **G1 humanoid standing task on flat terrain** using the `g1_stand` extension, without modifying IsaacLab core.

---

## 1. Install MkDocs, Material, and mike

Install the required Python packages (ideally in a docs or dev environment):

```bash
pip install mkdocs mkdocs-material pymdown-extensions mike
```

These provide:

- `mkdocs` – the static site generator
- `mkdocs-material` – the Material theme
- `pymdown-extensions` – extra markdown features (superfences, details, etc.)
- `mike` – versioned documentation publishing for MkDocs

> **Note**  
> You do **not** need Isaac Lab to be installed in the same environment as MkDocs.  
> MkDocs only reads markdown and YAML files; it does not execute your Python code.

---

## 2. Serve the docs locally

From the **repository root**:

```bash
mkdocs serve
```

MkDocs will start a local development server, typically at:

- `http://127.0.0.1:8000/`

Changes you make in `docs/` will be auto-reloaded in the browser.

---

## 3. Build the static site

To build a static version of the site (HTML, CSS, JS) into the `site/` folder from the repo root:

```bash
mkdocs build
```

This generates:

- `site/` – a self-contained static website that you can serve from any static host.

---

## 4. Deploy to GitHub Pages

This site uses **mike** for versioned documentation, so users can switch between versions such as:

- `latest`
- `v0.1`
- `v0.2`

There are two ways to deploy:

- **Automatic deploy (recommended)** – via GitHub Actions (runs on every push to `main`)
- **Manual deploy** – run `mkdocs gh-deploy` yourself

### 4.1. Automatic deploy via GitHub Actions

This repository includes `.github/workflows/docs.yml`, which:

- Installs MkDocs, Material, and `mike`
- Builds and publishes versioned docs to the `gh-pages` branch
- Updates `latest` on pushes to `main`
- Publishes tagged releases like `v0.1` and `v0.2` when you push tags

Once you push to `main` on GitHub, the workflow will run and update the `latest` version at:

- `https://mechaoctopus.com/`

When you push a tag such as `v0.1`, `mike` will publish that version as a selectable entry in the version switcher.

You can see workflow runs under the **Actions** tab in GitHub.

### 4.2. Manual deploy with `mike`

From the **repository root**:

```bash
mike deploy latest
mike set-default latest
```

This will:

- Build the site
- Publish the `latest` version to the `gh-pages` branch
- Set `latest` as the default version on GitHub Pages

To publish a tagged version manually, run:

```bash
mike deploy v0.1
mike set-default latest
```

To preview the versioned site locally, run:

```bash
mike serve
```

---

## 5. Deploy to Netlify (with custom domain)

This repo includes `netlify.toml` for one-click deploy to [Netlify](https://netlify.com).

1. **Connect the repo:** Sign in to Netlify → Add new site → Import from Git → choose this repo.
2. **Build settings** (auto-detected from `netlify.toml`):
   - Build command: `pip install -r requirements-docs.txt && mkdocs build --strict`
   - Publish directory: `site`
3. **Custom domain:** After deploy, go to **Site settings → Domain management → Add custom domain** → add `mechaoctopus.com`. Netlify will show DNS records to add at your registrar (CNAME or A records).
4. **HTTPS:** Netlify provisions a free SSL certificate automatically once the domain is verified.

---

## 6. Editing the docs

- All content lives under `docs/`:
  - `docs/index.md` – landing page (Home)
  - `docs/tutorials/g1-standing-ppo/` – G1 standing tutorial:
    - `index.md` – overview
    - `env_config.md`, `gym_registration.md`, `ppo_config.md`, `training.md`, `visualization.md`, `troubleshooting.md` – step pages
  - `docs/tutorials/<tutorial-name>/images/` – put tutorial figures here and reference them from the tutorial’s markdown (e.g. `images/figure.png`).
- The navigation and theme configuration live in `mkdocs.yml`.

To add new pages:

1. Create a new `.md` file under `docs/` (e.g. under `docs/tutorials/` for a new tutorial).
2. Add it to the `nav:` section in `mkdocs.yml`.

Then run `mkdocs serve` to preview changes locally.

