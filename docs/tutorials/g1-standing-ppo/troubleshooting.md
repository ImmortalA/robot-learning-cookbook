---
description: Troubleshoot G1 standing – UnregisteredEnv, OOM, reward AttributeError, TensorBoard, and robot not standing still.
---

## Step 6 – Troubleshooting the Standing Task

This page collects common issues you might encounter while setting up and training the G1 standing task, along with suggested fixes.

If you haven’t completed the steps in order, start from the [Overview](index.md) or [Step 1 – Define the standing environment](env_config.md).

**Where things live:** All paths below are relative to **`<G1_STAND_ROOT>`** (the root of your extension project). For example: `source/g1_stand/...`, `scripts/rsl_rl/...`, `logs/rsl_rl/g1_stand_flat/...`.

### Environment not found (`UnregisteredEnv`)

**Symptom:**

```text
gym.error.UnregisteredEnv: No registered env with id: G1-Stand-Flat-v0
```

**Possible causes and fixes:**

- **Extension not installed (or not in this environment)**  

    !!! success "Reinstall the extension"
        From the extension project root (`<G1_STAND_ROOT>`):
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

!!! success "Run training to verify registration"
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

!!! success "Guard reward weights with `hasattr`"
    In `g1_stand_env_cfg.py`:
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

!!! success "Reduce parallel envs (e.g. 512)"
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

!!! success "Point TensorBoard at log directory (not a .pt file)"
    ```bash
    tensorboard --logdir logs/rsl_rl/g1_stand_flat --port 6006
    ```
    If the UI is empty, verify event files exist:
    ```bash
    ls logs/rsl_rl/g1_stand_flat/*/events.out.tfevents*
    ```
    If none exist, ensure you ran training long enough and that TensorBoard is installed in the same environment.

### Robot not standing still

**Symptom:**

- In the play environment, the G1 humanoid walks, drifts, or oscillates instead of standing.

**Fix:**

!!! success "Check env config (commands and rewards)"
    In `g1_stand_env_cfg.py` (`G1StandFlatEnvCfg`), ensure:
    - Commands are zero: `lin_vel_x`, `lin_vel_y`, `ang_vel_z` all `(0.0, 0.0)`.
    - Velocity tracking rewards are disabled: `track_lin_vel_xy_exp.weight = 0.0`, `track_ang_vel_z_exp.weight = 0.0`.
    - Standing rewards have non-zero weights: `flat_orientation_l2`, `lin_vel_z_l2`, `ang_vel_xy_l2`, etc.

!!! success "Check PPO config (`max_iterations`)"
    In `rsl_rl_ppo_cfg.py` (`G1StandFlatPPORunnerCfg`): set `max_iterations` to at least 1500 (or higher if needed).

