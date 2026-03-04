## Step 1 – Define the Standing Environment

In this step, you define **what the robot’s world looks like** and **what it is asked to do**.  
Rather than building everything from scratch, you create a new environment configuration for the G1 standing task by **subclassing** Isaac Lab’s built-in:

- `isaaclab_tasks.manager_based.locomotion.velocity.config.g1.flat_env_cfg.G1FlatEnvCfg`

We reuse `G1FlatEnvCfg` because it already knows how to:

- Spawn the G1 robot on flat terrain
- Set up sensors and basic locomotion rewards

Our job is to **turn that locomotion task into a pure standing task** by changing commands and rewards.

The new configs you will create are:

- `G1StandFlatEnvCfg` – main training configuration
- `G1StandFlatEnvCfg` – play/visualization configuration

Both live in the `g1_stand` extension, not in IsaacLab core.

### Target file

Create or edit:

- `source/g1_stand/g1_stand/tasks/manager_based/g1_stand/g1_stand_env_cfg.py`

### Environment config code

Paste the following into `g1_stand_env_cfg.py` (replacing any existing template code):

```python
from isaaclab.utils import configclass

from isaaclab_tasks.manager_based.locomotion.velocity.config.g1.flat_env_cfg import (
    G1FlatEnvCfg,
)


@configclass
class G1StandFlatEnvCfg(G1FlatEnvCfg):
    """G1 standing task on flat terrain (training config)."""

    def __post_init__(self) -> None:
        # Run parent post-init to build the standard G1 flat locomotion task
        super().__post_init__()

        # ------------------------------------------------------------------
        # Commands: force commanded base velocities to zero (stand still)
        # ------------------------------------------------------------------
        self.commands.base_velocity.ranges.lin_vel_x = (0.0, 0.0)
        self.commands.base_velocity.ranges.lin_vel_y = (0.0, 0.0)
        self.commands.base_velocity.ranges.ang_vel_z = (0.0, 0.0)

        # ------------------------------------------------------------------
        # Disable velocity tracking rewards (we are not tracking a velocity)
        # ------------------------------------------------------------------
        # These are defined in the G1 locomotion rewards config
        self.rewards.track_lin_vel_xy_exp.weight = 0.0
        self.rewards.track_ang_vel_z_exp.weight = 0.0

        # ------------------------------------------------------------------
        # Standing rewards
        # (weights are a reasonable starting point; you can tune later)
        # ------------------------------------------------------------------
        # Penalize terminations (falling, etc.)
        if hasattr(self.rewards, "termination_penalty"):
            self.rewards.termination_penalty.weight = -200.0

        # Keep the base upright on flat terrain
        if hasattr(self.rewards, "flat_orientation_l2"):
            self.rewards.flat_orientation_l2.weight = -1.0

        # Encourage a comfortable standing base height (only if defined)
        if hasattr(self.rewards, "base_height_l2"):
            self.rewards.base_height_l2.weight = -1.0

        # Discourage vertical bouncing
        if hasattr(self.rewards, "lin_vel_z_l2"):
            self.rewards.lin_vel_z_l2.weight = -0.5

        # Discourage sideways / forward angular motion of the base
        if hasattr(self.rewards, "ang_vel_xy_l2"):
            self.rewards.ang_vel_xy_l2.weight = -0.5

        # Keep joints close to a nominal standing pose (only if defined)
        if hasattr(self.rewards, "stand_still_joint_deviation_l1"):
            self.rewards.stand_still_joint_deviation_l1.weight = -0.2

        # Smooth actions
        if hasattr(self.rewards, "action_rate_l2"):
            self.rewards.action_rate_l2.weight = -0.01

        # Penalize large joint torques
        if hasattr(self.rewards, "dof_torques_l2"):
            self.rewards.dof_torques_l2.weight = -2.0e-6

        # ------------------------------------------------------------------
        # Episode / viewer tweaks for standing
        # ------------------------------------------------------------------
        # Shorter episodes are usually fine for a simple stand task
        self.episode_length_s = 10.0

        # Use a relatively large number of parallel envs for training
        # (you can downscale if your GPU is smaller)
        self.scene.num_envs = 4096
        self.scene.env_spacing = 3.0


@configclass
class G1StandFlatPlayEnvCfg(G1StandFlatEnvCfg):
    """G1 standing task on flat terrain (play/visualization config)."""

    def __post_init__(self) -> None:
        # Start from the training config settings
        super().__post_init__()

        # Fewer envs and more comfortable spacing for visualization
        self.scene.num_envs = 1
        self.scene.env_spacing = 3.0

        # Longer episodes for manual observation
        self.episode_length_s = 20.0

        # Disable observation corruption for cleaner visuals
        if hasattr(self.observations, "policy"):
            self.observations.policy.enable_corruption = False

        # Remove random pushes if they exist in the parent config
        if hasattr(self.events, "base_external_force_torque"):
            self.events.base_external_force_torque = None
        if hasattr(self.events, "push_robot"):
            self.events.push_robot = None
```

