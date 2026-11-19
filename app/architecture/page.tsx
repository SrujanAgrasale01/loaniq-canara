
const layers = [
  {
    number: "01",
    title: "Data Sources",
    color: "border-blue-200 bg-blue-50",
    items: [
      "Applicant and loan details",
      "Income and employment records",
      "Identity and address documents",
      "Property and supporting documents",
      "Public reference and regulatory information",
    ],
  },
  {
    number: "02",
    title: "Data Ingestion",
    color: "border-purple-200 bg-purple-50",
    items: [
      "Application form submission",
      "PDF and document upload",
      "Document text extraction (proposed)",
      "Data validation and normalization",
    ],
  },
  {
    number: "03",
    title: "Lakehouse — BigQuery",
    color: "border-cyan-200 bg-cyan-50",
    items: [
      "Structured applicant records",
      "Document metadata and extracted text",
      "Application and assessment history",
      "Synthetic reference datasets",
    ],
  },
  {
    number: "04",
    title: "Agentic AI Layer",
    color: "border-indigo-200 bg-indigo-50",
    items: [
      "Application Intake Agent",
      "Document Verification Agent",
      "Policy Intelligence Agent",
      "Credit Assessment Agent",
      "Risk Analysis Agent",
      "Human Review Agent",
    ],
  },
  {
    number: "05",
    title: "APIs and Tools",
    color: "border-amber-200 bg-amber-50",
    items: [
      "Application and workflow APIs",
      "Document retrieval",
      "Policy knowledge retrieval",
      "EMI and FOIR calculation",
      "Audit and activity logging",
    ],
  },
  {
    number: "06",
    title: "LoanIQ Experience",
    color: "border-green-200 bg-green-50",
    items: [
      "Loan application dashboard",
      "Ask & Compare assistant",
      "Knowledge Graph",
      "Document Library",
      "AI Agent Control Centre",
      "Officer review and decision",
    ],
  },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 md:p-8">
      <header className="mb-8">
        <p className="text-sm text-slate-500">
          Workspace / Architecture
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          LoanIQ Solution Architecture
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          A proposed end-to-end architecture connecting loan data,
          document intelligence, AI agents and human decision-making
          into one demonstration experience.
        </p>
      </header>

      {/* Architecture overview */}
      <section className="mb-8 rounded-2xl bg-[#142b50] p-6 text-white md:p-8">
        <span className="rounded-full bg-blue-400/20 px-3 py-2 text-xs font-semibold text-blue-200">
          END-TO-END ARCHITECTURE
        </span>
        <h2 className="mt-5 text-2xl font-bold">
          From fragmented information to informed decisions
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          LoanIQ follows a layered architecture. Data is collected from
          multiple sources, organized in a lakehouse, processed by
          specialized AI agents and presented to a credit officer
          through an integrated user experience.
        </p>
      </section>

      {/* Architecture layers */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-slate-900">
          Architecture Layers
        </h2>

        <div className="space-y-3">
          {layers.map((layer, index) => (
            <div key={layer.number}>
              <div
                className={`rounded-2xl border p-5 md:p-6 ${layer.color}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-800 shadow-sm">
                      {layer.number}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {layer.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-600">
                    Layer {index + 1}
                  </span>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-white bg-white/80 px-3 py-3 text-sm text-slate-700"
                    >
                      <span className="mr-2 text-blue-600">●</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {index !== layers.length - 1 && (
                <div className="flex justify-center py-2 text-2xl font-bold text-blue-500">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Governance */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Governance, Security and Human Oversight
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Governance controls should apply across every architecture layer,
          not just at the final approval stage.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            [
              "Data Privacy",
              "Use synthetic data in the demonstration and restrict access to sensitive information in a production implementation.",
            ],
            [
              "Access Control",
              "Apply role-based permissions for applicants, processing teams and credit officers.",
            ],
            [
              "Explainability",
              "Present assessment factors, evidence, policy references and risk flags.",
            ],
            [
              "Auditability",
              "Maintain timestamps, workflow events, agent outputs and human decision records.",
            ],
            [
              "Human Oversight",
              "Require authorized human review for final credit decisions.",
            ],
            [
              "Responsible AI",
              "Monitor accuracy, fairness, data quality and potential model limitations.",
            ],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <h3 className="font-bold text-slate-900">{item[0]}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item[1]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation status */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Implementation Status
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Current prototype capabilities versus proposed integrations.
        </p>

        <div className="mt-5 space-y-3">
          {[
            ["Next.js user interface", "Implemented"],
            ["Synthetic loan application workflow", "Implemented"],
            ["Local sample PDF document library", "Implemented"],
            ["Simulated AI agent workflow", "Implemented"],
            ["Local illustrative policy knowledge", "Implemented"],
            ["Live Gemini API integration", "Planned"],
            ["BigQuery data integration", "Planned"],
            ["Live credit bureau and government APIs", "Out of scope"],
          ].map((item) => (
            <div
              key={item[0]}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3"
            >
              <span className="text-sm font-medium text-slate-700">
                {item[0]}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item[1] === "Implemented"
                    ? "bg-green-50 text-green-700"
                    : item[1] === "Planned"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {item[1]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 rounded-xl bg-slate-100 p-4 text-xs leading-5 text-slate-500">
        This architecture is a demonstration design. Planned integrations
        are not represented as live services. LoanIQ is not an official
        Canara Bank application.
      </footer>
    </main>
  );
}
