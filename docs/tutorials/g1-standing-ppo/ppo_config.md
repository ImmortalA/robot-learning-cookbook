---
description: Configure RSL-RL PPO for the G1 standing task – experiment name, max iterations, and network architecture.
---

## Step 3 – Configure PPO for the Standing Task

The `g1_stand` extension uses **RSL-RL PPO** to learn a policy that keeps the robot balanced. PPO is a good default for Isaac-style continuous‑control tasks because it:

- Works well with vectorized environments and GPU acceleration.
- Is relatively stable to tune compared to lower‑level policy gradient methods.

Instead of configuring PPO from scratch, you **inherit** from Isaac Lab’s built-in:

- `isaaclab_tasks.manager_based.locomotion.velocity.config.g1.agents.rsl_rl_ppo_cfg.G1FlatPPORunnerCfg`

and specialize it for the G1 standing task.

---

### Steps

!!! success "Replace PPO runner config (`rsl_rl_ppo_cfg.py`)"
    1. **Open** this file: `source/g1_stand/g1_stand/tasks/manager_based/g1_stand/agents/rsl_rl_ppo_cfg.py`
    2. **Replace** the entire file contents with the code in the block below.

```python
from isaaclab.utils import configclass

from isaaclab_tasks.manager_based.locomotion.velocity.config.g1.agents.rsl_rl_ppo_cfg import (
    G1FlatPPORunnerCfg,
)


@configclass
class G1StandFlatPPORunnerCfg(G1FlatPPORunnerCfg):
    """PPO runner config for G1 standing on flat terrain."""

    def __post_init__(self) -> None:
        # Start from the default G1 flat locomotion PPO settings
        super().__post_init__()

        # Use a distinct experiment name for logs/checkpoints
        self.experiment_name = "g1_stand_flat"

        # Optionally tweak iterations and network size for standing-only task
        # (these are reasonable defaults; you can tune later)
        self.max_iterations = 1500
        # Example: slightly smaller networks than default flat config
        self.policy.actor_hidden_dims = [256, 128, 128]
        self.policy.critic_hidden_dims = [256, 128, 128]
```

---

### What this does

- **Inherits a sensible PPO baseline**  
  The parent `G1FlatPPORunnerCfg` is tuned for G1 flat-ground locomotion and already sets:

  - Number of steps per environment.
  - Learning rate and schedule.
  - Discount factor (`gamma`) and GAE (`lam`).
  - Entropy and value loss coefficients.
  - Default network sizes.

- **Sets a custom experiment name**

  ```python
  self.experiment_name = "g1_stand_flat"
  ```

  This controls the log directory:

  - `logs/rsl_rl/g1_stand_flat/...`

  where checkpoints, YAML configs, and TensorBoard logs will be written.

- **Adjusts training horizon and network size**

  - `max_iterations = 1500` – total training iterations.
  - Actor/critic MLPs are set to `[256, 128, 128]`, which is typically sufficient for a standing task.

!!! tip "Tuning PPO"
    If the policy is not stable or converges slowly, you can:
    - Increase or decrease `max_iterations`.
    - Adjust `num_steps_per_env` in the parent config file.
    - Change `entropy_coef` or `learning_rate` in the parent config to encourage more or less exploration.

### Checklist

After editing `rsl_rl_ppo_cfg.py`:

- The file defines `G1StandFlatPPORunnerCfg` inheriting from `G1FlatPPORunnerCfg`.
- `self.experiment_name` is `"g1_stand_flat"` (logs go to `logs/rsl_rl/g1_stand_flat/`).
- `max_iterations` and actor/critic hidden sizes match the block above (you can tune later).

