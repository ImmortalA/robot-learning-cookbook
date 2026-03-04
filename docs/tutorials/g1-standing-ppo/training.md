## Step 4 – Train the G1 Standing Policy

Once the extension is installed and the environments are registered, you can start **teaching the G1 humanoid to stand still** using the RSL-RL training script.

Conceptually, training will:

- Create many parallel copies of the G1 environment.
- Let the PPO policy try actions and receive standing‑related rewards.
- Update the policy parameters over thousands of iterations until it learns to balance.

All commands in this step are run from the **extension project root** (`<G1_STAND_ROOT>`).

---

### Run

!!! success "Start training (headless)"
    From `<G1_STAND_ROOT>`, run:

    ```bash
    python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 4096
    ```

    If your GPU has less memory, use fewer envs:

    ```bash
    python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 1024
    ```

**What the flags do:** `--task G1-Stand-Flat-v0` selects your registered env; `--headless` runs without GUI; `--num_envs` sets parallel environments (lower if OOM).

During training, logs and checkpoints are written under:

- `logs/rsl_rl/g1_stand_flat/...`

This path is controlled by the PPO config’s:

```python
self.experiment_name = "g1_stand_flat"
```

in `G1StandFlatPPORunnerCfg`.

### Optional: other commands

!!! note "Override max iterations from CLI"
    ```bash
    python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 2048 --max_iterations 2000
    ```

!!! note "Record training videos"
    ```bash
    python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --num_envs 512 --video --video_interval 2000 --video_length 200
    ```
    Video recording is heavier; use after you've confirmed headless training runs successfully.

### Monitoring progress

Training typically prints:

- Iteration number.
- Reward statistics (mean/median).
- Loss values.

You can also monitor training via TensorBoard (see **Visualization → Inspect training with TensorBoard**).

### Expected training outcome

If everything is wired correctly, you should see over time:

- Average episode reward increasing (or at least stabilizing after some oscillation).
- Fewer terminations from falling.
- In the play environment, the G1 robot should:
  - Start with wobbly, unstable behavior.
  - Gradually learn to recover and stand more upright.
  - Eventually stand mostly still, with only small corrective motions.

How fast this happens depends on:

- Number of environments (`--num_envs` and `scene.num_envs`).
- GPU performance.
- Reward weights and PPO hyperparameters.

### Common mistakes

- **Training crashes with `AttributeError` on rewards**  
  This usually means a reward term name is not present in your installed Isaac Lab version.  
  The environment config uses `hasattr(self.rewards, "...")` before changing weights to avoid this, but if you add new reward references, keep using `hasattr`.

- **Out of memory (OOM) on GPU**  
  Reduce `--num_envs`:

  ```bash
  python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 512
  ```

- **Training seems stuck at low reward**  
  Check:
  - Reward weights in `G1StandFlatEnvCfg`.
  - PPO hyperparameters in `G1StandFlatPPORunnerCfg`.
  - Whether the robot is actually standing in the play environment (see the next step).

> **Hardware tip**  
> If you run on a laptop GPU or a card with limited VRAM, it is perfectly fine to:
> - Lower `--num_envs` (e.g., 256–1024).
> - Run fewer iterations first to validate the setup, then scale up.

### Checklist after running

- Confirm `logs/rsl_rl/g1_stand_flat/` has at least one run directory.
- Check console for reward/loss logs.
- Optionally open TensorBoard (see **Visualization**) to inspect scalars.

### Figure – example training curve (placeholder)

_Add the actual image file under `docs/tutorials/g1-standing-ppo/images/` (for example: `g1_standing_training_curve.png`)._

![Plot: G1 standing training curve](images/g1_standing_training_curve.png)

> **Figure:** Example training curve for the G1 standing task, showing how the episode return (or standing score) evolves over training iterations.

