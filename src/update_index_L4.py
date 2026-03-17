import re

file_path = "/Users/kindavishal/Documents/GitHub/kindavishal.github.io/src/index.html"
with open(file_path, "r") as f:
    content = f.read()

def replace_exact(old, new, text):
    if old in text:
        text = text.replace(old, new)
    else:
        print(f"Warning: Could not find exactly:\n{old}\n")
    return text

# Hero Section Upgrades
content = replace_exact(
    """<h1 class="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-[1.1]">
                Operations Leader <br>""",
    """<h1 class="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-[1.1]">
                Program Manager <br>""",
    content
)

content = replace_exact(
    """High-Agency Operations Manager & Technical Program Leader. <br>
                I bridge the gap between <strong>Strategy</strong> and <strong>Execution</strong> using Python
                automation, governance frameworks, and deep community empathy.""",
    """Program Manager at Google driving ecosystem growth, cross-functional programs, and operational scale across academia and developer platforms. <br>
                I bridge the gap between <strong>Strategy</strong> and <strong>Execution</strong> using Python
                automation, governance frameworks, and deep community empathy.""",
    content
)


# Strategy / Card 1
content = replace_exact(
    """Owned end-to-end execution of the market adoption framework for high-stakes AI products. Mobilized <strong>expert-led workshops</strong> to drive product awareness, defining engagement strategy based on adoption trends.""",
    """Owned engagement strategy for the market adoption framework of high-stakes AI products. Mobilized <strong>expert-led workshops</strong>, prioritizing partner expansion vs depth based on program maturity levels.""",
    content
)


# Strategy / Card 2
content = replace_exact(
    """Led cross-functional rollout of Brand Safety guidelines across diverse partner maturity levels. Aligned <strong>Legal, Product, and DevRel</strong> teams, navigating constraints to ensure compliance without stifling velocity.""",
    """Owned and led cross-functional rollout of Brand Safety guidelines across diverse partner maturity levels. Aligned <strong>Legal, Product, and DevRel</strong> teams, navigating rigid policy and compliance constraints while executing programs without stifling developer velocity.""",
    content
)

# Operations / Pillar 2
# (Keeping previously edited version as it already has ownership and scale, but refining it to ensure compliance)
content = replace_exact(
    """Owned and drove ecosystem growth by building the "invisible rails"—financial pipelines, vendor workflows, and logistics—scaling programs despite fragmented academic adoption.""",
    """Owned ecosystem expansion by building the "invisible rails"—financial pipelines, vendor workflows, and logistics—scaling programs despite varying academic infrastructure and fragmented adoption readiness.""",
    content
)

# Operations / Card 1
content = replace_exact(
    """Owned end-to-end operational execution for an ecosystem of <strong>hundreds of thousands of learners</strong>. Shifted program approach to improve participation, managing partner teams to facilitate large-scale internship programs.""",
    """Owned engagement strategy and ecosystem expansion for programs reaching <strong>hundreds of thousands of learners</strong>. Adjusted program rollout strategy to improve adoption across low-engagement institutions, operating across varied infrastructure readiness.""",
    content
)


# Operations / Card 2
content = replace_exact(
    """Owned and re-engineered the "procurement-to-payment" lifecycle. Prioritized initiatives across partners and internal teams to centralize tracking for SOWs and invoices, eliminating critical bottlenecks.""",
    """Owned and re-engineered the "procurement-to-payment" lifecycle. Prioritized initiatives across external vendors and internal teams based on program maturity, eliminating critical operational bottlenecks at scale.""",
    content
)


# Technical / Pillar 3
content = replace_exact(
    """Owned end-to-end execution of internal tooling initiatives. Built data pipelines and automated workflows across product and platforms to eliminate toil and accelerate decision-making signals.""",
    """Owned end-to-end execution of internal tooling initiatives. Leveraged technical workflows across product and platforms to automate complex partner onboarding and eliminate operational toil.""",
    content
)


