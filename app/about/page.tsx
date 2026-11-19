
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6 text-slate-800 md:p-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-slate-500">Workspace / About</p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          About LoanIQ
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600 leading-7">
          LoanIQ is an independent AI-assisted home loan workflow
          demonstration designed to explore how a data-driven lending
          process can improve visibility, document review and decision
          support.
        </p>

        <section className="mt-8 rounded-2xl bg-[#142b50] p-8 text-white">
          <p className="text-xs font-semibold tracking-widest text-blue-200">
            OUR VISION
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            Smarter lending through connected data and responsible AI
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Bring application information, document evidence and
            assessment insights into one workspace while keeping
            important lending decisions under human supervision.
          </p>
        </section>

        <h2 className="mt-10 text-xl font-bold">What LoanIQ demonstrates</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {[
            {
              number: "01",
              title: "Connected Data",
              description:
                "A BigQuery-backed demonstration data layer that brings together application, customer and document evidence.",
            },
            {
              number: "02",
              title: "Specialized Agents",
              description:
                "A simulated multi-agent workflow for application intake, document checks, policy guidance, credit assessment and risk review.",
            },
            {
              number: "03",
              title: "Decision Support",
              description:
                "Illustrative financial indicators, document comparisons and assessment summaries to support officer review.",
            },
            {
              number: "04",
              title: "Human Oversight",
              description:
                "A human credit officer retains final decision authority in the proposed workflow.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-blue-600">
                {item.number}
              </p>
              <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">
            Important Demonstration Disclaimer
          </h2>
          <p className="mt-3 text-sm leading-7 text-amber-800">
            LoanIQ is an independent academic demonstration prototype.
            It is not an official Canara Bank product or banking service.
            Agent orchestration, officer actions, sanction and
            disbursement are simulated. BigQuery records provide
            demonstration data and do not represent a live banking
            integration. Illustrative thresholds and interest rates
            are not official lending policies.
          </p>
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          LoanIQ · Independent Home Loan Workflow Demonstration · 2026
        </p>
      </div>
    </main>
  );
}
