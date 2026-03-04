## G1 Stand Docs Site – MkDocs Material

This folder contains a standalone **MkDocs Material** documentation site for the `g1_stand` Isaac Lab extension.

- MkDocs config: `mkdocs.yml`
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

From the **`docs_site/`** directory:

```bash
cd docs_site
mkdocs serve
```

MkDocs will start a local development server, typically at:

- `http://127.0.0.1:8000/`

Changes you make in `docs/` will be auto-reloaded in the browser.

---

## 3. Build the static site

To build a static version of the site (HTML, CSS, JS) into the `site/` folder:

```bash
cd docs_site
mkdocs build
```

This generates:

- `docs_site/site/` – a self-contained static website that you can serve from any static host.

---

## 4. Deploy to GitHub Pages

MkDocs has built-in support for deploying to GitHub Pages via a single command.

### 4.1. Prerequisites

- Your repository is hosted on GitHub.
- You have git remotes set up (for example, `origin`).
- You have permission to push to the repository.

### 4.2. Deploy with `mkdocs gh-deploy`

From the **`docs_site/`** directory:

```bash
cd docs_site
mkdocs gh-deploy
```

This will:

- Build the site
- Push the generated static content to the `gh-pages` branch of your repository
- Optionally configure GitHub Pages to serve from that branch

After the command completes, visit your project’s GitHub Pages URL, typically:

- `https://<your-username>.github.io/<your-repo-name>/`

> **Tip**  
> You can customize the GitHub Pages settings (source branch/folder) in the repository’s **Settings → Pages** in the GitHub UI if needed.

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

