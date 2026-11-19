
const stages = [
  {
    number: "01",
    title: "Application Intake",
    description:
      "Capture applicant details, requested loan amount, income and employment information.",
    tag: "Input",
  },
  {
    number: "02",
    title: "Document Verification",
    description:
      "Check submitted identity, address, income and property documents for completeness and consistency.",
    tag: "AI Agent",
  },
  {
    number: "03",
    title: "Policy Intelligence",
    description:
      "Retrieve relevant illustrative lending criteria and explain which checks apply to the application.",
    tag: "AI Agent",
  },
  {
    number: "04",
    title: "Credit & Risk Assessment",
    description:
      "Evaluate income, existing obligations, repayment capacity and potential risk indicators.",
    tag: "AI Agent",
  },
  {
    number: "05",
    title: "Human Credit Review",
    description:
      "Present evidence, exceptions and recommendations to a credit officer for an independent decision.",
    tag: "Human Decision",
  },
  {
    number: "06",
    title: "Sanction & Disbursement",
    description:
      "After approval and completion of required formalities, proceed through sanction and disbursement stages.",
    tag: "Final Stage",
  },
];

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 md:p-8">
      <header className="mb-8">
        <p className="text-sm text-slate-500">Workspace / Approach Story</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          From Data to Intelligent Decisions
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          LoanIQ demonstrates how a unified data foundation and coordinated
          AI agents can support a more transparent home loan approval journey.
        </p>
      </header>

      {/* Story introduction */}
      <section className="mb-8 rounded-2xl bg-[#142b50] p-7 text-white md:p-9">
        <span className="rounded-full bg-blue-500/20 px-3 py-2 text-xs font-semibold text-blue-200">
          THE LOANIQ APPROACH
        </span>
        <h2 className="mt-5 max-w-3xl text-2xl font-bold leading-tight md:text-3xl">
          Two building blocks. One connected loan approval experience.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          First, bring information together in a lakehouse-style data layer.
          Then, use specialized AI agents to interpret that information,
          perform checks and prepare evidence for human decision-making.
        </p>
      </section>

      {/* Act 1 */}
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-bold text-blue-700">
            ACT 1
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Unified Data Foundation
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          The Lakehouse Layer
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Loan processing information often exists in different formats and
          systems. The proposed lakehouse brings these sources into a
          consistent foundation for analysis and AI workflows.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <div className="text-2xl">▤</div>
            <h3 className="mt-3 font-bold text-slate-900">
              Structured Data
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Applicant details, income, existing EMIs, loan amount and
              application status.
            </p>
            <p className="mt-4 text-xs font-semibold text-blue-700">
              Tables · Records · Transactions
            </p>
          </div>

          <div className="rounded-xl border border-purple-100 bg-purple-50 p-5">
            <div className="text-2xl">▧</div>
            <h3 className="mt-3 font-bold text-slate-900">
              Unstructured Data
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Identity proofs, salary slips, bank statements, property
              documents and policy documents.
            </p>
            <p className="mt-4 text-xs font-semibold text-purple-700">
              PDFs · Documents · Text
            </p>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
            <div className="text-2xl">◎</div>
            <h3 className="mt-3 font-bold text-slate-900">
              External Data
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Illustrative reference data such as public regulatory guidance,
              market information and sample risk indicators.
            </p>
            <p className="mt-4 text-xs font-semibold text-amber-700">
              Public Sources · Reference Data
            </p>
          </div>
        </div>

        <div className="my-6 flex justify-center text-2xl text-blue-500">
          ↓
        </div>

        <div className="rounded-xl border border-blue-200 bg-[#eef4ff] p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Proposed Unified Data Platform
          </p>
          <h3 className="mt-3 text-xl font-bold text-slate-900">
            BigQuery Lakehouse
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            A proposed central layer for ingesting, organizing and making
            synthetic loan data and document-derived information available
            to downstream AI services.
          </p>
          <span className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-xs font-medium text-blue-700">
            Proposed architecture — not yet connected
          </span>
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 p-4 text-xs leading-5 text-slate-500">
          Demonstration note: This prototype currently uses local synthetic
          data and sample documents. A live BigQuery integration is a proposed
          extension.
        </div>
      </section>

      {/* Act 2 */}
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-purple-100 px-3 py-2 text-sm font-bold text-purple-700">
            ACT 2
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Agentic AI Orchestration
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          The Intelligent Loan Workflow
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Specialized agents work on separate tasks, share findings and
          prepare a consolidated assessment. The final credit decision
          remains with a human officer.
        </p>

        <div className="mt-7 space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.number}>
              <div className="flex flex-col gap-4 rounded-xl border border-slate-200 p-5 md:flex-row md:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#142b50] text-sm font-bold text-white">
                  {stage.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {stage.description}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                  {stage.tag}
                </span>
              </div>
              {index !== stages.length - 1 && (
                <div className="py-1 pl-6 text-lg text-blue-400">↓</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
          <h3 className="font-bold text-green-900">
            Human-in-the-loop principle
          </h3>
          <p className="mt-2 text-sm leading-6 text-green-800">
            AI agents provide evidence, explanations and recommendations.
            They do not independently sanction or disburse a loan. A
            designated human credit officer retains the final decision
            responsibility in this proposed workflow.
          </p>
        </div>
      </section>

      {/* Expected outcomes */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Expected Business Value
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["01", "Faster Processing", "Reduce repetitive manual checks."],
            ["02", "Better Visibility", "Track each stage of an application."],
            ["03", "Explainable Results", "Show reasons behind risk flags."],
            ["04", "Human Oversight", "Keep decisions accountable."],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <p className="text-xs font-bold text-blue-600">{item[0]}</p>
              <h3 className="mt-3 font-bold text-slate-900">{item[1]}</h3>
              <p className="mt-2 text-sm text-slate-500">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="rounded-xl bg-slate-100 p-4 text-xs leading-5 text-slate-500">
        LoanIQ is an independent demonstration prototype. This approach
        describes a proposed architecture and illustrative workflow, not
        official Canara Bank policy or a live banking system.
      </footer>
    </main>
  );
}
