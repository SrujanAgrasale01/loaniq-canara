
export default function DeliverablesPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6 text-slate-800 md:p-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-slate-500">
          Workspace / Project Deliverables
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Project Deliverables
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Research, documentation and supporting materials for the LoanIQ
          demonstration.
        </p>

        {/* D5 - Research Note */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-blue-600">D5</p>
              <h2 className="mt-2 text-xl font-bold">
                Home Loan Research Note
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Indian home loan approval process, documents, credit
                assessment, roles, timelines and regulatory considerations.
              </p>
            </div>

            <a
              href="/documents/LoanIQ_D5_Home_Loan_Research_Note.pdf"
              download
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Download D5 PDF
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border">
            <iframe
              src="/documents/LoanIQ_D5_Home_Loan_Research_Note.pdf"
              title="LoanIQ Home Loan Research Note"
              className="h-[750px] w-full"
            />
          </div>
        </section>

        {/* D6 - AI Usage Log */}
        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-blue-600">D6</p>
              <h2 className="mt-2 text-xl font-bold">
                AI Usage Log
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                AI-assisted planning, code development, debugging,
                corrections and limitations during prototype development.
              </p>
            </div>

            <a
              href="/documents/LoanIQ_D6_AI_Usage_Log.pdf"
              download
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Download D6 PDF
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border">
            <iframe
              src="/documents/LoanIQ_D6_AI_Usage_Log.pdf"
              title="LoanIQ AI Usage Log"
              className="h-[750px] w-full"
            />
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          LoanIQ — Independent Home Loan Approval Prototype
        </p>
      </div>
    </main>
  );
}