### What this configuration does

- **Inherits G1 flat locomotion**  
  You get the full G1 robot setup, terrain, sensors, and basic reward structure from `G1FlatEnvCfg`.

- **Forces standing commands**  
  Setting:

  ```python
  self.commands.base_velocity.ranges.lin_vel_x = (0.0, 0.0)
  self.commands.base_velocity.ranges.lin_vel_y = (0.0, 0.0)
  self.commands.base_velocity.ranges.ang_vel_z = (0.0, 0.0)
  ```

  tells the command generator to always request **zero velocity**, i.e., stand still.

- **Disables velocity tracking rewards**  
  With:

  ```python
  self.rewards.track_lin_vel_xy_exp.weight = 0.0
  self.rewards.track_ang_vel_z_exp.weight = 0.0
  ```

  you remove incentives to move at a nonzero commanded velocity.

- **Emphasizes standing-still rewards**  
  We adjust weights for:

  - `termination_penalty` – strongly penalizes falling/termination.
  - `flat_orientation_l2` – encourages upright torso.
  - `base_height_l2` (if available) – encourages a desired base height.
  - `lin_vel_z_l2` – discourages vertical bouncing.
  - `ang_vel_xy_l2` – discourages tilting or spinning in roll/pitch.
  - `stand_still_joint_deviation_l1` (if available) – keeps joints near nominal pose.
  - `action_rate_l2` – smooths actions over time.
  - `dof_torques_l2` – discourages large torques.

  All of these are wrapped in `hasattr` checks so the code works even if some terms are not present in your Isaac Lab version.

> **Common mistake – missing reward attributes**  
> Different Isaac Lab versions may not define all reward terms (for example, `base_height_l2`).  
> By checking with `hasattr(self.rewards, "...")` before setting weights, you avoid `AttributeError` at runtime.

### Your turn – environment checklist

After editing `g1_stand_env_cfg.py`, make sure:

- The file defines both `G1StandFlatEnvCfg` and `G1StandFlatPlayEnvCfg` classes.
- You can open a Python REPL in your Isaac Lab environment and successfully import:

  ```python
  from g1_stand.g1_stand.tasks.manager_based.g1_stand.g1_stand_env_cfg import G1StandFlatEnvCfg
  ```

  without errors.
- You understand, at a high level, that:
  - Commands are now “stand still” commands.
  - Rewards now prefer upright, low‑motion, low‑torque behavior.

### Figure – standing rewards (placeholder)

_Add the actual image file under `docs/images/` (for example: `images/g1_standing_rewards.png`)._

![Diagram: G1 standing reward components](images/g1_standing_rewards.png)

> **Figure:** Conceptual visualization of the main standing rewards (orientation, height, base velocities, joint deviation, action smoothness, torques) and how they work together to encourage a stable upright pose.

