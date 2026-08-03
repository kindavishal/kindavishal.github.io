---
title: "Your creator program is training the models that recommend you"
slug: share-of-model-creator-content
description: "Share of voice used to mean where you show up on a channel. Now it also means whether an AI names you when a developer asks what to use. Here's how I'd track it."
date: "2026-08-03"
featured: 7
category: "Attribution"
cardLabel: "Share of model"
shortTitle: "Share of model"
faq:
  - q: "What is share of model?"
    a: "It measures how often an AI system names your product when someone asks it a question your product answers. Share of voice asks where you appear on a channel a human browses. Share of model asks whether you get named at all when the answer is generated rather than browsed."
  - q: "Does creator content affect what AI models say about a product?"
    a: "It is one of the inputs. Tutorials, comparisons and code walkthroughs are exactly the kind of technical writing that ends up describing how a tool works and what it is for. A creator program that produces clear, accurate explanations is producing the same material that shapes how a model describes your product later."
  - q: "How do you measure whether AI tools recommend your product?"
    a: "Write down the questions a developer would actually ask, run them on a fixed schedule across the models your users use, and log which products get named and in what order. It is the same method as any tracking job: fixed prompts, regular cadence, results in a table you can query over time."
  - q: "Is share of model different from SEO?"
    a: "The goal overlaps and the mechanics do not. Search returns a ranked list a person chooses from, so position matters and being on page one is worth something. A model returns one answer, so being named third in a list of three is much closer to not being named at all."
  - q: "What kind of content gets a developer tool named by AI?"
    a: "Content that states plainly what the tool does, what it is for, and how it compares to the obvious alternatives. Tutorials that show real integration work, and comparisons that are specific rather than promotional. Vague, promotional content gives a model nothing quotable to reuse."
---

At Firecrawl I tracked competitive share of voice across our creator network. The question was simple. On a given creator's channel, is that audience spending more time with us or with a competitor?

That was a useful number for deciding where program budget went. It's about to be useful for a second reason I didn't build it for.

**Share of voice asks where you show up on a channel someone browses. Share of model asks whether you get named at all when the answer is generated instead.** Those are different questions now. The second one is getting more important.

## Why this changed

A developer picking a scraping library used to search, skim four or five results, and choose. Being on page one was worth something even at position six, because a person was doing the choosing.

More of that now starts with a question to a model. The answer comes back as prose, naming two or three options. There is no page one. You're named or you aren't. Being third of three is much closer to absent than sixth on a search page ever was.

That's a harsher distribution than search. It also isn't bought — you can't buy placement in a generated answer the way you can buy an ad slot.

## Creator content is unusually well shaped for this

Here's the part that connects to program work.

A model describes a tool from text that explains three things. What it does, what it's for, how it compares to the obvious alternatives. Good developer creator content is *exactly that*. A tutorial that builds something real, and says why this tool handled that step, is a specific description of the product's job.

So a creator program making genuinely useful technical content is also making the material that shapes how your product gets described later. That's a second return on the same spend, and almost nobody is counting it.

It also puts more weight on a decision I already argued for elsewhere: [paying for the video rather than the views](/writing/creator-payout-design). Content optimised for click-through is thin on exactly the specifics that make a description reusable. Content built to answer a real technical question is dense with them. If you pay for thumbnails, you get thumbnails.

## How I'd track it

The method is the same as any tracking job. Fixed inputs, regular cadence, results in a table you can query.

| Step | What it means |
| --- | --- |
| Fix the prompt set | Write the 20–30 questions a developer would actually ask. Not "what is X" — "how do I get structured data off a page that renders client-side". |
| Hold it still | Never edit a prompt once tracking starts. A changed prompt makes the whole history uncomparable. |
| Run on a schedule | Weekly is enough. You are watching a trend, not an event. |
| Log what gets named | Which products appear, in what order, and roughly how they're characterised. |
| Store one row per run | Prompt, model, date, products named, position. Same discipline as any event log — never summarise at write time. |

<div class="callout">
<p class="callout-title">What to watch, in order</p>
<ol>
<li><strong>Named at all.</strong> The only binary that matters. Track it first.</li>
<li><strong>Named first.</strong> Position within the answer, where an answer gives one.</li>
<li><strong>Described accurately.</strong> Being named for the wrong job is its own problem.</li>
<li><strong>Who you appear beside.</strong> Your real competitive set, as a model understands it — which may not match the one in your deck.</li>
</ol>
</div>

That last row is the one I'd have found most useful at Firecrawl. The competitors you get grouped with are a read on how the market sees your category. It's cheaper to collect than any survey.

## Be honest about what this is

I have not run this at scale, and I want to be straight about that. I built share of voice for a creator network on YouTube. This is the extension of that method to a surface that matters more than it did a year ago.

So treat it as a method, not a result. A few things I'd expect to go wrong:

**The numbers move on their own.** Models get updated and your position changes without you doing anything. Weekly noise is not a signal. Look at months.

**You cannot attribute it to a person.** Everything I've written about [connecting an action to a business result one person at a time](/writing/community-attribution-layer) does not apply here. Nobody clicks a link. It is a visibility measure, and it should sit next to your attribution numbers rather than inside them.

**It is easy to game badly.** Flooding the web with thin content is the obvious move. It's also self-defeating, because it degrades the content quality that got you named.

## The part I'd argue

Community and creator programs have spent years being measured on reach, then on pipeline. Both of those still matter.

But a good program quietly produces a third thing. A clear, accurate explanation of your product — the kind that ends up in the systems developers ask first. That's an asset with a long life, and no line item.

If you run a creator program, you're already making it. The question is whether you can show it.

That question — what to actually claim when someone is deciding whether your programme continues — is [the one that decides budgets](/writing/community-metrics-budget-review).
