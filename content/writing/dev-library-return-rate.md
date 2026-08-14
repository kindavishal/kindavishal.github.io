---
title: "Why 41% of Dev Library authors came back for a second byline"
slug: dev-library-return-rate
seoTitle: "The publishing pipeline that brought Dev Library authors back"
description: "I ran Google Dev Library as technical maintainer from 2023 to 2025. 358 developers earned their first byline on a Google property. Two in five came back. The publishing pipeline that made them return."
date: "2026-08-11"
featured: 15
category: "Internal tooling"
companies: ["Google"]
cardLabel: "41% author return rate"
shortTitle: "Why authors came back"
faq:
  - q: "What was Google Dev Library?"
    a: "A public showcase for open-source projects and technical writing built on Google technologies, launched in 2022. Google's launch announcement is at developers.googleblog.com/what-is-googles-dev-library. I ran the publishing pipeline from 2023 to 2025 as a technical maintainer."
  - q: "Why does return rate matter for a developer content programme?"
    a: "First-time contributor counts are the vanity number. Return rate tells you whether the submission was worth their time. A programme with high first-timers and low returns is failing at retention — the reviewers are hard, the visibility is low, or the merged content disappears into a feed nobody reads. Both numbers together are the honest read."
  - q: "How do you get authors to publish a second piece?"
    a: "Give them something the first byline paid for that a second one would multiply. In our case it was a URL on a Google-owned domain, a searchable showcase page with their name, and an editor pass they could point to on a resume. When those hold, return becomes the default choice, not a favour."
---

<figure class="bv-figure bv-hero"><img src="/assets/writing/dev-library-hero.svg" alt="The Dev Library publishing pipeline: submission form, triage queue, editor pass, CI checks, merge, live URL on a Google domain. 358 first-time authors entered the top of the funnel; 41% came back for a second byline." loading="lazy" decoding="async" width="900" height="500"><figcaption>First bylines are the vanity number. Return rate is the honest read.</figcaption></figure>

From 2023 to 2025 I ran the publishing pipeline for [Google Dev Library](https://devlibrary.withgoogle.com) as its technical maintainer. It is Google's public showcase for developer-built projects and writing on Google technologies. The launch announcement is [here](https://developers.googleblog.com/what-is-googles-dev-librarya-new-open-source-platform-for-developers/).

In that window the pipeline gave **358 developers their first byline on a Google property**. **41% of them came back to publish again.** Two in five is a return rate a paid content programme would take. Dev Library was not paid.

This is what actually drove the second byline.

## Return rate, not first bylines

The default metric on a developer content programme is first-time contributors. It sounds like growth. It measures the top of the funnel and nothing after it.

The metric that tells you whether the programme is working is the second submission. It answers a question the first one cannot: **was this worth the author's time?** A first submission is a bet. The second is a considered decision to spend the same weekend on the same programme again. That is the number I optimised for.

You cannot lift return rate by asking. You lift it by making the first byline worth enough that the second one is the default choice.

## What the first byline actually gave them

Everything on Dev Library ran under one of Google's public domains. So the URL an author walked away with was *devlibrary.withgoogle.com*. That is different from a personal blog post in three ways:

- It is a URL you can put on a CV and hiring managers recognise the domain.
- It gets crawled and cited by search from day one.
- It appears in a searchable directory of peers, not alone.

Those three properties are the payoff. A personal blog post has to earn each of them separately. The Dev Library URL had all three at merge time. That is the offer.

## The pipeline, end to end

The publishing pipeline had five stages between a submission and a live URL. Each existed for a specific reason.

| Stage | What happened | Why it existed |
| --- | --- | --- |
| Submission | Author files a form with repo or article link, one-line summary, and Google tech tag | Structured input so triage is fast |
| Triage | Fit check — is this an actual Google technology, is the project functional, is the article original | Cuts spam and mis-fits early, before reviewer time |
| Editor pass | An editor reads it end to end and returns a single revision request | Signals a human read it. This is the piece authors most consistently mentioned as the reason they came back |
| CI checks | Automated: link check, image build, front-matter validation, format lint | Catches the small problems that turn into published errors |
| Merge and showcase | Merge to main triggers a deploy; the piece appears at a stable URL under a tag page | The URL is the payoff. It is public within minutes of merge |

Nothing here is inventive. The interesting part is which stage the returning authors named as the reason they came back.

<figure class="bv-figure"><img src="/assets/writing/dev-library-interior.svg" alt="Two side-by-side journeys of a first-time author: with an editor pass and a stable Google URL versus without either. The first ends in a second submission; the second ends nowhere." loading="lazy" decoding="async" width="900" height="500"><figcaption>The editor pass and the Google URL do most of the work. Everything else is hygiene.</figcaption></figure>

## Why the editor pass mattered

The stage I could most easily have cut is the editor pass. It was the slowest, the most human, and the hardest to scale. It was also the reason the return rate held.

A first-time author submitting a piece to a Google domain assumes it will land in a queue and either merge or disappear. When someone reads it, marks two specific paragraphs, and asks a real question about the third, that is a signal the piece was worth reading. That signal is the difference between "my writing appeared on a Google page" and "a Google editor engaged with my work." The second is what shows up in a second submission.

The revision request was always singular. Not a list of twelve things. One thing to address. Authors who came back consistently mentioned this — the single ask made it feel like a conversation, not a review queue.

## What the CI pipeline caught

The CI stage was three small automated checks and it caught most of the problems that would otherwise land as visible bugs after publish:

- **Link check** — every URL in the piece resolved with a 200. Broken links in a technical article age the piece within weeks.
- **Image build** — every image referenced actually existed and was the right size. This is the most common author mistake and the most visible when missed.
- **Front-matter validation** — the tag and category had to match the known list. This was what fed the tag pages on the showcase.

None of the CI stages were clever. Together they meant an editor never had to be the person catching a broken image path. Editor time stayed on content.

<div class="callout">
<p class="callout-title">If you run a developer content programme</p>
<ol>
<li>Report return rate alongside first-timers. Return is the honest number.</li>
<li>Give first bylines something a personal post cannot buy on day one — a domain, a directory, an editor mark.</li>
<li>Keep revision requests to one thing at a time. A list of twelve reads as a rejection.</li>
<li>Automate the mechanical checks. Reserve editor time for the writing.</li>
<li>Publish the tag pages. A siloed article does not multiply into a second one.</li>
</ol>
</div>

## What this is not

Return rate does not tell you whether the content is any good on its own terms. A piece can be technically correct, get published, get its author a second byline, and still not be a useful reference for a working developer. Return rate measures the programme's pull, not the content's value.

For the second question you need reader signals — inbound search, time on page, citations from other pieces. Those are separate metrics with separate pipelines. Return rate answers the programme design question, which is the one I was responsible for.

Related: [how I structured payouts to protect content quality](/writing/creator-payout-design), and [a streak system that never punishes creators](/writing/creator-streak-system).
