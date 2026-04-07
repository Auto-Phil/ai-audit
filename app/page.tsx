import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#1B4A47] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3D9A93] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">AuditAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#64B5AF]">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <Link
              href="/audit"
              className="bg-[#3D9A93] hover:bg-[#266560] text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Start Free Audit
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#1B4A47] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#3D9A93]/10 border border-[#3D9A93]/20 text-[#64B5AF] text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#64B5AF] rounded-full inline-block"></span>
            Free AI Readiness Assessment
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Discover Where AI Can{" "}
            <span className="text-[#64B5AF]">Transform</span> Your Business
          </h1>
          <p className="text-xl text-[#EDF0E6]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Answer 8 questions. Get a personalized AI audit report in seconds —
            with specific tools, estimated time savings, and a clear implementation roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/audit"
              className="bg-[#3D9A93] hover:bg-[#266560] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-[#3D9A93]/25"
            >
              Start My Free Audit →
            </Link>
            <a
              href="#how-it-works"
              className="border border-[#3D9A93]/40 hover:border-[#64B5AF] text-[#EDF0E6]/70 hover:text-white font-medium px-8 py-4 rounded-xl text-lg transition-colors"
            >
              See How It Works
            </a>
          </div>
          <p className="text-[#EDF0E6]/40 text-sm mt-6">
            No email required · Takes under 3 minutes · Completely free
          </p>
        </div>
      </section>

      {/* Feature callouts */}
      <section id="features" className="py-20 px-6 bg-[#F5F7EF]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-[rgba(27,74,71,0.13)] hover:border-[#3D9A93]/30 hover:shadow-lg transition-all bg-white">
              <div className="w-14 h-14 bg-[#EDF0E6] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#3D9A93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3634] mb-3">Personalized</h3>
              <p className="text-[#4B6B68] leading-relaxed">
                Recommendations tailored to your industry, team size, current tools, and specific pain points — not generic advice.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-[rgba(27,74,71,0.13)] hover:border-[#3D9A93]/30 hover:shadow-lg transition-all bg-white">
              <div className="w-14 h-14 bg-[#EDF0E6] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#3D9A93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3634] mb-3">Actionable</h3>
              <p className="text-[#4B6B68] leading-relaxed">
                Every recommendation includes specific tools, estimated time savings, implementation difficulty, and a phased roadmap.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-[rgba(27,74,71,0.13)] hover:border-[#3D9A93]/30 hover:shadow-lg transition-all bg-white">
              <div className="w-14 h-14 bg-[#EDF0E6] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#3D9A93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3634] mb-3">Free</h3>
              <p className="text-[#4B6B68] leading-relaxed">
                No credit card, no email signup, no catch. Get your full AI audit report instantly at no cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-[#EDF0E6]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1B3634] mb-4">How It Works</h2>
            <p className="text-[#4B6B68] text-lg">Three steps to your AI transformation roadmap</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Complete the Intake Form",
                description:
                  "Tell us about your business, current tools, pain points, and goals across 4 short steps.",
              },
              {
                step: "02",
                title: "Receive Your AI Audit",
                description:
                  "We instantly analyze your inputs and generate a detailed, prioritized list of AI opportunities.",
              },
              {
                step: "03",
                title: "Follow the Roadmap",
                description:
                  "Your report includes a phased implementation plan so you know exactly what to do first.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-bold text-[#3D9A93]/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-[#1B3634] mb-2">{item.title}</h3>
                <p className="text-[#4B6B68] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-[#1B4A47] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to find your AI opportunities?</h2>
          <p className="text-[#EDF0E6]/60 mb-8 text-lg">
            Join hundreds of businesses that have already identified where AI can drive real results.
          </p>
          <Link
            href="/audit"
            className="inline-block bg-[#3D9A93] hover:bg-[#266560] text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-[#3D9A93]/25"
          >
            Start My Free Audit →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B4A47] border-t border-[#123330] py-8 px-6 text-center text-[#7A9896] text-sm">
        <div className="max-w-6xl mx-auto">
          <p>© 2026 AuditAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
