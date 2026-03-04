## Step 5 – Visualize and Inspect the Learned Policy

After (or even during) training, you can:

- Run the **play** script to visually inspect what the policy has learned.
- Use **TensorBoard** to inspect training curves and debug issues.

All commands in this step are run from the **extension project root** (`<G1_STAND_ROOT>`).

---

### 5.1 Play the policy in Isaac Lab

!!! success "Run play script (loads latest checkpoint)"
    From `<G1_STAND_ROOT>`, run:

    ```bash
    python scripts/rsl_rl/play.py --task G1-Stand-Flat-Play-v0
    ```

    This loads the latest checkpoint for `g1_stand_flat` and opens the Isaac Lab viewer.

!!! note "Load a specific run/checkpoint"
    ```bash
    python scripts/rsl_rl/play.py --task G1-Stand-Flat-Play-v0 --load_run 2026-03-03_17-31-37 --load_checkpoint model_1400.pt
    ```
    Adapt `--load_run` and `--load_checkpoint` to your `logs/rsl_rl/g1_stand_flat/` run folder and checkpoint file. Check `python scripts/rsl_rl/play.py --help` if your Isaac Lab version uses different flags.

---

Conceptually, the play environment:

- Loads a trained checkpoint.
- Spawns one (or a few) G1 humanoids on flat ground.
- Lets you observe whether the robot can maintain an upright, still stance without falling.

#### What you should see

When training has gone well, you should see:

- A G1 humanoid robot spawned on a flat plane.
- The robot generally upright, with only small corrective motions.
- Occasional small sways or foot adjustments, but **no continuous walking** or drifting.

If the robot immediately falls or walks away, go to the troubleshooting step and review the checklist for “Robot not standing still”.

If you have multiple runs and need to load a specific checkpoint, use the **Load a specific run/checkpoint** note above; adapt `--load_run` and `--load_checkpoint` to your run folder and file. Run `python scripts/rsl_rl/play.py --help` if your Isaac Lab version uses different flags.

#### Playing while training

You can run `play.py` while training is running (for example, with a different checkpoint) to:

- Get a qualitative sense of how well the robot is standing.
- Compare different runs or checkpoints.

Just be careful with GPU memory:

- Running training and play simultaneously will increase memory usage.

#### Checklist

- Does the robot remain upright for most of the episode?
- Does it only make small corrective movements rather than walking?
- If not, see **Troubleshooting** to iterate on rewards and PPO settings.

---

### 5.2 Inspect training with TensorBoard

RSL-RL writes TensorBoard logs under `logs/rsl_rl/g1_stand_flat/` (timestamped runs with checkpoints, YAML configs, and event files).

!!! success "Install TensorBoard"
    ```bash
    pip install tensorboard
    ```

!!! success "Launch TensorBoard (then open http://localhost:6006)"
    From `<G1_STAND_ROOT>`:

    ```bash
    tensorboard --logdir logs/rsl_rl/g1_stand_flat --port 6006
    ```

    Then open in a browser: **http://localhost:6006**

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

_Add the actual image files under `docs/tutorials/g1-standing-ppo/images/` (for example: `g1_standing_play.png`, `g1_standing_tensorboard.png`)._

![Screenshot: G1 standing in play environment](images/g1_standing_play.png)

> **Figure:** Example screenshot of the G1 humanoid in the flat play environment using the learned standing policy.

![Screenshot: TensorBoard for G1 standing](images/g1_standing_tensorboard.png)

> **Figure:** Example TensorBoard view showing scalar plots (rewards, losses) for the G1 standing training run.

