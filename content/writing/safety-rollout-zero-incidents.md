---
title: "How I rolled new safety rules to 300 partners with zero incidents"
slug: safety-rollout-zero-incidents
seoTitle: "Rolling new safety rules to 300 partners with zero incidents"
description: "Google policy changed. Every partner program in India had to comply without grinding to a halt. The tiered rollout, the runbook, and the cadence that made zero incidents the boring outcome."
date: "2026-08-09"
featured: 17
category: "Creator programs"
companies: ["Google"]
cardLabel: "0 compliance incidents"
shortTitle: "The safety rollout"
faq:
  - q: "How do you roll out a strict policy without stalling a partner program?"
    a: "Tier partners by readiness, not by region. A ready partner can absorb the change in a week. An unready partner needs a runbook, a pilot period, and a named contact. Treating them the same means either the ready ones move too slowly or the unready ones ship broken. The tier is the whole design."
  - q: "What does a partner-facing safety runbook contain?"
    a: "The specific behaviours that changed, why the policy changed, the deadline, the escalation path, and a worked example. Not the legal text — a policy document is a legal artifact and a runbook is an operational one. Partners read the second, not the first."
  - q: "How do you know a rollout is going well before the deadline?"
    a: "You track two numbers. Percent of partners past a defined readiness checkpoint by week, and count of escalations from partner ops. The first tells you whether the schedule holds. The second tells you where the policy is genuinely ambiguous. Both together are your early warning."
---

<figure class="bv-figure bv-hero"><img src="/assets/writing/safety-rollout-hero.svg" alt="Three tiers of partners by readiness, not by region. Tier one absorbs the change in a week; tier two runs a pilot; tier three gets a runbook, a named contact, and an extended window. Rollout completes without a compliance incident." loading="lazy" decoding="async" width="900" height="500"><figcaption>Tier by readiness. Region is the wrong axis.</figcaption></figure>

At Google I ran a partner ecosystem across 300+ institutions in India. Partway through, policy changed. The new safety rules had to reach every partner program in the network, and they had to reach it without breaking developer velocity across the ecosystem.

The outcome on the work card is **zero compliance incidents during national rollout**. This is what it took.

## The default plan and why it fails

The default rollout plan for a policy change is: send the update to everyone at once, set a common deadline, escalate the stragglers.

That plan works for a homogeneous audience. A partner ecosystem is not homogeneous. In this one, some partners had legal teams on staff and could turn around a policy change in days. Others were single-person operations who would read the policy PDF once and then need help implementing it. Treating them the same has two failure modes:

- **The ready partners wait.** They finish the work in a week and then sit for a month because the deadline is set for the slowest.
- **The unready partners ship broken.** They hit the deadline by rushing and get the implementation wrong. That is where compliance incidents come from.

The whole rollout has to be built around this variance.

## Tier by readiness, not by region

The organising axis was readiness. I sorted every partner into one of three tiers before the rollout started.

| Tier | What defined it | What they got |
| --- | --- | --- |
| 1 — Absorb | Has internal legal or ops capacity, has done a Google policy update before | Policy summary, deadline, escalation path. Done in a week |
| 2 — Guided | Willing and organised but new to Google's policy shape | Runbook with worked examples, 30-day window, a two-week pilot |
| 3 — Supported | Small teams, first-time policy change, or in a region with limited legal support | Runbook, named partner ops contact, extended window, weekly check-in |

Region was not the axis. Two partners in the same city could sit in different tiers. Two partners in different tiers might share the same broad institutional type. The variance in readiness is orthogonal to geography.

<figure class="bv-figure"><img src="/assets/writing/safety-rollout-interior.svg" alt="Communication cadence for the tiered rollout: T-30 announcement to all tiers, T-14 tier-specific reminder with runbook, T-7 named contact for tier three, T-0 checkpoint confirmation, T+7 verification, T+30 sign-off." loading="lazy" decoding="async" width="900" height="500"><figcaption>The cadence is what turns a policy PDF into a completed rollout.</figcaption></figure>

## The cadence that carried it

Once the tiers were set, the communication cadence did the rest. Six touchpoints per partner.

- **T-30** — announcement to all tiers with the deadline and the reason for the change.
- **T-14** — tier-specific reminder with the runbook attached.
- **T-7** — tier three gets a named partner ops contact by direct message.
- **T-0** — checkpoint. Every partner confirms compliance by a defined artifact.
- **T+7** — verification pass. Partner ops spot-checks a sample per tier.
- **T+30** — sign-off. Any escalations from the previous 30 days are resolved.

None of the touchpoints are heavy. All of them are named. A partner never had to guess when the next thing was coming or who to reach on the way.

## What the runbook contained

The policy document was a legal artifact. It read as one — dense, defensive, and correctly written for the audience it was written for. It was not written for partner operations.

The runbook was a separate document I wrote alongside partner ops. It contained:

1. The specific partner-visible behaviours that changed. Numbered list.
2. Why the policy changed. One paragraph.
3. The deadline and the checkpoint artifact.
4. The escalation path — who to email, when to expect a reply.
5. A worked example from a real partner scenario, with the wrong and right implementations shown side by side.

The worked example was the piece that carried it. A policy in the abstract is ambiguous. A worked example is not. Every unclear escalation I got named a scenario the worked example did not cover, and the fix was to add that scenario to the runbook and re-circulate. The runbook grew as ambiguity was found.

## Two numbers I watched

Before deadline, only two numbers mattered.

**Percent past the readiness checkpoint by week.** This is the schedule number. If tier one is at 40 percent at T-14, the schedule is fine. If tier three is at 5 percent at T-14, the schedule is going to slip and the fix is to intervene now, not at T-7. This number is on a chart the whole time.

**Count of escalations from partner ops.** This is the ambiguity number. Every escalation is a signal that the policy is genuinely unclear at that boundary. A low escalation count that also has a low readiness percent is a bad sign — partners are not asking, which usually means they have not read the runbook yet.

<div class="callout">
<p class="callout-title">If you have to roll a strict policy across an uneven partner base</p>
<ol>
<li>Tier by readiness, not by region. Region is the wrong axis.</li>
<li>Write a runbook. The policy PDF is a legal artifact and reads as one.</li>
<li>Every runbook needs a worked example. Ambiguity is what causes incidents.</li>
<li>Name the contact for the unready tier. A named person is worth more than a mailbox.</li>
<li>Track two numbers before deadline — schedule progress and escalation count. Both together tell you what is happening.</li>
</ol>
</div>

## Why zero is the boring outcome

Zero compliance incidents sounds like a strong result. Inside the rollout it was the expected one. The tiering was designed so that the unready partners had enough support to not ship broken, and the ready partners were not held up waiting for them. Incidents come from either forcing an unready partner to the same deadline as a ready one, or from an ambiguity in the runbook that never surfaced as an escalation.

Related: [how I automated 40 hours of partner busywork out of the same programme](/writing/apps-script-partner-automation), and [the attribution schema that ran alongside it](/writing/community-attribution-layer).
