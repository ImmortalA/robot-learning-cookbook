## G1 Stand Docs Site – MkDocs Material

This repository contains a standalone **MkDocs Material** documentation site for the `g1_stand` Isaac Lab extension.

The live site is available at:

- [`https://immortala.github.io/robot-learning-cookbook/`](https://immortala.github.io/robot-learning-cookbook/)

- MkDocs config: `mkdocs.yml` (at repo root)
- Docs source: `docs/`
- Output (after build): `site/` (ignored by git by default, if configured)

The docs describe how to create and train a **G1 humanoid standing task on flat terrain** using the `g1_stand` extension, without modifying IsaacLab core.

---

## 1. Install MkDocs and mkdocs-material

Install the required Python packages (ideally in a docs or dev environment):

```bash
pip install mkdocs mkdocs-material pymdown-extensions
```

These provide:

- `mkdocs` – the static site generator
- `mkdocs-material` – the Material theme
- `pymdown-extensions` – extra markdown features (superfences, details, etc.)

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

There are two ways to deploy:

- **Automatic deploy (recommended)** – via GitHub Actions (runs on every push to `main`)
- **Manual deploy** – run `mkdocs gh-deploy` yourself

### 4.1. Automatic deploy via GitHub Actions

This repository includes `.github/workflows/docs.yml`, which:

- Installs MkDocs and dependencies
- Builds the site
- Publishes it to the `gh-pages` branch using `mkdocs gh-deploy`

Once you push to `main` on GitHub, the workflow will run and update the live site at:

- `https://immortala.github.io/robot-learning-cookbook/`

You can see workflow runs under the **Actions** tab in GitHub.

### 4.2. Manual deploy with `mkdocs gh-deploy`

From the **repository root**:

```bash
mkdocs gh-deploy
```

This will:

- Build the site
- Push the generated static content to the `gh-pages` branch of your repository
- Update the GitHub Pages site

---

## 5. Editing the docs

- All content lives under `docs/`:
  - `index.md` – landing page
  - `01_overview.md` … `10_troubleshooting.md` – tutorial chapters
  - `docs/images/` – put tutorial figures here and reference them from the markdown files
- The navigation and theme configuration live in `mkdocs.yml`.

To add new pages:

1. Create a new `.md` file under `docs/`.
2. Add it to the `nav:` section in `mkdocs.yml`.

Then run `mkdocs serve` to preview changes locally.

