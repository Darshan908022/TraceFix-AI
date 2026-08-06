import os
import time
from github import Github
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = os.getenv("GITHUB_REPO")

def create_remediation_pr(analysis: dict) -> str:
    """
    Creates a new branch, adds a remediation log file, and opens a Pull Request on GitHub.
    Returns the PR URL.
    """
    if not GITHUB_TOKEN or not GITHUB_REPO:
        raise ValueError("GitHub credentials (GITHUB_TOKEN / GITHUB_REPO) are missing in .env")

    g = Github(GITHUB_TOKEN)
    repo = g.get_repo(GITHUB_REPO)

    # 1. Base branch setup
    default_branch = repo.default_branch
    base_ref = repo.get_git_ref(f"heads/{default_branch}")
    base_sha = base_ref.object.sha

    # 2. Unique branch name for the fix
    timestamp = int(time.time())
    new_branch_name = f"fix/tracefix-auto-remediation-{timestamp}"

    # 3. Create the new branch from default branch
    repo.create_git_ref(ref=f"refs/heads/{new_branch_name}", sha=base_sha)

    # 4. Formulate PR Body and Title
    root_cause = analysis.get('root_cause', 'Backend Error')
    pr_title = f"🤖 [TraceFix AI] Automated Fix: {root_cause[:50]}..."
    
    pr_body = f"""## 🚨 Automated Observability Alert & Fix

**Root Cause:**
{root_cause}

**Suggested Fix:**
{analysis.get('suggested_fix')}

**Severity Score:** {analysis.get('severity_score')}/100
**Estimated Downtime Cost:** {analysis.get('estimated_downtime_cost')}

---
*Generated automatically by TraceFix AI Engine.*
"""

    # 5. Create a remediation record file in the repo to document the automated patch
    file_path = f"tracefix_remediations/fix_{timestamp}.md"
    commit_message = f"fix: auto-generated remediation for {root_cause[:30]}"
    
    repo.create_file(
        path=file_path,
        message=commit_message,
        content=pr_body,
        branch=new_branch_name
    )

    # 6. Open the Pull Request
    pr = repo.create_pull(
        title=pr_title,
        body=pr_body,
        head=new_branch_name,
        base=default_branch
    )

    return pr.html_url