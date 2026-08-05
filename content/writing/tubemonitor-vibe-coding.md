---
title: "I can't write production code. I shipped the internal tool in a week anyway."
slug: tubemonitor-vibe-coding
seoTitle: "Shipping an internal tool in a week as a non-engineer"
description: "The third-party tracker was under-counting our creators. So I specced and shipped a replacement in a week — and the spec, not the code, was the hard part."
date: "2026-07-16"
featured: 5
category: "Internal tooling"
cardLabel: "Spec → shipped in a week"
shortTitle: "Shipping TubeMonitor"
faq:
  - q: "Can a non-engineer build an internal tool with AI?"
    a: "For internal tools — dashboards, data pipelines, reporting surfaces — yes. The limit is no longer whether you can write the code. It is whether you can define the problem precisely enough that the output can be checked. Customer-facing production systems are a different question and still need an engineer."
  - q: "What makes AI-generated code actually work?"
    a: "A written spec per component, and specific bug reports. Say what data comes in, what the component does, what state it produces, and what failure looks like. When something breaks, describe the observed behaviour against the expected behaviour rather than guessing at the code. Vague reports get vague fixes."
  - q: "Should you build or buy internal analytics?"
    a: "Buy when the tool measures something standard and you have no special access to the data. Build when the thing you need is missing from every option and you already have the means to collect it. We were missing organic mentions no vendor could see, and we owned a scraper, so building was the shorter path."
  - q: "What is competitive share of voice for creator programs?"
    a: "It measures where your product shows up relative to competitors on the same creator's channel. Not just how many views your content gets, but whether that audience is spending more time with your content or someone else's. It is the number that actually informs where to put program budget."
  - q: "How long does it take to build an internal dashboard this way?"
    a: "TubeMonitor went from spec to deployed and in use across teams in one week. Most of the value came from the hour spent listing every question the dashboard had to answer before any code existed. That list became the acceptance criteria."
---

At Firecrawl, our YouTube tracking was broken. Not completely — the third-party tool was logging data. But it was under-counting creators in our network, missing views on untagged videos, and producing weekly reports that didn't answer the questions the team actually had.

I could fix the tool or replace it. I replaced it, in a week.

I'm not an engineer. I can read code well enough to understand what it does and check output against what I expected. I can't write production systems. **That turned out not to be the binding constraint — defining the problem was.**

## The data problem

The third-party tool tracked what it was set up to track: direct referral links and tagged video URLs.

What it missed was everything else. Organic mentions. Untagged tutorials. Competitor comparisons where Firecrawl came up in passing. Views that came from a creator's social post pointing at a video nobody had tagged.

So when I reported creator program results, I was under-counting reach every single week. That's a data collection problem, not a dashboard problem. You cannot fix it with a better chart.

## Why build instead of buy

I looked at other YouTube analytics platforms. The enterprise ones were expensive and still couldn't surface organic mentions without a custom feed. The cheap ones didn't have the API depth to track a whole creator network.

Then there was the obvious thing. Firecrawl is a web scraping tool. I had access to a scraper that could pull structured data from YouTube pages at scale. Buying a third-party YouTube analytics tool when Firecrawl is the product felt like buying a hammer while standing in a hardware store.

The general rule: buy when the thing is standard and you have no special access to the data. Build when what you need is missing everywhere and you already hold the means to collect it.

## The spec is the work

I treated it the way a PM directs an engineering team. Write the spec, check the output against it, name the failures precisely, iterate.

Every component started with four written lines.

<div class="callout">
<p class="callout-title">The four lines every component needed</p>
<ol>
<li>What data comes in.</li>
<li>What the component does to it.</li>
<li>What state it produces.</li>
<li>What failure looks like.</li>
</ol>
</div>

That fourth line is the one people skip, and it's the one that makes the rest checkable. If you haven't said what broken looks like, you can't tell whether the thing works — you can only tell whether it runs.

The most important hour of the build was the session before any code existed, where I listed every question the dashboard had to answer. That list became the acceptance criteria for each component and the test for each round of changes.

## How do you debug code you didn't write?

By describing behaviour, not code.

This was the single biggest difference in output quality, and it's the part I'd teach first.

| A bad bug report | A good one |
| --- | --- |
| "It's not working." | "The view count for creator X shows 0 after the scrape cycle finishes." |
| "Fix the query." | "The Supabase table has the correct row inserted, so the write is fine." |
| "Something's wrong with the data." | "The read is filtering on the wrong field." |

The left column produces confident, wrong fixes. The right column produces correct ones, because it separates what you observed from what you assumed. You don't need to know how to fix it. You need to know exactly what happened and exactly what you expected instead.

That skill isn't new, either. It's the same thing that makes a good bug report to a real engineer.

## The stack

Next.js for the dashboard. Supabase for storage, so there was no backend to maintain. Vercel for deploys with previews, so I could test against real data before shipping. Firecrawl as the data layer, pulling video metadata, view counts and engagement signals.

Every choice was made for the same reason: nothing to set up, nothing to maintain, fast loops.

What it tracks: view performance across the network, **spillover** from videos never formally tagged — the thing the old tool missed entirely — engagement relative to views as a rough quality signal, and competitive share of voice.

Share of voice is the most useful surface. It tells you not just how many views our content got, but whether a creator's audience is spending more time with us or with a competitor. That's the question that actually decides where program budget goes.

It shipped in a week and replaced the third-party tool the same week. Marketing, partnerships and the founders used it for weekly reporting.

## What I got wrong

Data freshness. I built the scrape cycle to run daily, which is fine most of the time and useless during a launch week, when you want to see what's happening now. I switched to scraping on request with a cache — pull fresh data if what's stored is more than two hours old.

I should have asked "how stale can this be?" in the spec. It's the same kind of question as "what does failure look like", and I'd left it out.

## The part worth arguing about

The gap between an operator who can describe a system and an operator who can ship one used to be months of learning to code. It's now a few days, if you can write a precise spec and hold the output to a real standard.

I don't think that's a small change. Operators who get this now will spend the next few years shipping the tools they need instead of waiting in a queue for engineering time. Everyone else keeps waiting.

I still don't ship customer-facing code, and I'm not going to. But for internal tools, the limit stopped being technical skill a while ago. It's problem definition, and that was always the job.

Tracking one network is one thing. The general pattern — connecting any community action to a business result — is [the attribution layer](/writing/community-attribution-layer).
