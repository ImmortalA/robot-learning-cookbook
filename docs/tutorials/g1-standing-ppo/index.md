## Tutorial: G1 Standing with PPO

In this hands-on tutorial, you will train a **G1 humanoid** to stand still on flat terrain using **PPO** in Isaac Lab.

![G1 humanoid standing on flat terrain](images/unitree_g1_stand.png)

> **Figure:** The end result of this lab – a G1 humanoid that can stand upright on flat terrain using a learned PPO policy.

You will:

- Reuse Isaac Lab’s built-in G1 flat locomotion config.
- Specialize it into a **standing** task by changing commands and rewards.
- Register two Gym environments:
  - `G1-Stand-Flat-v0` (training)
  - `G1-Stand-Flat-Play-v0` (play/visualization)
- Configure an RSL-RL PPO runner for this task.
- Train the policy and visualize the result in Isaac Lab.

### Prerequisites

You should:

- Be comfortable with Python.
- Have basic RL knowledge (states, actions, rewards, episodes).
- Have Isaac Lab installed and working.
- Have the `g1_stand` extension project checked out under `<G1_STAND_ROOT>`.

If you haven’t yet:

- See **Home → Prerequisites & official docs** for installation and Isaac Lab setup.
- For RL and Isaac Lab concepts, see the [Robotics Fundamentals Learning Path](https://www.nvidia.com/en-us/learn/learning-path/robotics/) or the [Isaac Lab docs](https://isaac-sim.github.io/IsaacLab).

### Tutorial flow

Follow the steps in order (use the sidebar or the links below):

1. [**Define the standing environment**](env_config.md)
2. [**Register Gym environments**](gym_registration.md)
3. [**Configure PPO for the standing task**](ppo_config.md)
4. [**Train the G1 standing policy**](training.md) (install the extension first if needed; see the extension README)
5. [**Visualize the learned behavior**](visualization.md)
6. [**Troubleshoot and extend**](troubleshooting.md)

