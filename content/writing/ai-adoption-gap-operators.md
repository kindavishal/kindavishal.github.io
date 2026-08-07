---
title: "Almost nobody has actually tried this yet"
slug: ai-adoption-gap-operators
seoTitle: "The AI adoption gap is bigger than it looks"
description: "84% of people have never used AI. That is not a reason to wait — it is the reason the operators who build their own tools right now get a long head start."
date: "2026-08-07"
featured: 13
category: "The field"
companies: ["Observations"]
cardLabel: "84% haven't tried it"
shortTitle: "Nobody has tried this yet"
faq:
  - q: "How many people actually use AI tools?"
    a: "Far fewer than the coverage suggests. As of February 2026, around 84% of the global population had never used AI at all, and only about 0.3% were paying subscribers. The conversation is loud and the adoption underneath it is shallow."
  - q: "Can someone without a coding background build with AI?"
    a: "Yes, for internal tools. A community manager at Glean used a mix of AI tools and a widget builder to redesign an entire community experience in a couple of weeks, work that would previously have needed developers, designers and an implementation team. The limit is problem definition, not syntax."
  - q: "Where should a non-technical person start with AI at work?"
    a: "With one thing you already do badly or slowly, not with a tool you read about. Refining writing you have already drafted, pulling themes out of a pile of conversations, or building one small internal dashboard. Anchor to an outcome you wanted anyway, then pick whatever gets you there."
---

Everyone is talking about AI. Almost nobody is using it.

As of February 2026, around **84% of the world had never used AI at all**, and about **0.3% were paying subscribers**. Those numbers came up in a [session on practical AI for community managers](https://www.communityconsultants.life/post/practical-ai-use-cases-for-community-managers). They stopped me. They don't match the volume of the conversation at all.

I've argued that [an operator can now ship their own internal tools](/writing/tubemonitor-vibe-coding) — I built one in a week without being able to write production code. I still think that's true. These numbers make it *more* interesting, not less.

## The gap is the opportunity

If something useful is real and almost nobody uses it, the people who start early get a long run before it's normal.

That's not a prediction about technology. It's just what happens whenever a useful thing is available and unevenly adopted. The spreadsheet did this. So did being the person on a team who could write a decent SQL query.

The window closes eventually. Right now it is wide open, and the reason is not that the tools are hard. It's that most people have not sat down and tried.

## Why adoption is this shallow

Not scepticism. Overwhelm.

There's so much launching every week that keeping up feels like the task, and keeping up is impossible, so people don't start. The advice from that session was blunt and correct: don't chase tools, anchor to outcomes. Pick a thing you already wanted to be true and find whatever gets you there.

That's how I'd put it too. I didn't set out to learn AI-assisted building. I needed tracking that our third-party tool couldn't do, and building it myself was the shortest path.

The other reason adoption looks shallow: a lot of what people call using AI is refining text they already wrote. That's real, and it's useful, and it isn't the thing that changes your job.

## What the change actually looks like

One example from that session stuck with me. A community manager at Glean, with no coding background, used AI tools and a widget builder to redesign an entire community experience in **a couple of weeks**. That work would previously have needed developers, designers and an implementation team lined up in a queue.

That's the same shape as what I did at Firecrawl, in a different company, by a different person, on a different problem. Which is the part worth noticing. When the same unusual thing happens independently in two places, it's a pattern rather than a story.

<div class="callout">
<p class="callout-title">Where I'd start, in order</p>
<ol>
<li>Pick one thing you already do slowly and hate. Not a tool you read about.</li>
<li>Write down what a good result looks like before you begin. If you can't, the problem isn't ready.</li>
<li>Build the smallest version that produces that result.</li>
<li>Use it for two weeks. Most of what you learn arrives here, not during the build.</li>
</ol>
</div>

Step two is the one people skip, and it's the whole thing. I've written about [why the spec is the hard part](/writing/tubemonitor-vibe-coding) — if you haven't said what good looks like, you can't tell whether the output works. You can only tell whether it runs.

## The part I'd argue with

There's a real warning in that session and I want to repeat it properly. These tools are very good at telling you what you want to hear.

That's a genuine risk when you're using one to think, not just to type. If you ask whether your programme design is sound, you will usually be told yes. The fix is cheap — ask for the opposite case, explicitly, every time it matters. I do this and it still catches me.

The related risk for operators: it is now easy to produce something that looks finished and is wrong. My tracking tool had a data freshness bug I didn't catch until a launch week, because it ran and looked right. Running is not working.

## Not a reason to wait

The honest read of 84% is not "this is overhyped, sit it out." It's that the gap between talking about this and doing it is enormous. Almost nobody has crossed it.

I'd rather be early and occasionally wrong than wait for it to be obvious. By the time it's obvious, the advantage is gone and it's just a job requirement.

Pick one thing you do slowly. Build the small version this week. That's the whole recommendation.
