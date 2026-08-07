---
title: "Two numbers per source is most of community attribution"
slug: two-metric-attribution-audit
seoTitle: "The two-metric community attribution audit"
description: "Before you build a schema, run this. Two numbers per source — how many showed interest, how many converted — and where your growth is stuck becomes obvious."
date: "2026-08-05"
featured: 11
category: "Attribution"
cardLabel: "Two numbers, one afternoon"
shortTitle: "The two-metric audit"
faq:
  - q: "How do you track where community members come from?"
    a: "Pick one action that counts as real interest, make every source tag it, and count two things per source: how many crossed that line, and how many of those became something the business counts. Volume and conversion rate. Those two numbers per source tell you more than any dashboard."
  - q: "What is a prospecting audit?"
    a: "A yearly review where you list every channel people find you through, then track two metrics for each: how many took a low-commitment step showing genuine interest, and how many of those converted. The framework comes from community strategist Brianna Leever. It works because it forces you to compare sources on the same terms."
  - q: "Why track threshold crossings instead of total traffic?"
    a: "Traffic tells you who arrived, not who was interested. A threshold is a small deliberate action — booking a call, joining a workshop, applying to a programme. Counting those filters out passers-by, and it is the first point where a person becomes traceable."
---

Before you build anything, run this. It takes an afternoon and it will tell you more than most dashboards.

For every place people find you, write down two numbers.

**How many showed real interest.** Not visits. A deliberate action — they applied, they booked something, they signed up for the workshop.

**How many of those became something the business counts.** A signup, an activation, a paying customer, a partner who shipped.

That's it. Two numbers per source. **Volume and conversion rate, side by side, for every channel you use.**

I got this from [Brianna Leever](https://www.emberconsulting.co/post/how-to-grow-your-community), who runs it as a yearly review she calls a Prospecting Audit. She works with paid communities, not developer tools. The framework transfers completely.

## Why two numbers and not twenty

Because the two answer different questions, and most reporting collapses them into one.

Volume tells you where people come from. Conversion tells you which of those people were worth having. **They are usually not the same source**, and that gap is the most useful thing you will learn all quarter.

A conference talk brings 400 people and 3 convert. A single tutorial from a partner brings 40 and 12 convert. The talk looks better in every report anyone has ever built, because reports count people. The tutorial is doing the actual work.

If you only track volume, you will keep buying the talk.

## Pick one threshold and never move it

The trick that makes this work is having a single line that counts as interest, used identically everywhere.

Booking a call. Applying to the programme. Registering for the workshop. It doesn't matter which — it matters that it's one thing, that every source funnels to it, and that it's recorded.

The moment you have two thresholds, sources stop being comparable. LinkedIn drives newsletter signups, the conference drives call bookings, and now you're comparing two things that mean different amounts of intent. You will guess, and you will guess in favour of whichever number is bigger.

<div class="callout">
<p class="callout-title">The audit, in four steps</p>
<ol>
<li>List every source. Every place someone could find you.</li>
<li>Pick one threshold action. The same one for all of them.</li>
<li>For the last 12 months, count crossings per source.</li>
<li>Count how many of those converted, per source.</li>
</ol>
</div>

Then read it like this.

| What you see | What it means |
| --- | --- |
| High volume, low conversion | You're reaching people, but not the right ones. Check the message, not the channel. |
| Low volume, high conversion | Your best source, and almost certainly under-funded. Do more of this. |
| High both | Protect it. Find out why it works before you touch anything. |
| Low both | Stop. You are spending time here out of habit. |

Most people have one row in the second bucket and have never noticed, because it never looked impressive enough to report.

## Where this stops working

Two places, and they arrive at the same time.

**When you need to attribute to a person rather than a channel.** The audit says "partner content converts well." It cannot say *which partner*. The moment you're deciding who to pay, channel-level is useless. Every payout conversation needs a name attached.

**When once a year stops being often enough.** An annual audit is a rear-view mirror. It's fine while you're deciding roughly where to spend next year. It is no help at all during a launch, when you need to know what's happening this week.

Both problems have the same fix. Log the raw event with the source and the person attached. Then the annual summary and the live view fall out of the same data. [Here's the schema and the tooling for that](/writing/community-attribution-layer) — four tables, no engineering help required.

## Do the simple one first anyway

I'd still run the audit before building anything, and I've skipped that step before and regretted it.

Building the schema first means guessing which sources matter and instrumenting all of them. Running the audit first tells you which three sources are worth instrumenting properly, and lets you ignore the rest for now.

It also gives you a number to show while you're still building. That matters more than it sounds. Attribution work takes weeks, and "I'm building a system" is a bad answer when someone asks what community returned last quarter. "These two sources produce 80% of our converted signups" is a fine answer, and you can have it by Friday.

The audit is not a smaller version of the schema. It's the thing that tells you what the schema should be about.
