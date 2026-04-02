"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

type FormData = {
  businessName: string;
  industry: string;
  teamSize: string;
  crm: string;
  projectManagement: string;
  communication: string;
  aiToolsInUse: string;
  painPoints: string[];
  primaryGoal: string;
  budget: string;
  timeline: string;
};

type QuickWin = {
  title: string;
  department: string;
  timeSaved: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tool: string;
  description: string;
};

type StrategicRec = {
  opportunity: string;
  department: string;
  roi: string;
  effort: string;
  priority: string;
  tool: string;
};

type RoadmapPhase = {
  phase: string;
  duration: string;
  label: string;
  color: string;
  items: string[];
};

const PHASE_COLORS = ["bg-green-500", "bg-blue-500", "bg-purple-500"];

const DEFAULT_QUICK_WINS: QuickWin[] = [
  {
    title: "AI Customer Support Chatbot",
    department: "Customer Service",
    timeSaved: "15 hrs/week",
    difficulty: "Easy",
    tool: "Intercom AI",
    description:
      "Deploy a conversational AI chatbot to handle tier-1 support inquiries (FAQs, order status, account questions) 24/7 without human intervention. Escalation logic routes complex issues to your team seamlessly.",
  },
  {
    title: "Automated Lead Follow-up Sequences",
    department: "Sales",
    timeSaved: "8 hrs/week",
    difficulty: "Easy",
    tool: "HubSpot AI",
    description:
      "Trigger AI-written, personalized follow-up email sequences the moment a lead goes cold or a form is submitted. Proven to increase response rates by 35-60% vs. manual outreach.",
  },
  {
    title: "AI Content Generation",
    department: "Marketing",
    timeSaved: "10 hrs/week",
    difficulty: "Easy",
    tool: "Jasper / Claude",
    description:
      "Generate first-draft blog posts, social captions, ad copy, and email campaigns at scale. Your team focuses on editing and strategy while AI handles the blank-page problem.",
  },
];

const DEFAULT_STRATEGIC_RECS: StrategicRec[] = [
  {
    opportunity: "Intelligent Data Reporting",
    department: "Operations",
    roi: "High",
    effort: "Medium",
    priority: "High",
    tool: "Zapier + ChatGPT",
  },
  {
    opportunity: "AI-Assisted Onboarding",
    department: "HR",
    roi: "Medium",
    effort: "Medium",
    priority: "Medium",
    tool: "Notion AI",
  },
  {
    opportunity: "Contract / Document Review",
    department: "Legal / Admin",
    roi: "High",
    effort: "Medium",
    priority: "High",
    tool: "Harvey AI",
  },
  {
    opportunity: "Predictive Inventory Management",
    department: "Operations",
    roi: "High",
    effort: "High",
    priority: "Medium",
    tool: "Inventory Planner",
  },
  {
    opportunity: "AI-Powered Sales Forecasting",
    department: "Sales",
    roi: "High",
    effort: "High",
    priority: "Low",
    tool: "Salesforce Einstein",
  },
  {
    opportunity: "Voice-to-Text Meeting Notes",
    department: "All Teams",
    roi: "Medium",
    effort: "Easy",
    priority: "High",
    tool: "Otter.ai / Fireflies",
  },
];

const DEFAULT_ROADMAP: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    duration: "Months 1-2",
    label: "Quick Wins",
    color: "bg-green-500",
    items: [
      "Deploy AI chatbot on your website/support portal",
      "Set up automated lead follow-up sequences",
      "Onboard team to AI content generation tools",
      "Implement voice-to-text for all internal meetings",
    ],
  },
  {
    phase: "Phase 2",
    duration: "Months 3-6",
    label: "Core Integrations",
    color: "bg-blue-500",
    items: [
      "Connect CRM to AI reporting dashboard",
      "Automate contract review workflows",
      "Implement AI-assisted employee onboarding portal",
      "Integrate AI into project status reporting",
    ],
  },
  {
    phase: "Phase 3",
    duration: "Months 6-12",
    label: "Advanced Automation",
    color: "bg-purple-500",
    items: [
      "Deploy predictive analytics for key business metrics",
      "Build AI-assisted sales forecasting model",
      "Implement full document intelligence pipeline",
      "Evaluate custom AI fine-tuning for industry-specific use cases",
    ],
  },
];

