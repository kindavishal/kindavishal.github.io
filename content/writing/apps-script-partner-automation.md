---
title: "How I automated 40 hours of weekly busywork out of a 300-partner program"
slug: apps-script-partner-automation
seoTitle: "Automating 40 hours of busywork with Apps Script"
description: "Google Apps Script, Sheets and Looker Studio, built by the person who needed them. The rule that made it work: automate the handoffs, never the judgment."
date: "2026-02-11"
featured: 1
category: "Internal tooling"
companies: ["Google"]
cardLabel: "~40 hours a week back"
shortTitle: "Automating the busywork"
faq:
  - q: "How do you automate partner onboarding?"
    a: "Start by writing down every step and marking each one as a handoff or a judgment. Handoffs are moving information from one place to the next, and those automate cleanly. Judgments are decisions about whether a partner qualifies, and those should stay with a person. Automate the handoffs first and most of the time disappears."
  - q: "Should you automate a broken process or fix it first?"
    a: "Fix it first. Automating a bad process makes the bad outcome arrive faster and more consistently, and it hides the problem behind a script nobody reads. Write the process down, delete the steps that exist only because someone once asked for them, then automate what survives."
  - q: "Is Apps Script or Zapier better for internal automation?"
    a: "Apps Script if your data already lives in Google Sheets and you need real logic, since you get a full scripting language, scheduled triggers and no per-task cost. A connector tool is faster to set up and easier to hand over. The deciding question is usually whether the person maintaining it after you can read code."
---

At Google I ran a partner ecosystem that grew past 300 institutions across India. Onboarding a partner was a manual job, and so was everything after it.

Nobody had designed it that way. It grew one step at a time, each one reasonable on its own. Together they took about a working week of effort, every week.

I'm not an engineer. I automated most of it with Apps Script and Looker Studio. There was nobody else to do it, and waiting was not going to work.

**The rule that made it work: automate the handoffs, never the judgment.**

## The real cost wasn't the hours

The hours are the number I put on the work card, because hours are legible. They're not the interesting part.

The interesting part is what a week of busywork prevents. When onboarding takes days of coordination, you stop signing partners you should sign. When a report takes a day to assemble, you produce it monthly instead of weekly. So you find out about problems a month late. When four people have to be asked for status, nobody has a current picture at any moment.

The busywork wasn't slowing the programme down. It was quietly setting its ceiling.

That reframe is also what got it prioritised. "I'd like to save some time" is a request nobody funds. "We're turning down partners because onboarding can't keep up" is a different conversation.

## Handoffs and judgments

Most automation projects fail because someone tries to automate a decision. Write down every step in the process and mark each one:

- **A handoff** moves information from one place to the next. Copying a form response into a tracker. Telling someone their status changed. Pulling four sheets into one table.
- **A judgment** decides something. Does this institution qualify. Is this partner ready for the next stage. Should we make an exception.

Handoffs automate cleanly and account for nearly all the time. Judgments should stay with a person. Trying to encode them is where these projects die. You end up with a script full of special cases that nobody trusts and everyone overrides.

| What was manual | What replaced it | What stayed human |
| --- | --- | --- |
| Copying application details into a tracker | Form response writes the record on submit | Whether the partner qualifies |
| Chasing missing documents | Scheduled check, automatic reminder | Whether to grant an exception |
| Assembling the weekly report | Scheduled script builds the table | What the numbers mean |
| Answering "where is my application?" | Self-serve dashboard | The awkward conversations |
| Telling people their stage changed | Triggered notification on status change | Deciding to change the stage |

Every row in the middle column is a few dozen lines of Apps Script. None of it is clever. That's the point.

## What I built it on

Apps Script, because the data already lived in Google Sheets and it runs on scheduled triggers with nothing to deploy. Sheets as the store, because everyone could already read it and nobody needed a login I'd have to request. Looker Studio on top, because a dashboard people can open themselves is the whole game.

Two habits kept it maintainable:

**One function per source. Keep fetching separate from cleaning up.** Forms always change shape. When one did, I fixed a single function instead of hunting through a script.

**Never write a summary.** Store the row, work the summary out later. The first version aggregated as it wrote, and within a month someone asked a question the aggregate couldn't answer. I couldn't get the detail back, because I'd never stored it. Same mistake I'd make again later on a different system, which is how I learned it properly.

<div class="callout">
<p class="callout-title">Before you automate anything</p>
<ol>
<li>Write the process down. All of it, including the steps nobody admits to.</li>
<li>Delete the steps that exist only because someone once asked for them.</li>
<li>Mark every remaining step as handoff or judgment.</li>
<li>Automate handoffs. Leave judgments alone.</li>
<li>Build the dashboard before you think you need it.</li>
</ol>
</div>

Step two matters more than step four. Automating a bad process makes the bad outcome arrive faster and hides it behind a script nobody reads.

## The dashboard was the biggest win

The dashboard saved less task time than anything else I built. It made more difference than all of it.

Before it existed, wanting to know something meant asking a person. That person stopped what they were doing, looked it up, and replied. The lookup took two minutes and the interruption cost twenty, because they then had to get back to whatever they'd been doing.

Multiply that across a team and a week and the interruption tax is larger than the task time. It never shows up in an estimate of hours saved. That's why it gets left out of the business case.

Once people could answer their own questions, the questions stopped. That's the change people actually noticed. Nobody thanked me for the script.

## What I got wrong

**I automated before I documented.** I built the first workflows around the process as it was. Two of the steps existed because of a request from a team that had reorganised a year earlier. So I automated work that shouldn't have been happening, and made it permanent. In someone's head it might have been questioned. In a script, nobody looks.

**I built it so only I could maintain it.** That was fine until I went on leave. Apps Script is easy to write and easy to leave undocumented. An automation nobody else can fix is not an asset. I'd now write the runbook alongside it, not after.

## Why an operator should do this

The standard advice is to file a request and wait for engineering time. For a community or DevRel team, that request never gets to the top of the queue. It shouldn't. Shipping product matters more.

But the person who knows exactly which steps are handoffs and which are judgments is the person running the process. That knowledge is the hard part. The scripting is a weekend.

I've done a version of this three times now. It works the same way every time. Write the process down, automate the movement, keep the decisions, build the dashboard early.

Years later that habit is what let me stand up a creator program from zero in four weeks, with no tooling and nobody to ask: [the five-tier ambassador program](/writing/firecrawl-ambassador-tier-system).
