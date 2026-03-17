import re

file_path = "/Users/kindavishal/Documents/GitHub/kindavishal.github.io/src/index.html"
with open(file_path, "r") as f:
    content = f.read()

def replace_exact(old, new, text):
    if old in text:
        return text.replace(old, new)
    else:
        print(f"Warning: Could not find exactly:\n{old}\n")
        return text

# 1. Google Experience (Adding Decision Making & Refining Technical Impact)
content = replace_exact(
    """<p>Led broad cross-functional programs within Google’s developer ecosystem. Owned daily operations for <strong>Google DevLibrary</strong>, defining engagement strategy based on adoption trends while navigating complex compliance policies to maintain inclusive developer communities.</p>
                            <p>Built workflows using Apps Script to automate partner onboarding, significantly reducing manual effort. Centralized procurement processes by prioritizing initiatives effectively, eliminating critical bottlenecks for widespread engineering teams.
                            </p>""",
    """<p>Led cross-functional programs within Google’s developer ecosystem. Owned daily operations for <strong>Google DevLibrary</strong>, defining engagement strategy based on adoption and retention trends while navigating complex compliance policies to maintain inclusive developer communities.</p>
                            <p>Built automation workflows using Apps Script to streamline partner onboarding and reduce manual effort. Centralized procurement processes, prioritizing partner expansion vs engagement depth based on program maturity, eliminating critical bottlenecks.</p>""",
    content
)

# 2. Unacademy Experience (Ownership Cleanup & Decision Making)
content = replace_exact(
    """<p>Drove ecosystem expansion across <strong>200+ institutions</strong> nationwide. Owned the "College Offering Initiative," adjusting program rollout strategy to improve adoption across institutions with varying levels of infrastructure and readiness.</p>
                            <p>Prioritized partner expansion vs depth based on program maturity. Scaled institutional partnerships via strategic MOUs and large-scale hackathons, delivering programs touching hundreds of thousands of learners.</p>""",
    """<p>Drove ecosystem expansion across <strong>200+ institutions</strong> nationwide. Owned the "College Offering Initiative," adjusting program rollout to improve adoption across low-engagement institutions with varying levels of infrastructure and readiness.</p>
                            <p>Owned engagement strategy for programs reaching hundreds of thousands of learners. Scaled institutional partnerships via strategic MOUs and large-scale hackathons, consistently demonstrating L4-level cross-functional leadership.</p>""",
    content
)

# 3. Technical Section Upgrade
content = replace_exact(
    """<p class="text-slate-600 dark:text-slate-400 mb-4">
                            Built workflows using <strong>Google Apps Script & Python</strong> to automate partner workflows and reduce manual effort for cross-functional teams. Prioritized and deployed features dynamically based on critical engineering needs.
                        </p>""",
    """<p class="text-slate-600 dark:text-slate-400 mb-4">
                            Built automation workflows using <strong>Google Apps Script & Python</strong> to streamline partner onboarding and reduce manual effort. Prioritized and deployed features dynamically based on critical engineering needs.
                        </p>""",
    content
)

with open(file_path, "w") as f:
    f.write(content)
print("Changes applied successfully!")
