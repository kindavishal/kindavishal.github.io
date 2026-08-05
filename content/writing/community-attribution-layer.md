---
title: "How to prove what your developer community returned, without engineering help"
slug: community-attribution-layer
seoTitle: "DevRel attribution: prove what your community returned"
description: "A DevRel attribution schema you can actually build: four tables, an Apps Script to Looker Studio pipeline, and no engineering time required."
date: "2026-07-22"
featured: 6
homepage: 3
category: "Attribution"
cardLabel: "Apps Script → Looker Studio"
shortTitle: "The attribution layer"
faq:
  - q: "What is a community attribution layer?"
    a: "It is what connects a community action to a business result, one person at a time. It answers two questions from the same data: what a member got out of the community, and what the company got back. Without it, community reporting is a list of activities instead of a record of what came back."
  - q: "How do you measure DevRel ROI?"
    a: "Trace a business result back to a named community source, one person at a time. Most DevRel measurement advice stops at naming metric categories — reach, engagement, qualified leads. The gap is the data model underneath. Without a schema that links an event to a person to an outcome, the categories stay a list of things you cannot actually produce."
  - q: "Can you build DevRel attribution without engineering support?"
    a: "Yes. Google Apps Script can collect and clean up the data on a schedule, Google Sheets can hold it, and Looker Studio can make it readable. The hard part is not the tech. It is that developer relations and community teams rarely get engineering time, so the work has to be doable by the person who needs it."
---

Two questions are hard to answer in most community work.

What did a member actually get out of this? And what did the company get back?

Most community teams can't answer either one with evidence. They answer the first with testimonials and the second with activity counts — events run, messages sent, members joined. Both are real. Neither is a return.

**An attribution layer is what connects a community action to a business result, one person at a time.** That's it. It isn't a dashboard. It isn't a metrics framework. It's a data model, plus a job that keeps it up to date.

Most writing on DevRel measurement stops one step short of this. It tells you which metric categories matter — reach, engagement, qualified leads — and leaves you to work out where the numbers come from. The categories were never the hard part.

I've built one three times. At Google it turned manual reporting into something the programme could actually see itself in. At Firecrawl it tracked affiliate performance down to each partner, and the team used it to decide payouts. Here's the pattern.

## Why this never gets built

Not because it's hard. Because of where you sit in the queue.

Showing what community work returned needs engineering time, and community is near the bottom of the list for engineering time on every team I've worked on. That isn't a complaint about engineers. It's the right call when the other option is shipping product. But it leaves you stuck: the team that most needs to prove its value is the team least likely to get the tools that would prove it.

So the reporting gets done by hand. Someone exports four CSVs on the last Friday of the month and pastes them into a deck, and the number is old before the meeting starts. It's slow, it looks different every month, and nobody can check it. So nobody quite trusts it. So when budgets get tight, the programme gets cut on instinct.

The way out is to build it yourself, with tools that don't need a ticket.

## The four-table schema

Everything runs on four tables. This is the part worth copying.

| Table | One row per | Key fields | What it's for |
| --- | --- | --- | --- |
| `people` | Human | `person_id`, known emails, handles per platform, first-seen date | Working out who is who. The same person is a GitHub handle, a Discord ID, and an email. This is where they become one row. |
| `events` | Action | `event_id`, `person_id`, `type`, `source`, `timestamp`, `ref_code` | The raw log. Attended, posted, published, referred, applied. Never added up when you write it. |
| `attribution` | Credited link | `event_id`, `partner_id`, `model`, `weight` | Connects an event to whoever gets credit, and under which model. Keeping it separate is what lets you change the model later. |
| `outcomes` | Business result | `outcome_id`, `person_id`, `type`, `value`, `timestamp` | Signup, activation, conversion, expansion. The things finance already counts. |

Four rules make it work.

**Never add anything up when you write it.** Store the single event. Any summary you need later, you can work out. A summary you stored, you can't get the detail back from. My first version broke this rule and I paid for it within a month.

**Keep attribution in its own table.** The moment credit rules live inside the event log, switching from last-touch to multi-touch means rewriting your history. Keep them apart and a model change is just a new query.

**Work out who is who before you need to.** The hardest join is one person across platforms. Start saving handles on day one, even when you have nothing to match them to yet.

**Put a `ref_code` on everything you control.** Every link a partner shares, every event signup, every application form. Attribution you set up beats attribution you guess at later, every time.

## The three tools

**Apps Script collects and cleans up.** Triggers run on a schedule. Each source gets one function whose only job is to pull raw records and write them into `events` in the shape above. Keep the fetch and the clean-up in separate functions. When a source changes its format, and it will, you fix one function.

**Sheets holds it.** Not because it's the right database, but because you already have access, everyone can read it, and Looker Studio plugs straight into it. Sheets will hold a few hundred thousand rows before it complains. That's more than most community programmes make in years. When you outgrow it, the same schema moves to BigQuery unchanged. That's the point of getting it right now.

**Looker Studio makes it readable.** One page per question, not one page per data source. The dashboard people use answers "which partners do we pay this month" on one screen. The dashboard people ignore is a wall of charts sorted by where the data came from.

All of it is free. The cost is a few days of your time and the discipline to keep the schema clean.

<div class="callout">
<p class="callout-title">Build order that works</p>
<ol>
<li>Define <code>outcomes</code> first. Start from what finance already counts, so you never argue about whether the result is real.</li>
<li>Put a <code>ref_code</code> on every link and form you control. Do this before anything else.</li>
<li>Log <code>events</code> raw, one row per action. Don't add anything up.</li>
<li>Add <code>people</code> and start matching identities as the joins become possible.</li>
<li>Build <code>attribution</code> last, once you can see what the data supports.</li>
</ol>
</div>

Build it in that order and you have something useful after step two. Build the dashboard first and you'll have something pretty that nobody acts on.

## Start here

Put a `ref_code` on every link and form you control, this week, before you build anything else.

It costs an afternoon. It's the only part that gets permanently harder the longer you wait, because attribution you didn't capture is attribution you can't get back. Everything else here can be built later, against data you're already collecting.

Then comes the harder question — not what you can count, but what you should claim. That's [the community metrics that survive a budget review](/writing/community-metrics-budget-review).
