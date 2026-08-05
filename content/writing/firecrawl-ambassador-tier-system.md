---
title: "How I designed a five-tier ambassador program that 4x'd creator referrals"
slug: firecrawl-ambassador-tier-system
seoTitle: "How I designed a five-tier ambassador program"
description: "A developer ambassador program built from zero: why tier is one rolling number, not follower count, and how ten creators became a 4x lift in referrals."
date: "2026-06-17"
featured: 2
homepage: 1
category: "Creator programs"
cardLabel: "1.7K → 7.2K weekly"
shortTitle: "The tier system"
faq:
  - q: "What should decide a creator's tier?"
    a: "One number, measured the same way for everyone. At Firecrawl it was a rolling three-month average of YouTube views. Not follower count, and not lifetime views. Reach is the only thing a tier should measure, because how deep a creator goes belongs in what you pay per piece, not in the tier itself."
  - q: "Why use a rolling average instead of follower count?"
    a: "Follower count tells you how many people signed up once. A rolling three-month average tells you how many people are watching now. A big channel that has gone quiet and a smaller channel that is climbing will look identical on followers and very different on a rolling average. You are buying attention, so measure attention."
  - q: "How many tiers should a developer ambassador program have?"
    a: "Five worked for us. It was enough to tell an early creator apart from an established one without making people slow to sort. The number matters less than whether the entry rule is written down and measurable. Two tiers with a real rule beat six tiers assigned on instinct."
  - q: "How is a developer ambassador program different from a brand ambassador program?"
    a: "Most brand ambassador advice is written for consumer products, where reach is the whole job. In DevRel the audience is technical, so depth counts separately from reach — a creator who has actually built with the API is worth more than a larger channel that only mentions it. That is why tier and content type are priced as two different things."
  - q: "How do you recruit the first cohort?"
    a: "By hand, with no public launch. Find creators who already mention your product or tools next to it, check their depth from what they have already made, and send short outreach about something specific they built. It is slower per creator than an open application and it sets the quality bar for everyone who applies later."
---

When I joined Firecrawl post-Series A, the company had no creator program. A few creators were making content on their own. A few intro emails were sitting unanswered. There was no structure for what "working with creators" even meant.

Four weeks later there were ten ambassadors across five tiers. In the months after, creator-attributed referrals went from 1.7K to 7.2K weekly.

The design decision that made the rest of it work was small and boring. **Tier is set by one number, and that number is a rolling three-month average of views.** Not follower count. Not lifetime views. Everything else in the program hangs off that.

## Why most creator programs fail

Not for lack of good creators. They fail because the program never says what it's picking for.

You get vague entry criteria, patchy outreach, and a roster of "ambassadors" who don't know what they're meant to do or why they were picked. The program gets harder to run with every person you add, because every call is a fresh judgment call.

So the question wasn't "how do we get creators to mention Firecrawl". It was: how do we build something that gets *stronger* as it grows instead of heavier?

## Separate reach from depth

Here's the mistake I see most often. Teams try to rank creators on one blended score — audience, plus technical skill, plus how good their last video was — and end up with a number nobody can explain or defend.

We split it in two.

**Tier measures reach, and nothing else.** How many people will see this. One metric, same rule for everyone, no interpretation.

**What you make measures depth.** A full video where the product is the subject is worth more than a walk-on appearance in someone else's build, which is worth more than a passing mention. Same creator, three different rates, depending on what they actually made.

Two axes instead of one. It sounds like a small thing. It removes almost every argument you would otherwise have, because a creator can see exactly which lever they're pulling.

## Why the rolling average

Follower count tells you how many people signed up once, possibly years ago. A rolling three-month average tells you how many people are watching now.

Those two numbers come apart fast. A large channel that has gone quiet and a smaller channel that is climbing look nearly identical on followers, and nothing alike on a rolling average. You're buying attention, so measure attention.

It also fixes the direction of the conversation. Under a lifetime metric, a creator's number can only ever go up, so the tier drifts away from reality and you eventually have to claw it back. Under a rolling metric the number moves both ways on its own, and nobody feels punished when it does. Growth shows up on its own too — a creator whose numbers have climbed can ask for a review, and the answer is a lookup rather than a negotiation.

<div class="callout">
<p class="callout-title">The tier rules, in short</p>
<ul>
<li>One metric sets tier: a rolling three-month average of views.</li>
<li>Not follower count, not lifetime views.</li>
<li>Five tiers, each with a written entry range.</li>
<li>What you make is priced separately, so depth never gets mixed into tier.</li>
<li>Tier reviews happen on request, on a fixed cycle — never as a surprise.</li>
</ul>
</div>

The written range is the part people skip. It's also the part that makes the hard conversations easy. When someone doesn't meet the bar, you point at a rule instead of defending a judgment.

## Ten in four weeks, by hand

No launch post. No "apply here" blast.

I found creators who had already mentioned Firecrawl or tools next to it. I checked their depth from what they'd already made, then sent short outreach about one specific thing they'd built.

Ten creators across five tiers in four weeks. One early integration did 60K views in its first week.

An open application would have been faster and worse. The first cohort sets the bar everyone after them gets measured against, and it sets the tone of the community they're joining. Picking ten people by hand is a two-week cost that pays back for a year.

The whole thing ran on Typeform, Notion and Slack. No enterprise SaaS. Typeform for intake, Notion as the source of truth for tier and milestone status, Slack for updates and the creator channel. The only custom piece was [TubeMonitor](/writing/tubemonitor-vibe-coding), the tracking tool I had to build myself.

## What the numbers did

Creator-attributed referrals went from 1.7K to 7.2K weekly. A 4x increase.

The growth didn't come from adding more creators. It came from better content by well-briefed creators who understood what they were building with. Volume without quality would have flattened the numbers and produced videos nobody watched past the first minute.

That difference matters when you report upward. "We signed 40 ambassadors" is an activity number. "Referrals went 4x on ten ambassadors" is a result. Only one of those survives a budget review.

Tier is only half the design though. What you pay per piece of content, and what you pay to keep someone around, are separate problems — and getting the first one wrong quietly ruins the content. That's [why I paid creators for the video, not the views](/writing/creator-payout-design).
