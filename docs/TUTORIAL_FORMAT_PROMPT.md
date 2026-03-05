# Prompt: Use this format for new tutorials

When creating a new tutorial in this docs site, follow the same structure and style as the **G1 standing PPO** tutorial (`docs/tutorials/g1-standing-ppo/`). Copy this prompt into your instructions when drafting or reviewing new tutorial content.

---

## 1. Tutorial structure

- **One overview page** (`index.md`): title, short intro, **“Why start with this task?”** (one short paragraph: why this task is a good first step—e.g. minimal stable behavior, clear feedback loop, extends to harder tasks), “You will” bullet list, **Prerequisites**, **Tutorial flow** (numbered list matching the step pages), and a note to use the sidebar nav.
- **Step pages**: one page per major step. Use the heading pattern **`## Step N – Short title`** (e.g. `## Step 1 – Define the Standing Environment`).
- **Optional final page**: **Troubleshooting** with a **“Where things live”** line at the top (see §5), then symptom → explanation → fix, using admonitions for the “do this” parts.

---

## 2. Page layout for each step

For each step page, use this order:

1. **Title**: `## Step N – …`
2. **Short intro** (1–3 paragraphs): what this step does and why, in plain language. Use **bold** for key terms. Optionally list what the reader will create or edit.
3. **Horizontal rule**: `---`
4. **Action section**:
   - For “create/edit file + paste code” steps: use **`### Steps`** and a single **`!!! success "…"`** admonition whose title describes the action (e.g. “Create and paste env config (`filename.py`)”). Inside: numbered steps (1. Create/edit file, 2. Paste code, 3. Verify if needed). Put the full code block **immediately after** the admonition.
   - For “run a command” steps: use **`### Run`** and a **`!!! success "Descriptive title"`** (e.g. “Start training (headless)”) with the command(s) inside. Add optional variants in **`!!! note "…"`** blocks.
5. **Horizontal rule** before explanation (if needed).
6. **Explanation section**: **`### What this does`** (or “What this configuration does” only if you need the longer phrase). Use bullet points and sub-bullets; include short code snippets where they help. Do **not** repeat the full paste block here.
7. **Checklist**: **`### Checklist`** with a short bullet list of what to confirm after the step (e.g. “File defines X and Y”, “Import runs without errors”). Optionally add **one line** on what the reader will see or verify later (e.g. “When you run training (Step 4), the trainer will use this env” or “You’ll confirm it worked in Step 4 when you run `train.py` and training starts.”).
8. **Figures** (optional): **`### Figure – … (placeholder)`** with italic note like “_Add the actual image file under `docs/tutorials/<tutorial-name>/images/`_”, then the image markdown and a `> **Figure:**` caption.

---

## 3. Admonitions (callouts)

Use MkDocs Material admonitions only (no raw blockquotes for callouts):

- **`!!! success "Title"`** – Main actions the reader must do. Title must be **specific** (e.g. “Create and paste env config (`g1_stand_env_cfg.py`)”, “Run play script (loads latest checkpoint)”), not generic like “Do this”.
- **`!!! note "Title"`** – Optional or alternative actions (e.g. “Load a specific run/checkpoint”, “Override max iterations from CLI”).
- **`!!! tip "Title"`** – Tips, tuning hints, or hardware notes (e.g. “Tuning PPO”, “Hardware tip”).
- **`!!! warning "Title"`** – Important caveats or common mistakes (e.g. “Important”, “Common mistake – …”).

All admonition content must be indented with **4 spaces**. Use descriptive titles; avoid repeating “Do this” on every block.

---

## 4. Terminology and style

- **Isaac Lab**: always two words (not “IsaacLab”), including “Isaac Lab core”.
- **Extension project root**: when referring to the repo root where the extension lives, say “extension project root” and show the placeholder as **`<G1_STAND_ROOT>`** (or the relevant placeholder for that tutorial, e.g. `<MY_EXT_ROOT>`). **Define it once** (e.g. on the home page or tutorial overview): “That path is **`<G1_STAND_ROOT>`**” or “**`<G1_STAND_ROOT>`** = the root of your extension project (the folder containing `source/`, `scripts/`, `logs/`, etc.).”
- **“Create an Isaac Lab project”**: if you say this, add one sentence so newbies know what it means: e.g. “That means having a project folder (often named or containing the extension, e.g. `g1_stand`) with the structure expected by Isaac Lab, and knowing its path—that path is `<G1_STAND_ROOT>`.”
- **“Environment”**: when you mean the RL task (robot, scene, rewards), disambiguate once (e.g. in “What this does” for registration): “Here, ‘environment’ means the RL task (robot + rewards), not your Python/conda environment.”
- **Cross-references**: point to other steps by name and section, e.g. “see **Visualization → Inspect training with TensorBoard**” or “when you run training (Step 4)”.
- **Placeholder image paths**: use `docs/tutorials/<tutorial-slug>/images/` (e.g. `docs/tutorials/g1-standing-ppo/images/`) in placeholder notes.

---

## 5. Troubleshooting page format

- **Start with “Where things live”**: right after the intro, add one line so lost readers know where files and commands live: “All paths below are relative to **`<G1_STAND_ROOT>`** (the root of your extension project). For example: `source/g1_stand/...`, `scripts/rsl_rl/...`, `logs/rsl_rl/...`.”
- Use **`### Short issue name (optional code term)`** for each issue (e.g. `### Environment not found (UnregisteredEnv)`).
- For each issue include:
  - **Symptom:** (bold) then error text or description, optionally in a ` ```text ` block.
  - **Explanation:** or **Possible causes and fixes:** where it helps.
  - **Fix:** then one or more **`!!! success "Descriptive action title"`** blocks with the exact command or code change (e.g. “Reinstall the extension”, “Reduce parallel envs (e.g. 512)”). Keep the fix self-contained inside the admonition.

---

## 6. Navigation and nav order

- Add the new tutorial under **Tutorials** in `mkdocs.yml`, with an **Overview** (`index.md`) and step pages in order. Match the “Tutorial flow” list on the overview page so step numbers align.

---

## 7. Checklist before publishing

- [ ] Every reader action is in a **`!!! success`** or **`!!! note`** admonition with a **specific title** (no generic “Do this”).
- [ ] No blockquote callouts (`> **Note**` etc.); all callouts use **`!!! type "Title"`** admonitions.
- [ ] “Isaac Lab” (two words) and “extension project root” used consistently.
- [ ] **`<G1_STAND_ROOT>`** (or tutorial placeholder) is **defined once** (home page or overview); “Create an Isaac Lab project” is clarified (folder + path).
- [ ] Where “environment” means the RL task, it’s disambiguated from Python/conda env (e.g. one sentence in “What this does”).
- [ ] Step pages have **Steps** or **Run** → code/commands → **What this does** → **Checklist** (and optional Figure). Checklists optionally include “what you’ll see/verify in a later step.”
- [ ] Troubleshooting page starts with a **“Where things live”** line (paths relative to `<G1_STAND_ROOT>`).
- [ ] Tutorial flow on the overview page matches the step pages and nav.
- [ ] Overview includes a short **“Why start with this task?”** (or equivalent) if it’s the recommended first tutorial.
- [ ] Placeholder figure paths use `docs/tutorials/<tutorial-slug>/images/`.

Use the existing **G1 standing PPO** tutorial under `docs/tutorials/g1-standing-ppo/` as the reference implementation for this format.
