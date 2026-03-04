## Step 5 – Visualize and Inspect the Learned Policy

After (or even during) training, you can:

- Run the **play** script to visually inspect what the policy has learned.
- Use **TensorBoard** to inspect training curves and debug issues.

All commands in this step are run from the **extension project root** (`<G1_STAND_ROOT>`).

---

### 5.1 Play the policy in Isaac Lab

Conceptually, the play environment:

- Loads a trained checkpoint.
- Spawns one (or a few) G1 humanoids on flat ground.
- Lets you observe whether the robot can maintain an upright, still stance without falling.

#### Basic play command

```bash
python scripts/rsl_rl/play.py --task G1-Stand-Flat-Play-v0
```

This:

- Uses the play configuration `G1StandFlatPlayEnvCfg`:
  - Fewer environments (e.g., 1).
  - Larger env spacing.
  - Longer episodes.
  - No observation corruption.
  - No random pushes.
- Loads the latest checkpoint for the experiment:
  - `g1_stand_flat`
  from the logs directory.

#### What you should see

When training has gone well, you should see:

- A G1 humanoid robot spawned on a flat plane.
- The robot generally upright, with only small corrective motions.
- Occasional small sways or foot adjustments, but **no continuous walking** or drifting.

If the robot immediately falls or walks away, go to the troubleshooting step and review the checklist for “Robot not standing still”.

#### Loading a specific run/checkpoint

If you have multiple runs under `logs/rsl_rl/g1_stand_flat/`, you may want to load a specific run and checkpoint, for example:

- `logs/rsl_rl/g1_stand_flat/2026-03-03_17-31-37/model_1400.pt`

Depending on your `play.py` script’s CLI options (usually similar to `train.py`), you can often specify:

```bash
python scripts/rsl_rl/play.py \
  --task G1-Stand-Flat-Play-v0 \
  --load_run 2026-03-03_17-31-37 \
  --load_checkpoint model_1400.pt
```

> **Note**  
> If the `play.py` script in your Isaac Lab version uses slightly different flags for loading checkpoints, adapt the options to match its help output:
>
> ```bash
> python scripts/rsl_rl/play.py --help
> ```

#### Playing while training

You can run `play.py` while training is running (for example, with a different checkpoint) to:

- Get a qualitative sense of how well the robot is standing.
- Compare different runs or checkpoints.

Just be careful with GPU memory:

- Running training and play simultaneously will increase memory usage.

#### Your turn – watch the policy

Once you have a trained checkpoint in `logs/rsl_rl/g1_stand_flat/...`, run:

```bash
python scripts/rsl_rl/play.py --task G1-Stand-Flat-Play-v0
```

Then check:

- Does the robot remain upright for most of the episode?
- Does it only make small corrective movements rather than walking?
- If not, keep this window open and jump to troubleshooting to iterate on rewards and PPO settings.

---

### 5.2 Inspect training with TensorBoard

During training, it’s useful to look beyond raw console logs and see **how rewards and losses evolve over time**.  
RSL-RL writes TensorBoard-compatible logs for the G1 standing task under:

- `logs/rsl_rl/g1_stand_flat/`

Each training run creates a timestamped subdirectory containing:

- Checkpoints (`model_*.pt`)
- YAML configs (`env.yaml`, `agent.yaml`)
- TensorBoard event files (`events.out.tfevents...`)

#### Install TensorBoard

If you don’t have TensorBoard installed in your Python environment yet:

```bash
pip install tensorboard
```

#### Launch TensorBoard

From `<G1_STAND_ROOT>`, run:

```bash
tensorboard --logdir logs/rsl_rl/g1_stand_flat --port 6006
```

Then open a browser and go to:

- `http://localhost:6006`

You should see dashboards for:

- **Scalars** – episode rewards, losses, KL, learning rate, etc.
- **Histograms** (if enabled) – distributions of weights/activations over time.

#### Verifying that logs exist

If TensorBoard says “No dashboards are active for the current data set”, check that event files exist:

```bash
ls logs/rsl_rl/g1_stand_flat/*/events.out.tfevents*
```

- If you see one or more `events.out.tfevents...` files, TensorBoard should work with the `--logdir` command above.
- If you see only `.pt` and `.yaml` files:
  - Ensure you ran training long enough for logs to be written.
  - Verify that TensorBoard is installed in the same environment as training.

> **Common mistake – pointing TensorBoard at a checkpoint file**  
> TensorBoard expects a **directory** containing `events.out.tfevents...` files, not a `.pt` checkpoint.  
> Always use:
>
> ```bash
> tensorboard --logdir logs/rsl_rl/g1_stand_flat
> ```
>
> and not something like:
>
> ```bash
> tensorboard --logdir logs/rsl_rl/g1_stand_flat/2026-03-03_17-31-37/model_1400.pt
> ```

### Figures – example visuals (placeholders)

_Add the actual image files under `docs/images/` (for example: `images/g1_standing_play.png`, `images/g1_standing_tensorboard.png`)._

![Screenshot: G1 standing in play environment](images/g1_standing_play.png)

> **Figure:** Example screenshot of the G1 humanoid in the flat play environment using the learned standing policy.

![Screenshot: TensorBoard for G1 standing](images/g1_standing_tensorboard.png)

> **Figure:** Example TensorBoard view showing scalar plots (rewards, losses) for the G1 standing training run.