# Technical / Card 1
content = replace_exact(
    """Led cross-functional implementation of a custom automation suite using <strong>Google Apps Script & Python</strong>. Synchronized data between Jira and Buganizer, prioritizing features based on engineering needs to remove manual overhead.""",
    """Built workflows using <strong>Google Apps Script & Python</strong> to automate partner workflows and reduce manual effort for cross-functional teams. Prioritized and deployed features dynamically based on critical engineering needs.""",
    content
)


# Technical / Card 2
content = replace_exact(
    """Owned end-to-end development of real-time dashboards using <strong>PLX, BigQuery, and Looker Studio</strong>. Synthesized complex operational data into dynamic active views for leadership decision-making.""",
    """Leveraged data tools (<strong>PLX, BigQuery, Looker Studio</strong>) to track engagement and improve program outcomes. Synthesized complex operational data into dynamic views directly influencing L4+ leadership decision-making.""",
    content
)

# Stats Update
content = replace_exact(
    """<div class="text-3xl font-bold text-slate-900 dark:text-white">Impact</div>
                    <div class="text-sm text-slate-500 dark:text-brand-muted">Significant Cloud Adoption</div>""",
    """<div class="text-3xl font-bold text-slate-900 dark:text-white">Impact</div>
                    <div class="text-sm text-slate-500 dark:text-brand-muted">200+ Institutions Scaled</div>""",
    content
)


# Google Tag Update
content = replace_exact(
    """<div class="text-blue-600 dark:text-blue-400 font-medium mb-3">Program Manager supporting Google initiatives
                        </div>""",
    """<div class="text-blue-600 dark:text-blue-400 font-medium mb-3">Program Manager supporting Google ecosystem initiatives
                        </div>""",
    content
)


content = replace_exact(
    """<p>Owned daily operations for <strong>Google DevLibrary</strong>, prioritizing platform stability by managing bug triaging workflows. Defined engagement strategy and enforced guidelines across developer communities to maintain inclusive environments.</p>
                            <p>Owned and completely streamlined vendor procurement, driving significant reduction in onboarding time. Led cross-functional setup of a custom automation suite, removing manual bottlenecks for the engineering team.
                            </p>""",
    """<p>Led broad cross-functional programs within Google’s developer ecosystem. Owned daily operations for <strong>Google DevLibrary</strong>, defining engagement strategy based on adoption trends while navigating complex compliance policies to maintain inclusive developer communities.</p>
                            <p>Built workflows using Apps Script to automate partner onboarding, significantly reducing manual effort. Centralized procurement processes by prioritizing initiatives effectively, eliminating critical bottlenecks for widespread engineering teams.
                            </p>""",
    content
)

# Unacademy Tag Update
content = replace_exact(
    """<p>Owned end-to-end expansion of College Chapters scaling to <strong>200+ institutions</strong>. Led cross-functional initiatives to architect the "College Offering Initiative," embedding industry-aligned technical curriculum nationwide.</p>
                            <p>Drove significant growth in institutional partnerships through strategic MOUs, coding challenges, and hackathons, constantly prioritizing initiatives across partners to expand community footprint.</p>""",
    """<p>Drove ecosystem expansion across <strong>200+ institutions</strong> nationwide. Owned the "College Offering Initiative," adjusting program rollout strategy to improve adoption across institutions with varying levels of infrastructure and readiness.</p>
                            <p>Prioritized partner expansion vs depth based on program maturity. Scaled institutional partnerships via strategic MOUs and large-scale hackathons, delivering programs touching hundreds of thousands of learners.</p>""",
    content
)

# CTA Update
content = replace_exact(
    """<strong>Actively seeking Program Manager (L4) roles across product, platform, and ecosystem teams.</strong> Open to opportunities in India and global roles.""",
    """<strong>Actively seeking Program Manager (L4) roles across product, platform, and ecosystem teams.</strong><br/>Open to opportunities in India and globally.""",
    content
)


with open(file_path, "w") as f:
    f.write(content)
print("Changes applied!")
