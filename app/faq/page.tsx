
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is LoanIQ?",
    answer:
      "LoanIQ is an independent demonstration prototype showing an AI-assisted home loan workflow, from application intake to simulated sanction and disbursement.",
  },
  {
    question: "How does the BigQuery integration work?",
    answer:
      "The prototype retrieves application, customer and document evidence from a Google BigQuery dataset through Next.js API routes.",
  },
  {
    question: "What do the AI agents do?",
    answer:
      "The demonstration represents specialized agents for application intake, document verification, policy intelligence, credit assessment and risk analysis. Their orchestration is simulated.",
  },
  {
    question: "Does AI make the final lending decision?",
    answer:
      "No. The proposed workflow keeps the final lending decision with a human credit officer. The agent outputs are decision-support demonstrations.",
  },
  {
    question: "Does LoanIQ use real-time credit bureau or government APIs?",
    answer:
      "No. Live credit bureau, government and banking integrations are outside this prototype's scope.",
  },
  {
    question: "Are sanction and disbursement real?",
    answer:
      "No. The sanction letter and disbursement screens demonstrate the proposed workflow only. No official sanction is issued and no funds are transferred.",
  },
  {
    question: "Are the displayed interest rates and eligibility thresholds official?",
    answer:
      "No. Rates and thresholds shown in the prototype are illustrative assumptions, not verified Canara Bank lending policies.",
  },
  {
    question: "Is LoanIQ an official Canara Bank product?",
    answer:
      "No. LoanIQ is an independent demonstration prototype and is not an official Canara Bank application or banking service.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6 text-slate-800 md:p-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-slate-500">Workspace / FAQ</p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Learn about LoanIQ, its data integration, agent workflow
          and demonstration limitations.
        </p>

        <section className="mt-8 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-slate-900">
                  {faq.question}
                </span>

                <span className="text-xl font-semibold text-blue-600">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              {open === index && (
                <div className="border-t border-slate-100 px-5 py-4">
                  <p className="text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl bg-[#142b50] p-6 text-white">
          <h2 className="text-lg font-bold">About this demonstration</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            LoanIQ demonstrates a possible data-driven and human-supervised
            home loan workflow. It does not provide financial advice,
            official eligibility decisions or banking transactions.
          </p>
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          LoanIQ · Independent Demonstration Prototype · 2026
        </p>
      </div>
    </main>
  );
}
