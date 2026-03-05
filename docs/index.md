## Robot Learning Cookbook

Welcome to the **tutorial hub** for training humanoid robots with Isaac Lab.

This site is built around **hands-on labs**. Everything else (robots, tasks, techniques) exists to support those labs.

### Start here: G1 standing with PPO

If you do just one thing on this site, do this tutorial:

- **Tutorial:** [G1 standing with PPO](tutorials/g1-standing-ppo/index.md)

In that lab you will:

- Create an Isaac Lab extension (`g1_stand`) for humanoids.
- Define a standing task for the G1 robot on flat terrain.
- Register Gym environments for training and play.
- Configure PPO using Isaac Lab’s RSL-RL integration.
- Train the policy and watch the robot stand in simulation.

You only need:

- A working Isaac Lab install.
- Basic Python and RL familiarity.

!!! info "Before you start any tutorial"
    Do these two things before following any lab on this site:

    1. **Create an Isaac Lab project / workspace** (e.g. an extension like `g1_stand` under a root such as `<G1_STAND_ROOT>`).
    2. **Activate your Isaac Lab Python environment** in the terminal you use for training and play scripts (see Isaac Sim / Isaac Lab installation docs).

    **Video walkthrough:** The video below walks through creating a project and activating the Isaac environment step by step. Click the thumbnail to open it on YouTube.

    [![Getting started with Isaac Sim / Isaac Lab – video thumbnail](https://img.youtube.com/vi/i51krqsk8ps/hqdefault.jpg)](https://www.youtube.com/watch?v=i51krqsk8ps)

    [Watch on YouTube →](https://www.youtube.com/watch?v=i51krqsk8ps)

### Prerequisites & official docs

If you haven’t installed Isaac Lab or Isaac Sim yet, use the official guides:

- **Isaac Sim documentation (installation & setup):**  
  See the “Installation and Setup” section in the Isaac Sim docs:  
  [`https://docs.nvidia.com/isaac/isaac-sim`](https://docs.nvidia.com/isaac/isaac-sim)

- **Isaac Lab documentation (installation & usage):**  
  See the “Installation” and “Getting Started” sections in the Isaac Lab docs:  
  [`https://isaac-sim.github.io/IsaacLab`](https://isaac-sim.github.io/IsaacLab)

#### Hardware prerequisites

Isaac Sim and Isaac Lab have specific hardware requirements. For the full, up-to-date list (OS, CPU, RAM, GPU, VRAM, drivers), see the official docs:

- **Isaac Sim system requirements:**  
  [Installation → Requirements](https://docs.omniverse.nvidia.com/isaacsim/latest/installation/requirements.html) (NVIDIA Omniverse / Isaac Sim docs)

In short: you need a supported NVIDIA GPU (with RT Cores), sufficient VRAM (e.g. 8GB+ for training), and enough system RAM. Isaac Lab training typically needs more RAM and VRAM than viewing-only use. If your machine is below the minimum specs, some tutorials may not run or you may need to reduce env count and batch size.

As you add more tutorials, they will appear under the **Tutorials** section and follow the same lab-style structure as the G1 standing tutorial.


