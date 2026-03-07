## Step 2 – Register Gym Environments

Next, you register two Gym environments so that RSL-RL (and Gym-compatible tools) can create your task by name.  
Gym registration is the “glue” that connects a **string ID** (like `G1-Stand-Flat-v0`) to your Isaac Lab environment configuration and PPO settings.

You will register:

- `G1-Stand-Flat-v0` – training environment
- `G1-Stand-Flat-Play-v0` – play/visualization environment

Registration happens inside the `g1_stand` extension, not in Isaac Lab core.

---

### Steps

!!! success "Paste registration code into `__init__.py`"
    1. **Open** this file: `source/g1_stand/g1_stand/tasks/manager_based/g1_stand/__init__.py`
    2. **Replace** its contents with the code in the block below (or paste the block into the file).

```python
import gymnasium as gym

from . import agents

##
# Register Gym environments.
##

# Training environment: many parallel envs, used for RL training.
gym.register(
    id="G1-Stand-Flat-v0",
    entry_point="isaaclab.envs:ManagerBasedRLEnv",
    disable_env_checker=True,
    kwargs={
        "env_cfg_entry_point": f"{__name__}.g1_stand_env_cfg:G1StandFlatEnvCfg",
        "rsl_rl_cfg_entry_point": f"{agents.__name__}.rsl_rl_ppo_cfg:G1StandFlatPPORunnerCfg",
    },
)

# Play / visualization environment: few envs, no corruption, suitable for rollout.
gym.register(
    id="G1-Stand-Flat-Play-v0",
    entry_point="isaaclab.envs:ManagerBasedRLEnv",
    disable_env_checker=True,
    kwargs={
        "env_cfg_entry_point": f"{__name__}.g1_stand_env_cfg:G1StandFlatPlayEnvCfg",
        "rsl_rl_cfg_entry_point": f"{agents.__name__}.rsl_rl_ppo_cfg:G1StandFlatPPORunnerCfg",
    },
)
```

---

### What this does

Here, **“environment”** means the RL task (robot, scene, and rewards), not your Python/conda environment.

- **`id`**  
  Names the environment in Gym’s global registry:

  - `"G1-Stand-Flat-v0"` – training
  - `"G1-Stand-Flat-Play-v0"` – play

- **`entry_point`**  
  Points to the Isaac Lab manager-based RL environment wrapper:

  - `"isaaclab.envs:ManagerBasedRLEnv"`

- **`kwargs.env_cfg_entry_point`**  
  Tells Isaac Lab which environment config class to use:

  - Training env: `G1StandFlatEnvCfg`
  - Play env: `G1StandFlatPlayEnvCfg`

- **`kwargs.rsl_rl_cfg_entry_point`**  
  Tells Isaac Lab which RSL-RL runner config to use:

  - `G1StandFlatPPORunnerCfg` (defined in the agents module)

!!! warning "Important"
    The strings inside `env_cfg_entry_point` and `rsl_rl_cfg_entry_point` must match the actual import paths and class names. If you rename files or classes, update these strings accordingly.

### Checklist

After updating `__init__.py`:

- IDs are exactly `G1-Stand-Flat-v0` and `G1-Stand-Flat-Play-v0`.
- Entry-point strings match: `G1StandFlatEnvCfg` / `G1StandFlatPlayEnvCfg` and `G1StandFlatPPORunnerCfg`.
- You’ll confirm it worked in Step 4 when you run `train.py` and training starts without “env not found” errors.


