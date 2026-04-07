"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INDUSTRIES = [
  "Retail",
  "Healthcare",
  "Finance",
  "Real Estate",
  "Legal",
  "Marketing/Agency",
  "Manufacturing",
  "Education",
  "Hospitality",
  "Other",
];

const PAIN_POINTS = [
  "Too much time on repetitive tasks",
  "Slow customer response times",
  "Difficulty analyzing data / reporting",
  "High cost of manual processes",
  "Inconsistent content/marketing output",
  "Slow onboarding / training",
  "Poor lead generation / follow-up",
  "Compliance / documentation burden",
];

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

const initialData: FormData = {
  businessName: "",
  industry: "",
  teamSize: "",
  crm: "",
  projectManagement: "",
  communication: "",
  aiToolsInUse: "",
  painPoints: [],
  primaryGoal: "",
  budget: "",
  timeline: "",
};

const STEPS = ["Business Basics", "Current Tools", "Pain Points", "Goals"];

export default function AuditPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialData);

  const totalSteps = STEPS.length;
  const progress = (step / totalSteps) * 100;

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function togglePainPoint(point: string) {
    setForm((prev) => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter((p) => p !== point)
        : [...prev.painPoints, point],
    }));
  }

  function canAdvance(): boolean {
    if (step === 1) return form.businessName.trim() !== "" && form.industry !== "" && form.teamSize !== "";
    if (step === 2) return true; // all optional
    if (step === 3) return form.painPoints.length > 0;
    if (step === 4) return form.primaryGoal !== "" && form.budget !== "" && form.timeline !== "";
    return false;
  }

  function handleNext() {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      const encoded = btoa(encodeURIComponent(JSON.stringify(form)));
      router.push(`/report?data=${encoded}`);
    }
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  return (
    <div className="min-h-screen bg-[#EDF0E6] flex flex-col">
      {/* Header */}
      <header className="bg-[#1B4A47] text-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3D9A93] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">AuditAI</span>
          </Link>
          <span className="text-[#64B5AF] text-sm">Free Assessment</span>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-[rgba(27,74,71,0.13)]">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-6">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                      i + 1 < step
                        ? "bg-[#3D9A93] text-white"
                        : i + 1 === step
                        ? "bg-[#3D9A93] text-white"
                        : "bg-[#E8EBE2] text-[#7A9896]"
                    }`}
                  >
                    {i + 1 < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-sm hidden sm:block ${
                      i + 1 === step ? "text-[#1B3634] font-medium" : "text-[#7A9896]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-sm text-[#7A9896]">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-[#E8EBE2] rounded-full h-1.5">
            <div
              className="bg-[#3D9A93] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form body */}
      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl border border-[rgba(27,74,71,0.13)] shadow-sm p-8">
            {step === 1 && (
              <Step1
                form={form}
                updateField={updateField}
              />
            )}
            {step === 2 && (
              <Step2
                form={form}
                updateField={updateField}
              />
            )}
            {step === 3 && (
              <Step3
                form={form}
                togglePainPoint={togglePainPoint}
              />
            )}
            {step === 4 && (
              <Step4
                form={form}
                updateField={updateField}
              />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(27,74,71,0.08)]">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-5 py-2.5 text-sm font-medium text-[#4B6B68] hover:text-[#1B3634] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canAdvance()}
                className="bg-[#3D9A93] hover:bg-[#266560] disabled:bg-[#E8EBE2] disabled:text-[#7A9896] disabled:cursor-not-allowed text-white font-semibold px-7 py-2.5 rounded-lg transition-colors text-sm"
              >
                {step === totalSteps ? "Generate My Report →" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Step1({
  form,
  updateField,
}: {
  form: FormData;
  updateField: (f: keyof FormData, v: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1B3634] mb-1">Business Basics</h2>
      <p className="text-[#4B6B68] mb-8 text-sm">Let&apos;s start with a bit of background on your organization.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1B3634] mb-2">
            Company Website <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={form.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            placeholder="https://yourcompany.com"
            className="w-full border border-[rgba(27,74,71,0.2)] rounded-lg px-4 py-3 text-[#1B3634] placeholder-[#7A9896] focus:outline-none focus:ring-2 focus:ring-[#3D9A93] focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B3634] mb-2">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            value={form.industry}
            onChange={(e) => updateField("industry", e.target.value)}
            className="w-full border border-[rgba(27,74,71,0.2)] rounded-lg px-4 py-3 text-[#1B3634] focus:outline-none focus:ring-2 focus:ring-[#3D9A93] focus:border-transparent transition bg-white"
          >
            <option value="">Select your industry…</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B3634] mb-3">
            Team Size <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["1–10", "11–50", "51–200", "200+"].map((size) => (
              <label
                key={size}
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                  form.teamSize === size
                    ? "border-[#3D9A93] bg-[#EDF0E6]"
                    : "border-[rgba(27,74,71,0.2)] hover:border-[#3D9A93]/50"
                }`}
              >
                <input
                  type="radio"
                  name="teamSize"
                  value={size}
                  checked={form.teamSize === size}
                  onChange={(e) => updateField("teamSize", e.target.value)}
                  className="text-[#3D9A93]"
                />
                <span className="text-sm font-medium text-[#1B3634]">{size} employees</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2({
  form,
  updateField,
}: {
  form: FormData;
  updateField: (f: keyof FormData, v: string) => void;
}) {
  const fields: Array<{
    key: keyof FormData;
    label: string;
    placeholder: string;
  }> = [
    { key: "crm", label: "CRM", placeholder: "Salesforce, HubSpot, none…" },
    {
      key: "projectManagement",
      label: "Project Management",
      placeholder: "Asana, Monday, spreadsheets…",
    },
    {
      key: "communication",
      label: "Communication",
      placeholder: "Slack, Teams, email…",
    },
    {
      key: "aiToolsInUse",
      label: "Any AI tools already in use?",
      placeholder: "ChatGPT, none…",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1B3634] mb-1">Current Tools</h2>
      <p className="text-[#4B6B68] mb-8 text-sm">
        Tell us what software your team uses today. Approximate answers are fine.
      </p>
      <div className="space-y-5">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-[#1B3634] mb-2">{label}</label>
            <input
              type="text"
              value={form[key] as string}
              onChange={(e) => updateField(key, e.target.value)}
              placeholder={placeholder}
              className="w-full border border-[rgba(27,74,71,0.2)] rounded-lg px-4 py-3 text-[#1B3634] placeholder-[#7A9896] focus:outline-none focus:ring-2 focus:ring-[#3D9A93] focus:border-transparent transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Step3({
  form,
  togglePainPoint,
}: {
  form: FormData;
  togglePainPoint: (p: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1B3634] mb-1">Pain Points</h2>
      <p className="text-[#4B6B68] mb-8 text-sm">
        Select all the challenges your business currently faces. <span className="text-[#1B3634] font-medium">Pick at least one.</span>
      </p>
      <div className="space-y-3">
        {PAIN_POINTS.map((point) => {
          const checked = form.painPoints.includes(point);
          return (
            <label
              key={point}
              className={`flex items-center gap-4 border rounded-lg px-4 py-3.5 cursor-pointer transition ${
                checked ? "border-[#3D9A93] bg-[#EDF0E6]" : "border-[rgba(27,74,71,0.2)] hover:border-[#3D9A93]/50"
              }`}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition ${
                  checked ? "bg-[#3D9A93] border-[#3D9A93]" : "border-[#7A9896]"
                }`}
              >
                {checked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => togglePainPoint(point)}
                className="sr-only"
              />
              <span className="text-sm text-[#1B3634]">{point}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Step4({
  form,
  updateField,
}: {
  form: FormData;
  updateField: (f: keyof FormData, v: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1B3634] mb-1">Goals &amp; Constraints</h2>
      <p className="text-[#4B6B68] mb-8 text-sm">
        Help us prioritize recommendations that match your objectives and budget.
      </p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-[#1B3634] mb-3">
            Primary Goal <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {[
              "Cut costs",
              "Save time",
              "Grow revenue",
              "Improve customer experience",
              "Stay competitive",
            ].map((goal) => (
              <label
                key={goal}
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                  form.primaryGoal === goal
                    ? "border-[#3D9A93] bg-[#EDF0E6]"
                    : "border-[rgba(27,74,71,0.2)] hover:border-[#3D9A93]/50"
                }`}
              >
                <input
                  type="radio"
                  name="primaryGoal"
                  value={goal}
                  checked={form.primaryGoal === goal}
                  onChange={(e) => updateField("primaryGoal", e.target.value)}
                  className="text-[#3D9A93]"
                />
                <span className="text-sm text-[#1B3634]">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B3634] mb-3">
            Monthly Budget for AI Tools <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "$0 (free tools only)", value: "$0" },
              { label: "$1 – $500/mo", value: "$1–$500" },
              { label: "$500 – $2,000/mo", value: "$500–$2000" },
              { label: "$2,000+/mo", value: "$2000+" },
            ].map(({ label, value }) => (
              <label
                key={value}
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                  form.budget === value
                    ? "border-[#3D9A93] bg-[#EDF0E6]"
                    : "border-[rgba(27,74,71,0.2)] hover:border-[#3D9A93]/50"
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={value}
                  checked={form.budget === value}
                  onChange={(e) => updateField("budget", e.target.value)}
                  className="text-[#3D9A93]"
                />
                <span className="text-sm text-[#1B3634]">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B3634] mb-3">
            Implementation Timeline <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["ASAP", "1–3 months", "3–6 months", "Just exploring"].map((tl) => (
              <label
                key={tl}
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition ${
                  form.timeline === tl
                    ? "border-[#3D9A93] bg-[#EDF0E6]"
                    : "border-[rgba(27,74,71,0.2)] hover:border-[#3D9A93]/50"
                }`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={tl}
                  checked={form.timeline === tl}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  className="text-[#3D9A93]"
                />
                <span className="text-sm text-[#1B3634]">{tl}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
