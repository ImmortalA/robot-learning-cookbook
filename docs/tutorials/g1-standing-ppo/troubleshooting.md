## Step 6 – Troubleshooting the Standing Task

This page collects common issues you might encounter while setting up and training the G1 standing task, along with suggested fixes.

### Environment not found (`UnregisteredEnv`)

**Symptom:**

```text
gym.error.UnregisteredEnv: No registered env with id: G1-Stand-Flat-v0
```

**Possible causes and fixes:**

- **Extension not installed (or not in this environment)**  
  - Reinstall from the project root:

    ```bash
    python -m pip install -e source/g1_stand
    ```

- **Typo in Gym ID**  
  - Ensure the ID in `__init__.py` matches the one you pass to `--task`:
    - `G1-Stand-Flat-v0`
    - `G1-Stand-Flat-Play-v0`

- **Registration not triggered**  
  - Make sure `g1_stand.tasks` is imported before env creation.  
    The provided `train.py` script already imports it.

### Only `Template-G1-Stand-v0` shows in `list_envs.py`

**Symptom:**

`python scripts/list_envs.py` only prints:

- `Template-G1-Stand-v0`

and not your new `G1-Stand-Flat-*` environments.

**Explanation:**

- The helper script filters on `"Template-"` in the environment ID.
- Your new environments are named `G1-Stand-Flat-*`, so they are intentionally filtered out.

**Fix:**

- Use the Python snippet from the “Install & Check” step to print envs whose ID contains `"G1-Stand-Flat"`.
- Or simply run training:

  ```bash
  python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 1024
  ```

### AttributeError on reward terms

**Symptom:**

```text
AttributeError: 'G1Rewards' object has no attribute 'base_height_l2'
```

**Explanation:**

- Different Isaac Lab versions may or may not define certain reward terms such as:
  - `base_height_l2`
  - `stand_still_joint_deviation_l1`
- Accessing a missing attribute causes `AttributeError`.

**Fix:**

- Use `hasattr(self.rewards, "...")` before adjusting weights (as shown in the environment config step).  
  For example:

  ```python
  if hasattr(self.rewards, "base_height_l2"):
      self.rewards.base_height_l2.weight = -1.0
  ```

### GPU out-of-memory (OOM) during training

**Symptom:**

```text
RuntimeError: CUDA out of memory ...
```

**Fix:**

- Reduce the number of parallel environments:

  ```bash
  python scripts/rsl_rl/train.py --task G1-Stand-Flat-v0 --headless --num_envs 512
  ```

- Optionally:
  - Decrease `num_steps_per_env` in the parent PPO config.
  - Use a smaller network (fewer/lower hidden dimensions) if necessary.

### TensorBoard shows “No dashboards are active”

**Symptom:**

TensorBoard starts but shows:

```text
No dashboards are active for the current data set.
```

**Fix:**

- Make sure you point TensorBoard at the **directory**:

  ```bash
  tensorboard --logdir logs/rsl_rl/g1_stand_flat --port 6006
  ```

- Verify event files exist:

  ```bash
  ls logs/rsl_rl/g1_stand_flat/*/events.out.tfevents*
  ```

  - If none exist:
    - Ensure you ran training long enough.
    - Confirm TensorBoard is installed in the same environment.

### Robot not standing still

**Symptom:**

- In the play environment, the G1 humanoid walks, drifts, or oscillates instead of standing.

**Checklist:**

- In `G1StandFlatEnvCfg`:
  - Commands:

    ```python
    self.commands.base_velocity.ranges.lin_vel_x = (0.0, 0.0)
    self.commands.base_velocity.ranges.lin_vel_y = (0.0, 0.0)
    self.commands.base_velocity.ranges.ang_vel_z = (0.0, 0.0)
    ```

  - Velocity tracking rewards:

    ```python
    self.rewards.track_lin_vel_xy_exp.weight = 0.0
    self.rewards.track_ang_vel_z_exp.weight = 0.0
    ```

  - Standing rewards have non-trivial weights (`flat_orientation_l2`, `lin_vel_z_l2`, `ang_vel_xy_l2`, etc.).

- In `G1StandFlatPPORunnerCfg`:
  - `max_iterations` is large enough for the policy to converge (e.g., 1500+).

