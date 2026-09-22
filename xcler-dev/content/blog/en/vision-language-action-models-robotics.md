---
id: vla
slug: vision-language-action-models-robotics
slug_en: vision-language-action-models-robotics
slug_de: vision-language-action-modelle-robotik
title: "Vision-Language-Action Models: How Foundation Models Are Changing Robotics"
excerpt: "VLA models combine seeing, language understanding and motor control in one policy. Why they increasingly beat narrow robot skills, and what manufacturers should know before piloting them."
seoTitle: "Vision-Language-Action (VLA) Models in Robotics Explained"
seoDescription: "Vision-Language-Action models explained: how VLAs work, why they outperform narrow RL policies in manipulation and assembly, limits, safety and pilot planning."
publishedAt: "2026-09-17T09:00:00.000Z"
updatedAt: "2026-09-23T09:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-vla-robotics-cover.webp
coverAlt: "Vision-Language-Action robotics — dual-arm robot guided by vision and language"
readingTime: 7
tags:
  - VLA
  - robotics
  - embodied AI
  - industrial automation
  - robot learning
  - foundation models
---

For decades, getting a robot to do a new task meant programming it — or, more recently, training a dedicated policy with reinforcement learning (RL) for that one task in that one workcell. Change the part, the lighting or the bin, and you often started again.

**Vision-Language-Action (VLA) models** are changing that. They are foundation models for robots: large neural networks that take in **camera images** and a **natural-language instruction** and output **robot actions** directly. Because they are trained on large, varied datasets, they can generalise to objects, layouts and instructions they have not seen before — sometimes with only a handful of demonstrations on the real hardware.

This article explains how VLAs work, where they are already outperforming narrow policies, what their limits are, and how a manufacturer can run a sensible pilot.

![Vision-Language-Action architecture: vision encoder and language encoder fused into an action head controlling dual-arm manipulators, compared with a narrow RL policy](/blog/blog-vla-architecture.webp)

## What a VLA model is

A VLA model has three conceptual parts:

1. **Vision.** An image encoder turns camera frames into a representation of the scene — objects, positions, orientations.
2. **Language.** A language model component understands the instruction: "put the red housings in the left tray", "fold the towel", "hand me the M6 screw".
3. **Action.** An action head converts the combined understanding into motor commands — joint positions, end-effector movements, gripper open or close — often as a short sequence of future actions at a time.

Many VLAs are built on top of vision-language models originally trained on internet-scale image and text data, then extended and fine-tuned on large collections of robot demonstrations. That pretraining is the key: the model already "knows" what a cup, a cable or a screw looks like, and what "left of" or "upside down" means, before it ever moves a robot arm.

## A short history

- **2023:** Google DeepMind's **RT-2** showed that a vision-language model trained on web data and robot data could transfer web knowledge into robot actions. The **Open X-Embodiment** collaboration pooled demonstration data from many labs and robot types.
- **2024:** Open models such as **OpenVLA** made the approach accessible to researchers, and startups including Physical Intelligence presented general-purpose robot policies such as **π0** for dexterous tasks like folding laundry.
- **2025 onwards:** Large technology companies and robotics firms released VLA-style foundation models for humanoid and industrial robots, and results on dual-arm manipulation, sorting and assembly improved quickly.

The direction is clear: the field is moving from one policy per task to **one generalist model adapted to many tasks**.

## Why VLAs beat narrow RL policies in many settings

| | Narrow RL / scripted policy | Generalist VLA |
| --- | --- | --- |
| Setup for a new task | New reward design, training or programming | Instruction plus a few demonstrations |
| New part geometry | Often requires retraining | Frequently handled zero-shot or with light fine-tuning |
| Instructions | Fixed by code | Natural language |
| Data needs per task | High | Low, thanks to pretraining |
| Precision on one fixed task | Very high | Good, sometimes lower |
| Explainability | High for scripts | Lower |