function getIndustrySummary(industry: string, businessName: string, teamSize: string): string {
  const name = businessName || "Your business";
  const size = teamSize ? ` with a team of ${teamSize} employees` : "";

  const summaries: Record<string, string> = {
    Retail:
      `${name}${size} operates in a highly competitive retail environment where AI can drive measurable impact across inventory management, customer personalization, and supply chain optimization. Based on your responses, there are immediate opportunities to reduce manual workload and improve customer experience without significant upfront investment.`,
    Healthcare:
      `${name}${size} faces the dual challenge of delivering high-quality patient care while managing complex administrative workflows. AI presents a clear opportunity to streamline documentation, patient communication, and compliance tracking, freeing clinical staff to focus on what matters most.`,
    Finance:
      `${name}${size} operates in a data-intensive environment where AI can accelerate analysis, improve compliance monitoring, and enhance client communication at scale. The opportunities identified in this audit are specifically chosen for their applicability to regulated financial environments.`,
    "Real Estate":
      `${name}${size} can leverage AI to dramatically reduce time spent on lead qualification, contract preparation, and client follow-up: the three highest time-sink areas for real estate organizations of your size.`,
    Legal:
      `${name}${size} has significant opportunity to reduce the burden of document review, contract management, and compliance tracking through AI, areas that typically consume 40-60% of billable time in firms of your profile.`,
    "Marketing/Agency":
      `${name}${size} is well-positioned to use AI as a force multiplier for content production, campaign reporting, and client deliverables. Agencies of your size consistently report the fastest ROI from AI adoption in our benchmark data.`,
    Manufacturing:
      `${name}${size} can apply AI to predictive maintenance, quality control, and supply chain optimization. Early adopters in these areas are achieving 15-30% cost reductions.`,
    Education:
      `${name}${size} can use AI to personalize learning pathways, automate administrative tasks, and reduce the time educators spend on non-teaching activities, improving both outcomes and staff satisfaction.`,
    Hospitality:
      `${name}${size} can deploy AI to enhance guest experience, optimize pricing, and automate the repetitive front-desk and back-office workflows that consume disproportionate staff time.`,
    Other:
      `${name}${size} has multiple high-priority opportunities to integrate AI across key business functions. The recommendations in this report are sequenced to deliver ROI quickly while building toward a more fully automated operation over time.`,
  };

  return summaries[industry] || summaries["Other"];
}

function getScore(form: FormData): number {
  let score = 62;
  if (form.teamSize === "11–50") score += 8;
  if (form.teamSize === "51–200") score += 12;
  if (form.teamSize === "200+") score += 15;
  if (form.painPoints.length >= 4) score += 8;
  if (form.budget === "$500–$2000") score += 5;
  if (form.budget === "$2000+") score += 8;
  if (form.timeline === "ASAP" || form.timeline === "1–3 months") score += 5;
  return Math.min(score, 97);
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    High: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[priority] ?? styles["Low"]}`}>
      {priority}
    </span>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const styles: Record<string, string> = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[difficulty] ?? styles["Medium"]}`}>
      {difficulty}
    </span>
  );
}

function ReportContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");

  let form: FormData = {
    businessName: "Your Business",
    industry: "Other",
    teamSize: "11–50",
    crm: "",
    projectManagement: "",
    communication: "",
    aiToolsInUse: "",
    painPoints: [],
    primaryGoal: "Save time",
    budget: "$1–$500",
    timeline: "1–3 months",
  };

  if (raw) {
    try {
      form = JSON.parse(decodeURIComponent(atob(raw)));
    } catch {
      // use defaults
    }
  }

  const [quickWins, setQuickWins] = useState<QuickWin[]>(DEFAULT_QUICK_WINS);
  const [strategicRecs, setStrategicRecs] = useState<StrategicRec[]>(DEFAULT_STRATEGIC_RECS);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(DEFAULT_ROADMAP);
  const [generating, setGenerating] = useState(true);
  const [aiGenerated, setAiGenerated] = useState(false);

  useEffect(() => {
    async function generate() {
      try {
        const res = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          console.error("Report API error:", res.status, err);
          return;
        }
        const data = await res.json();
        if (data.quickWins) setQuickWins(data.quickWins);
        if (data.strategicRecs) setStrategicRecs(data.strategicRecs);
        if (data.roadmap) {
          setRoadmap(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.roadmap.map((phase: any, i: number) => ({
              ...phase,
              color: PHASE_COLORS[i] ?? "bg-slate-500",
            }))
          );
        }
        setAiGenerated(true);
      } catch (err) {
        console.error("Report generation failed:", err);
      } finally {
        setGenerating(false);
      }
    }
    generate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const score = getScore(form);
  const summary = getIndustrySummary(form.industry, form.businessName, form.teamSize);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#0f172a] text-white px-6 py-4 no-print">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">AuditAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
            <Link
              href="/audit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              New Audit
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Report header */}
        <div className="bg-[#0f172a] text-white rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                AI Audit Report
              </div>
              <h1 className="text-3xl font-bold mb-1">
                {form.businessName || "Your Business"}
              </h1>
              <p className="text-slate-400 text-sm">
                {form.industry} · {form.teamSize} employees · Generated {today}
              </p>
            </div>
            {/* Score badge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{score}</span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">AI Readiness Score</p>
            </div>
          </div>
        </div>

        {/* Executive summary */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
            Executive Summary
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">{summary}</p>
          {form.primaryGoal && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Primary objective identified:</span>{" "}
                {form.primaryGoal}. All recommendations have been sequenced and prioritized accordingly.
                {form.timeline && (
                  <> Implementation timeline: <span className="font-semibold">{form.timeline}</span>.</>
                )}
              </p>
            </div>
          )}
        </section>

        {/* Quick wins */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-6 bg-green-500 rounded-full inline-block"></span>
            <h2 className="text-lg font-bold text-slate-900">Top 3 Quick Wins</h2>
            <span className="ml-2 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Start here
            </span>
            {generating && (
              <span className="ml-2 flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-3 h-3 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin inline-block" />
                Personalizing...
              </span>
            )}
            {aiGenerated && (
              <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                AI-generated
              </span>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {quickWins.map((win, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    {win.department}
                  </span>
                  <DifficultyBadge difficulty={win.difficulty} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{win.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{win.description}</p>
                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Time saved</span>
                    <span className="font-semibold text-green-600">{win.timeSaved}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Recommended tool</span>
                    <span className="font-medium text-slate-700">{win.tool}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic recommendations table */}
        <section className="bg-white rounded-2xl border border-slate-200 mb-8 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              <h2 className="text-lg font-bold text-slate-900">Strategic Recommendations</h2>
            </div>
            <p className="text-sm text-slate-500 mt-1 ml-3.5">
              Additional opportunities ranked by ROI potential and implementation effort
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Opportunity
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Tool
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    ROI
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Effort
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {strategicRecs.map((rec, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{rec.opportunity}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{rec.department}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{rec.tool}</td>
                    <td className="px-4 py-4">
                      <PriorityBadge priority={rec.roi} />
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{rec.effort}</td>
                    <td className="px-4 py-4">
                      <PriorityBadge priority={rec.priority} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full inline-block"></span>
            <h2 className="text-lg font-bold text-slate-900">Implementation Roadmap</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {roadmap.map((phase) => (
              <div key={phase.phase} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className={`inline-block ${phase.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                  {phase.phase}: {phase.label}
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  {phase.duration}
                </p>
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <svg
                        className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Next steps CTA */}
        <section className="bg-[#0f172a] text-white rounded-2xl p-8 text-center no-print">
          <h2 className="text-2xl font-bold mb-3">Ready to implement?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto leading-relaxed">
            Book a free 30-minute strategy call with an AI implementation specialist. We&apos;ll walk through your top three quick wins and build a concrete action plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://meetings-na2.hubspot.com/zack-whitlock"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              Book a Free Strategy Call
            </a>
            <button
              onClick={() => window.print()}
              className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              Download This Report (PDF)
            </button>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-slate-400 text-xs mt-8 pb-6">
          Generated by AuditAI · {today} · Confidential, prepared exclusively for {form.businessName || "your business"}
        </div>
      </main>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Generating your report...</p>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
