"""Audit local HTML with injected llms.txt so GEO llms_txt can pass offline."""
from __future__ import annotations

import json
import sys
from pathlib import Path

from seocur.fetch import FetchResult
from seocur.parse import parse_html
from seocur.seo import run_seo

ROOT = Path(r"d:\All Data\xcler\xcler-dev")
OUT = ROOT / ".cursor-seo-mcp"
LLMS = (ROOT / "public" / "llms.txt").read_text(encoding="utf-8")
ROBOTS = """User-Agent: *
Allow: /
Allow: /llms.txt
Disallow: /admin/
Disallow: /api/
Disallow: /studio/
Sitemap: https://xcler.dev/sitemap.xml
"""

PAGES = [
    ("home-de", "https://xcler.dev/", OUT / "home-now.html"),
    ("ai-de", "https://xcler.dev/leistungen/ki-chatbots-agenten", OUT / "ai-now.html"),
    ("wf-de", "https://xcler.dev/leistungen/workflow-automatisierung", OUT / "wf-now.html"),
    ("home-en", "https://xcler.dev/en", OUT / "home-en-now.html"),
    ("ai-en", "https://xcler.dev/en/services/ai-chatbots-agents", OUT / "ai-en-now.html"),
    ("wf-en", "https://xcler.dev/en/services/workflow-automation", OUT / "wf-en-now.html"),
]


def main() -> int:
    summary = []
    for name, url, html_path in PAGES:
        html = html_path.read_text(encoding="utf-8", errors="ignore")
        parsed = parse_html(html, url)
        fetch = FetchResult(
            url=url,
            final_url=url,
            status_code=200,
            html=html,
            headers={
                "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
                "content-security-policy": "default-src 'self'",
                "x-content-type-options": "nosniff",
                "content-encoding": "br",
                "cache-control": "public, max-age=0, must-revalidate",
                "etag": 'W/"xcler-1"',
                "referrer-policy": "strict-origin-when-cross-origin",
            },
            elapsed_ms=1,
        )
        result = run_seo(
            parsed,
            fetch,
            robots_txt=ROBOTS,
            llms_txt=LLMS,
            sitemap_xml="<urlset></urlset>",
            check_dns=False,
        )
        out = OUT / f"score-{name}.json"
        payload = result.model_dump() if hasattr(result, "model_dump") else result.__dict__
        # CommandResult serialization
        data = {
            "name": name,
            "url": url,
            "status": getattr(result, "status", None),
            "health_score": getattr(result, "health_score", None),
            "critical_issues": getattr(result, "critical_issues", []),
            "action_plan": getattr(result, "action_plan", []),
        }
        failed = []
        for comp in getattr(result, "components", []) or []:
            for e in getattr(comp, "evidence", []) or []:
                if getattr(e, "passed", True) is False and getattr(e, "weight", 0) > 0:
                    failed.append(f"{comp.name}:{e.check} ({e.evidence})")
        data["failed"] = failed
        out.write_text(json.dumps(data, indent=2), encoding="utf-8")
        summary.append(data)
        print(f"{name}: health={data['health_score']} status={data['status']} fails={len(failed)}")
        for f in failed[:12]:
            print("  -", f)
    (OUT / "score-summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