The advantage is largest where **variation** is the problem: many SKUs, changing packaging, mixed bins, deformable objects like cables, textiles or bags, and frequent product changes. That is exactly where classic automation has been too expensive to set up.

## Where VLAs are being used

### Dual-arm manipulation
Tasks that need two hands — holding a part while inserting another, opening a bag, folding, cable routing — are hard to script. VLAs trained on bimanual demonstrations handle these much more naturally.

### Sorting and kitting
Picking mixed items from bins and placing them into kits or trays, even when the item mix changes daily. Language instructions make it easy to change the sort rule without reprogramming.

### Dynamic assembly
Assembly steps where parts arrive in varying positions and orientations. The model adapts its grasp and approach instead of relying on perfect fixtures.

### Logistics and packing
Packing orders with different item shapes into boxes, handling returns, sorting parcels.

## Limits you need to know

- **Precision and cycle time.** For high-speed, micron-precision tasks on a fixed line, classic automation is usually still faster and more accurate.
- **Reliability tails.** A model that succeeds 95% of the time may be impressive in research and unacceptable on a production line. The last few percent are the hard part.
- **Latency.** Large models need powerful compute near the robot. Real-time control loops often combine a VLA for high-level decisions with faster low-level controllers.
- **Safety certification.** Neural policies are hard to verify formally. Physical safety must be guaranteed by independent layers — safety-rated sensors, speed and force limits, protective stops.
- **Data and integration effort.** "Few demonstrations" still means collecting good demonstrations, calibrating cameras and integrating the robot with your MES or warehouse systems.

## Safety and regulation in Europe

Industrial robots in the EU must meet machinery safety requirements. Existing standards for industrial robots and collaborative robots (such as the ISO 10218 series and ISO/TS 15066) remain the basis for safe cells. The new **EU Machinery Regulation** applies from January 2027 and explicitly addresses machines with self-evolving behaviour and AI-based safety functions. AI components that are safety components may also fall under the **EU AI Act** as high-risk systems.

The practical rule: **the VLA decides what to do; certified safety systems decide what is allowed.** Never rely on the learned policy alone to keep people safe.

## How to run a sensible pilot

1. **Pick a variation-heavy task.** Choose a process where current automation fails because of variety — not the fastest, most precise step on your line.
2. **Define success precisely.** Success rate, cycle time, error types, recovery behaviour and required human interventions per hour.
3. **Start in a protected cell.** Physical separation or certified collaborative limits, with clear emergency stops.
4. **Collect good demonstrations.** Quality matters more than quantity. Teleoperation setups are often used to record them.
5. **Measure over weeks, not demos.** Run shifts, log every failure and categorise it: grasp, perception, planning, hardware.
6. **Plan integration early.** How will the robot receive orders, report results and flag exceptions? That is often where software projects stall.
7. **Keep a fallback.** Human handling or a classic station for the cases the model cannot do reliably yet.

## Where software fits in

Robotic projects succeed or fail on the software around the robot as much as on the robot itself: order intake, scheduling, exception handling, quality data and reporting. That is where workflow automation and AI agents connect the cell to the rest of the business — ERP, warehouse management, maintenance tickets. See our [AI automation](/en/services/ai-automation) and [workflow automation](/en/services/workflow-automation) services for how we build those connections.

## FAQ

**What is a Vision-Language-Action model?**
A foundation model for robots that takes camera images and a language instruction as input and outputs robot actions directly.

**How is a VLA different from a vision-language model?**
A vision-language model describes or answers questions about images. A VLA additionally produces motor actions to change the physical world.

**Do VLAs replace industrial robot programming?**
Not for high-speed, fixed tasks. They are most valuable where variation makes traditional programming too expensive.

**How much training data does a new task need?**
Far less than training a policy from scratch — often a modest number of good demonstrations, sometimes none for simple variations — but it depends on the task and the model.

**Are VLA-controlled robots safe?**
Only with independent, certified safety systems. The AI model should never be the only safety layer.

Exploring robotics or AI on the shop floor and need the software and data side connected? [Contact XCLER](/en/contact).
