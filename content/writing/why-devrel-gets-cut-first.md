---
title: "Why DevRel gets cut first"
slug: why-devrel-gets-cut-first
description: "Two in five DevRel programmes have no formal budget, and a third are under pressure to show metrics they were never set up to produce."
date: "2026-08-03"
featured: 9
category: "The field"
companies: ["Observations"]
cardLabel: "Cut first, and why"
shortTitle: "Why DevRel gets cut first"
---

<figure class="bv-figure bv-hero"><img src="/assets/writing/post06-hero-four-devrel-numbers.svg" alt="State of DevRel 2023 in four numbers: 40.4% had no formal budget, 43.4% at large companies lost staff in layoffs, 34.2% faced new metrics pressure the programme wasn't set up to produce, 36.2% felt vulnerable." loading="lazy" decoding="async" width="900" height="500"><figcaption>Four numbers from the State of DevRel report, 2023.</figcaption></figure>

Two in five developer relations programmes run with no formal budget at all.

That's from the [State of Developer Relations survey](https://www.stateofdeveloperrelations.com/2023devrelreport) — 40.4% of respondents had no set budget or didn't know what theirs was. In the same survey, 43.4% of DevRel teams at large companies lost staff to layoffs, and over half of medium and large companies cut DevRel budgets.

Put those two facts next to each other and the pattern is not mysterious.

**A team with no budget line has nothing to defend.** There's no number to argue from, no baseline to point at, and no record of what the spend returned. When someone goes looking for cuts, that team isn't the least valuable one. It's the cheapest one to remove, because removing it costs no argument.

I'm writing this while looking for my next role, so read it with that in mind. It is not a complaint. I think we did some of this to ourselves. Me included.

## The market underneath this

The broader picture is bad and it isn't specific to DevRel. [Layoffs.fyi](https://layoffs.fyi/) has tracked over 125,000 tech employees laid off across 263 companies in 2026 so far, as of early August. Software job postings have been well below pre-2020 levels for a while now.

So some of what is happening to community and DevRel roles is simply what is happening to tech. Any argument that ignores that is flattering itself.

But two things in the survey data are specific to this field, and they are the ones worth sitting with.

**34.2% of DevRel respondents reported more pressure to show metrics to leadership.** **36.2% said they felt vulnerable about job stability.** Those two numbers move together, and the order matters. The pressure to show metrics arrives *after* the budget conversation has already started going badly.

By then it's too late. You cannot instrument a programme retroactively. Attribution you didn't capture is gone.

## What "unmeasurable" actually means

The usual defence is that community work is just hard to measure. I've made that argument myself and I no longer believe most of it.

Some of it is genuinely hard. A developer who reads a tutorial, tells a colleague, and never clicks a link is invisible, and no amount of tooling fixes that. That part is real.

But most of what goes unmeasured in DevRel is not unmeasurable. It's uninstrumented. Nobody put a tracking code on the link. Nobody logged which partner drove which signup. Nobody stored the raw event, so no summary can be produced now. That isn't a measurement problem. It's a decision nobody made.

And there's a reason nobody made it: attribution needs engineering time, and DevRel is never first in the queue for engineering time. That is the right call, right up until it becomes the reason the team is cut.

<div class="callout">
<p class="callout-title">The uncomfortable version</p>
<ul>
<li>Two in five programmes have no formal budget.</li>
<li>A third are under new pressure to show metrics.</li>
<li>The pressure arrives after the budget conversation turns.</li>
<li>Instrumentation cannot be applied backwards.</li>
<li>So the team is asked to prove something it can no longer prove.</li>
</ul>
</div>

## Why activity counts make it worse

When a team under pressure reaches for numbers, it reaches for the ones it has. Events run. Members joined. Content published. Impressions.

Those are the numbers most likely to be available and least likely to help. A stakeholder cutting your budget does not lose messages. They lose whatever the messages led to. Bringing activity counts to that conversation reads as an attempt to look busy, which is worse than bringing nothing.

I've written separately about [which metrics actually survive that meeting](/writing/community-metrics-budget-review). The short version: a business result traced back to a named source in your programme survives. Everything else is input, not return.

<figure class="bv-figure"><img src="/assets/writing/post06-interior-attribution-timing.svg" alt="DevRel attribution timing: instrument links, forms and registrations at T=0 (an afternoon of work) or you cannot prove impact by the time the budget conversation turns and metric pressure arrives — attribution cannot be applied backwards." loading="lazy" decoding="async" width="900" height="500"><figcaption>Attribution cannot be applied backwards.</figcaption></figure>

## What I'd actually do

If you're in a DevRel or community role right now and the budget conversation hasn't started yet, you have an advantage you will not have in six months.

**Instrument before you need to.** Put a tracking code on every link, form and registration you control. This week. It costs an afternoon and it's the only step that gets permanently harder with delay.

**Build the smallest version yourself.** Waiting for engineering time is how teams arrive at the budget review with nothing. Apps Script, Sheets and Looker Studio will carry a community programme for years, and none of it needs a ticket. I've written up [the schema and the pipeline](/writing/community-attribution-layer) — four tables, no engineering help.

**Pick one business outcome and trace it end to end.** One is enough. A single number with a defensible chain behind it beats a dashboard of counts.

## The part I'd argue with myself about

Measurement is not a shield. If the company is cutting 15% across the board, a good attribution layer does not save your role, and I'd be selling something if I claimed otherwise.

There's a harder version too. If you instrument the programme and the numbers come back weak, you've built the case against yourself. That happens. I still think it's the right trade, because a programme that can't show a return probably should be questioned, and you'd rather find that out while you can still change it.

What measurement buys you is not safety. It's the ability to have the conversation on evidence instead of instinct — and to leave with a number you can put in front of the next employer.

That last part matters more than people admit. The teams being rebuilt right now are hiring people who can show what their work returned. Not people who ran good programmes. People who can prove it.
