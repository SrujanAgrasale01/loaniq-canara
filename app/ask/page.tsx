
"use client";

import { useState } from "react";

const suggestedQuestions = [
  "What documents are required for a home loan?",
  "Explain FOIR and its importance.",
  "How do existing EMIs affect eligibility?",
  "What checks should happen before sanction?",
];

const knowledge = [
  {
    keywords: ["document", "documents", "paper", "proof", "required"],
    answer:
      "A typical home-loan application may require identity proof, address proof, income evidence, bank statements and property-related documents. The exact list depends on the lender, applicant profile and property. Missing documents should be flagged for verification.",
    source: "LoanIQ Demo Knowledge Base · Document Checklist",
  },
  {
    keywords: ["foir", "emi", "obligation", "income", "eligibility"],
    answer:
      "FOIR (Fixed Obligations to Income Ratio) is an indicator of the share of monthly income committed to existing and proposed debt obligations. In this prototype, FOIR = (existing monthly EMI + estimated proposed EMI) ÷ monthly income × 100. A lender's actual assessment criteria may differ.",
    source: "LoanIQ Demo Knowledge Base · Financial Assessment",
  },
  {
    keywords: ["existing", "loan", "debt", "repayment"],
    answer:
      "Existing loan obligations can reduce the income available for a new repayment. The assessment should capture existing EMIs, verify declared obligations using supporting evidence where available, and include them in the repayment-capacity analysis.",
    source: "LoanIQ Demo Knowledge Base · Credit Assessment",
  },
  {
    keywords: ["sanction", "approval", "process", "stage", "check"],
    answer:
      "An illustrative loan workflow includes application intake, identity and document verification, income assessment, property due diligence, policy checks, credit review, sanction decision and subsequent disbursement checks. A designated human officer retains the final decision in this prototype.",
    source: "LoanIQ Demo Knowledge Base · Workflow Overview",
  },
];

type Message = {
  role: "user" | "assistant";
  content: string;
  source?: string;
};

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm LoanIQ Policy Assistant. Ask me about home-loan documentation, financial assessment, FOIR or the loan approval workflow. My current answers use an illustrative demo knowledge base.",
      source: "LoanIQ Demo Knowledge Base",
    },
  ]);

  const [loanA, setLoanA] = useState("75000");
  const [loanB, setLoanB] = useState("100000");
  const [emiA, setEmiA] = useState("26035");
  const [emiB, setEmiB] = useState("35000");

  function findAnswer(text: string) {
    const normalized = text.toLowerCase();

    const match = knowledge.find((item) =>
      item.keywords.some((keyword) => normalized.includes(keyword))
    );

    if (match) {
      return { answer: match.answer, source: match.source };
    }

    return {
      answer:
        "I couldn't find a sufficiently relevant answer in the current demo knowledge base. Please consult the applicable verified lender policy and supporting documents. This prototype does not invent an official policy response.",
      source: "No matching demo knowledge-base entry",
    };
  }

  function sendMessage(value = question) {
    const trimmed = value.trim();
    if (!trimmed) return;

    const result = findAnswer(trimmed);

    setMessages((old) => [
      ...old,
      { role: "user", content: trimmed },
      {
        role: "assistant",
        content: result.answer,
        source: result.source,
      },
    ]);

    setQuestion("");
  }

  const ratioA = Number(loanA) > 0
    ? (Number(emiA) / Number(loanA)) * 100
    : 0;

  const ratioB = Number(loanB) > 0
    ? (Number(emiB) / Number(loanB)) * 100
    : 0;

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 text-slate-800 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Workspace / Ask & Compare</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Loan Policy Intelligence
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Ask questions, explore policy knowledge and compare loan scenarios.
            </p>
          </div>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
            Demo knowledge base
          </span>
        </div>

        <div className="mt-7 grid items-start gap-6 xl:grid-cols-3">
          <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between bg-[#142b50] p-5 text-white">
              <div>
                <p className="text-xs font-semibold tracking-widest text-blue-200">
                  LOANIQ ASSISTANT
                </p>
                <h2 className="mt-1 text-lg font-bold">Ask your loan questions</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-2 text-xs">
                ● Demo mode
              </span>
            </div>

            <div className="flex min-h-[390px] flex-col gap-4 p-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[90%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "mr-auto border border-slate-100 bg-slate-50 text-slate-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.content}
                  </p>
                  {message.source && (
                    <p className="mt-3 border-t border-slate-200 pt-2 text-xs text-slate-500">
                      Source: {message.source}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Suggested questions
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestedQuestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                    className="rounded-full border border-slate-200 px-3 py-2 text-left text-xs text-slate-600 transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about home-loan policies..."
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Send
                </button>
              </form>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-blue-600">
                KNOWLEDGE BASE
              </p>
              <h2 className="mt-2 text-lg font-bold">Demo knowledge sources</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Illustrative knowledge entries used to demonstrate policy retrieval.
                These are not verified Canara Bank policy documents.
              </p>
              <div className="mt-5 space-y-3">
                {knowledge.map((item, index) => (
                  <div key={item.source} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-blue-700">
                      SOURCE 0{index + 1}
                    </p>
                    <p className="mt-1 text-sm font-medium">{item.source}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-blue-600">
                COMPARISON TOOL
              </p>
              <h2 className="mt-2 text-lg font-bold">Compare scenarios</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Change the monthly income and proposed EMI for each illustrative applicant.
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-bold">Applicant A</p>
                  <label className="mt-3 block text-xs text-slate-500">
                    Monthly Income (₹)
                    <input
                      type="number"
                      value={loanA}
                      onChange={(e) => setLoanA(e.target.value)}
                      className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="mt-3 block text-xs text-slate-500">
                    Total Monthly EMI (₹)
                    <input
                      type="number"
                      value={emiA}
                      onChange={(e) => setEmiA(e.target.value)}
                      className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <p className="mt-3 text-sm font-bold text-blue-700">
                    FOIR: {ratioA.toFixed(1)}%
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-bold">Applicant B</p>
                  <label className="mt-3 block text-xs text-slate-500">
                    Monthly Income (₹)
                    <input
                      type="number"
                      value={loanB}
                      onChange={(e) => setLoanB(e.target.value)}
                      className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="mt-3 block text-xs text-slate-500">
                    Total Monthly EMI (₹)
                    <input
                      type="number"
                      value={emiB}
                      onChange={(e) => setEmiB(e.target.value)}
                      className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <p className="mt-3 text-sm font-bold text-blue-700">
                    FOIR: {ratioB.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-800">
                  COMPARISON INSIGHT
                </p>
                <p className="mt-2 text-sm leading-6 text-blue-900">
                  {ratioA < ratioB
                    ? "Applicant A has a lower illustrative FOIR, indicating a lower share of income committed to monthly EMIs."
                    : ratioB < ratioA
                      ? "Applicant B has a lower illustrative FOIR, indicating a lower share of income committed to monthly EMIs."
                      : "Both applicants have the same illustrative FOIR."}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          LoanIQ is an independent demonstration prototype, not an official Canara Bank
          application. Answers currently come from a local illustrative knowledge base,
          not a live AI model or verified lender policy repository.
        </p>
      </div>
    </main>
  );
}
