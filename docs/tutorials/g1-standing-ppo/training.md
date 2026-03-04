## Step 4 – Train the G1 Standing Policy

Once the extension is installed and the environments are registered, you can start **teaching the G1 humanoid to stand still** using the RSL-RL training script.

Conceptually, training will:

- Create many parallel copies of the G1 environment.
- Let the PPO policy try actions and receive standing‑related rewards.
- Update the policy parameters over thousands of iterations until it learns to balance.

All commands in this step are run from the **extension project root** (`<G1_STAND_ROOT>`).

### Basic training command

```bash
python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 4096
```

- **`--task G1-Stand-Flat-v0`**  
  Selects the training environment you registered in `__init__.py`.

- **`--headless`**  
  Runs Isaac Lab without a GUI, which is ideal for long training runs.

- **`--num_envs 4096`**  
  Overrides the number of parallel environments. You can reduce this if your GPU has less memory, for example:

  ```bash
  python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 1024
  ```

During training, logs and checkpoints are written under:

- `logs/rsl_rl/g1_stand_flat/...`

This path is controlled by the PPO config’s:

```python
self.experiment_name = "g1_stand_flat"
```

in `G1StandFlatPPORunnerCfg`.

### Common CLI variations

- **Change maximum iterations from the command line**:

  ```bash
  python scripts/rsl_rl/train.py \
    --task G1-Stand-Flat-v0 \
    --headless \
    --num_envs 2048 \
    --max_iterations 2000
  ```

- **Record training videos** (if your environment and hardware allow it):

  ```bash
  python scripts/rsl_rl/train.py \
    --task G1-Stand-Flat-v0 \
    --num_envs 512 \
    --video --video_interval 2000 --video_length 200
  ```

> **Tip**  
> Video recording increases computational load. Start with headless training and add video recording once the pipeline works.

### Monitoring progress

Training typically prints:

- Iteration number.
- Reward statistics (mean/median).
- Loss values.

You can also monitor training via TensorBoard (see **Inspect Training with TensorBoard**).

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

### Your turn – run a training session

Try the basic command now from `<G1_STAND_ROOT>`:

```bash
python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 1024
```

Let it run for a while (for example, a few hundred iterations), then:

- Check that `logs/rsl_rl/g1_stand_flat/` contains at least one run directory.
- Inspect the console output to ensure rewards and losses are being logged.
- Optionally, launch TensorBoard to confirm that scalars are recorded.

### Figure – example training curve (placeholder)

_Add the actual image file under `docs/images/` (for example: `images/g1_standing_training_curve.png`)._

![Plot: G1 standing training curve](images/g1_standing_training_curve.png)

> **Figure:** Example training curve for the G1 standing task, showing how the episode return (or standing score) evolves over training iterations.

