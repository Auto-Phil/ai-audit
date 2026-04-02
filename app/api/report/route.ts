import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

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

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const prompt = `You are an expert AI implementation consultant. A business has completed an intake questionnaire. Generate a personalized AI audit report for them.

Business profile:
- Name: ${form.businessName}
- Industry: ${form.industry}
- Team size: ${form.teamSize} employees
- CRM: ${form.crm || "None specified"}
- Project management: ${form.projectManagement || "None specified"}
- Communication tools: ${form.communication || "None specified"}
- AI tools already in use: ${form.aiToolsInUse || "None"}
- Pain points: ${form.painPoints.join(", ")}
- Primary goal: ${form.primaryGoal}
- Monthly budget for AI tools: ${form.budget}
- Implementation timeline: ${form.timeline}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:

{
  "quickWins": [
    {
      "title": "string",
      "department": "string",
      "timeSaved": "string (e.g. '8 hrs/week')",
      "difficulty": "Easy" | "Medium" | "Hard",
      "tool": "string (specific tool name)",
      "description": "string (2-3 sentences, specific to their industry and pain points)"
    }
  ],
  "strategicRecs": [
    {
      "opportunity": "string",
      "department": "string",
      "roi": "High" | "Medium" | "Low",
      "effort": "High" | "Medium" | "Easy",
      "priority": "High" | "Medium" | "Low",
      "tool": "string (specific tool name)"
    }
  ],
  "roadmap": [
    {
      "phase": "Phase 1",
      "duration": "Months 1-2",
      "label": "Quick Wins",
      "items": ["string", "string", "string", "string"]
    },
    {
      "phase": "Phase 2",
      "duration": "Months 3-6",
      "label": "Core Integrations",
      "items": ["string", "string", "string", "string"]
    },
    {
      "phase": "Phase 3",
      "duration": "Months 6-12",
      "label": "Advanced Automation",
      "items": ["string", "string", "string", "string"]
    }
  ]
}

Rules:
- quickWins: exactly 3 items, ordered easiest/fastest ROI first
- strategicRecs: exactly 6 items
- roadmap: exactly 3 phases, exactly 4 items each
- All recommendations must be specific to the industry (${form.industry}), budget (${form.budget}), and pain points listed
- Tool names must be real, specific products (not generic descriptions)
- Prioritize budget-appropriate tools — do not recommend expensive enterprise tools if budget is low
- Do not use em dashes (use regular dashes or commas instead)
- Do not wrap the response in markdown code blocks`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";

    // Strip any accidental markdown fences
    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    const data = JSON.parse(cleaned);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
