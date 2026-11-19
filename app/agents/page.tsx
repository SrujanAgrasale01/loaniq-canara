
"use client";

import { useState } from "react";

type DocumentData = {
  success: boolean;
  applicationId: string;
  summary: {
    totalChecks: number;
    totalExtractions: number;
    failedChecks: number;
  };
  checks: {
    checkName: string;
    valueA: string | null;
    valueB: string | null;
    differencePercent: number | null;
    result: string;
    detail: string;
  }[];
  extractions: {
    documentType: string;
    field: string;
    value: string;
    confidence: number | null;
  }[];
};

const agents = [
  {
    id: "intake",
    number: "01",
    name: "Application Intake Agent",
    role: "Applicant data validation",
    description:
      "Validates applicant identity fields, age, income and application completeness.",
    icon: "📋",
    finding: "Applicant information received and required fields validated.",
    evidence: "Application and customer records",
  },
  {
    id: "document",
    number: "02",
    name: "Document Verification Agent",
    role: "Document completeness and consistency",
    description:
      "Retrieves extracted document fields and verification comparisons from BigQuery.",
    icon: "📁",
    finding: "Document evidence retrieved from BigQuery.",
    evidence: "doc_checks and doc_extractions",
  },
  {
    id: "policy",
    number: "03",
    name: "Policy Intelligence Agent",
    role: "Policy knowledge retrieval",
    description:
      "Retrieves relevant guidance from the prototype policy knowledge base.",
    icon: "📚",
    finding:
      "Illustrative home-loan policy guidance retrieved. Product-specific conditions require verification.",
    evidence: "Demo policy knowledge base",
  },
  {
    id: "credit",
    number: "04",
    name: "Credit Assessment Agent",
    role: "Income and repayment analysis",
    description:
      "Calculates estimated EMI, existing obligations and repayment indicators.",
    icon: "📊",
    finding: "Illustrative FOIR and repayment indicators calculated.",
    evidence: "Income and loan information",
  },
  {
    id: "risk",
    number: "05",
    name: "Risk Analysis Agent",
    role: "Risk flags and exceptions",
    description:
      "Identifies missing evidence, unusual inputs and issues requiring human review.",
    icon: "🛡️",
    finding: "Risk review required before a lending decision.",
    evidence: "Document checks and financial indicators",
  },
  {
    id: "officer",
    number: "06",
    name: "Human Credit Officer",
    role: "Final decision and oversight",
    description:
      "Reviews agent findings and retains final decision authority.",
    icon: "👤",
    finding: "Officer review required before any lending decision.",
    evidence: "Combined agent report and supporting evidence",
  },
];

type AgentStatus = "Waiting" | "Completed" | "Review Required";

function maskSensitiveField(field: string, value: string) {
  const key = field.toLowerCase();

  if (
    key.includes("pan") ||
    key.includes("account_no") ||
    key.includes("account_number")
  ) {
    return value.length > 4
      ? `${"*".repeat(value.length - 4)}${value.slice(-4)}`
      : "****";
  }

  return value;
}

export default function AgentsPage() {
  const [statuses, setStatuses] = useState<
    Record<string, AgentStatus>
  >({});
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [started, setStarted] = useState(false);
  const [decision, setDecision] = useState("Pending");

  const [applicationId, setApplicationId] = useState("APP-0001");
  const [documentData, setDocumentData] =
    useState<DocumentData | null>(null);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [documentError, setDocumentError] = useState("");

  async function loadDocuments() {
    if (!applicationId.trim()) {
      setDocumentError("Enter an application ID.");
      return;
    }

    setLoadingDocuments(true);
    setDocumentError("");
    setDocumentData(null);

    try {
      const response = await fetch(
        `/api/document-checks?id=${encodeURIComponent(
          applicationId.trim()
        )}`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to retrieve document data."
        );
      }

      setDocumentData(result);
    } catch (error) {
      setDocumentError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoadingDocuments(false);
    }
  }

  function runWorkflow() {
    setRunning(true);
    setStarted(true);
    setCurrent(-1);
    setDecision("Pending");
    setStatuses({});

    agents.forEach((agent, index) => {
      window.setTimeout(() => {
        setCurrent(index);

        setStatuses((old) => ({
          ...old,
          [agent.id]:
            index === 4 || index === 5
              ? "Review Required"
              : "Completed",
        }));

        if (index === agents.length - 1) {
          setRunning(false);
        }
      }, (index + 1) * 900);
    });
  }

  const completed = Object.values(statuses).filter(
    (status) => status === "Completed"
  ).length;

  const review = Object.values(statuses).filter(
    (status) => status === "Review Required"
  ).length;

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 text-slate-800 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Workspace / AI Agents
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Agent Control Centre
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Observe specialized agents and inspect real document evidence.
            </p>
          </div>

          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
            ● BigQuery connected · Simulation environment
          </span>
        </div>

        {/* BIGQUERY DOCUMENT EVIDENCE */}
        <section className="mt-7 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold tracking-widest text-blue-600">
            BIGQUERY DOCUMENT EVIDENCE
          </p>

          <h2 className="mt-2 text-xl font-bold">
            Document Verification Agent
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Retrieve document comparisons and extracted fields from the
            BigQuery doc_checks and doc_extractions tables.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <input
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="Enter application ID"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              onClick={loadDocuments}
              disabled={loadingDocuments}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loadingDocuments
                ? "Loading..."
                : "Load document evidence"}
            </button>
          </div>

          {documentError && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {documentError}
            </p>
          )}

          {documentData && (
            <div className="mt-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Document checks
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {documentData.summary.totalChecks}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Extracted fields
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    {documentData.summary.totalExtractions}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Failed checks
                  </p>
                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {documentData.summary.failedChecks}
                  </p>
                </div>
              </div>

              <h3 className="mt-7 font-bold">
                Verification Results · {documentData.applicationId}
              </h3>

              {documentData.checks.length === 0 ? (
                <p className="mt-3 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                  No verification records were found for this application.
                  This does not mean the documents passed verification.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {documentData.checks.map((check, index) => (
                    <div
                      key={`${check.checkName}-${index}`}
                      className="rounded-xl border border-slate-100 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">
                          {check.checkName.replaceAll("_", " ")}
                        </p>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            check.result?.toUpperCase() === "PASS"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {check.result}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-600">
                        {check.detail}
                      </p>

                      <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                        <p>
                          Source A:{" "}
                          {check.valueA
                            ? maskSensitiveField(
                                check.checkName,
                                check.valueA
                              )
                            : "—"}
                        </p>

                        <p>
                          Source B:{" "}
                          {check.valueB
                            ? maskSensitiveField(
                                check.checkName,
                                check.valueB
                              )
                            : "—"}
                        </p>
                      </div>

                      {check.differencePercent !== null && (
                        <p className="mt-2 text-xs text-slate-500">
                          Difference: {check.differencePercent}%
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <h3 className="mt-7 font-bold">
                Extracted Document Fields
              </h3>

              {documentData.extractions.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">
                  No extracted fields available.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[600px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs text-slate-500">
                      <tr>
                        <th className="p-3">Document</th>
                        <th className="p-3">Field</th>
                        <th className="p-3">Extracted Value</th>
                        <th className="p-3">Confidence</th>
                      </tr>
                    </thead>

                    <tbody>
                      {documentData.extractions.map((item, index) => (
                        <tr
                          key={`${item.documentType}-${item.field}-${index}`}
                          className="border-t"
                        >
                          <td className="p-3">{item.documentType}</td>
                          <td className="p-3">{item.field}</td>
                          <td className="p-3 font-medium">
                            {maskSensitiveField(item.field, item.value)}
                          </td>
                          <td className="p-3">
                            {item.confidence === null
                              ? "Not available"
                              : `${(
                                  item.confidence * 100
                                ).toFixed(0)}%`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                These are dataset-provided extraction and comparison results.
                They are not independent document authentication. Sensitive
                identifiers are masked in this interface.
              </p>
            </div>
          )}
        </section>

        {/* AGENT WORKFLOW */}
        <section className="mt-6 rounded-2xl bg-[#142b50] p-6 text-white shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-200">
                AGENTIC AI ORCHESTRATION
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Home Loan Assessment Pipeline
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Specialized agents inspect evidence, retrieve policy guidance
                and identify risks. A human officer retains final authority.
              </p>
            </div>

            <button
              onClick={runWorkflow}
              disabled={running}
              className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-50"
            >
              {running ? "Running agents..." : "▶ Run Demo Workflow"}
            </button>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex justify-between text-xs text-blue-200">
              <span>Workflow progress</span>
              <span>
                {completed + review}/{agents.length} agents processed
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-blue-400 transition-all duration-500"
                style={{
                  width: `${
                    ((completed + review) / agents.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* AGENT METRICS */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Agents</p>
            <p className="mt-2 text-3xl font-bold">06</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {completed}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Require Review</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {review}
            </p>
          </div>
        </section>

        {/* AGENT EXECUTION TRACE */}
        <section className="mt-7">
          <h2 className="text-xl font-bold">Agent Execution Trace</h2>

          <p className="mt-1 text-sm text-slate-500">
            Individual agent tasks, execution status and findings.
          </p>

          <div className="mt-4 space-y-4">
            {agents.map((agent, index) => {
              const status = statuses[agent.id] || "Waiting";
              const active = running && current === index;

              return (
                <article
                  key={agent.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm ${
                    active
                      ? "border-blue-400 ring-2 ring-blue-100"
                      : "border-slate-100"
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      {agent.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-blue-600">
                          AGENT {agent.number}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "Completed"
                              ? "bg-green-50 text-green-700"
                              : status === "Review Required"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {active ? "Processing..." : status}
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold">
                        {agent.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {agent.role}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {agent.description}
                      </p>

                      {status !== "Waiting" && (
                        <div className="mt-4 rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase text-slate-500">
                            Agent finding
                          </p>

                          <p className="mt-2 text-sm text-slate-700">
                            {agent.finding}
                          </p>

                          <p className="mt-3 text-xs text-slate-500">
                            Evidence: {agent.evidence}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* HUMAN OFFICER REVIEW */}
        {started && !running && (
          <section className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-lg font-bold text-amber-900">
              Human Review Required
            </h2>

            <p className="mt-2 text-sm text-amber-800">
              The demonstration workflow has completed. Agent outputs do not
              automatically approve or reject a loan.
            </p>

            <div className="mt-5 rounded-xl border border-amber-200 bg-white p-5">
              <h3 className="font-bold">Credit Officer Decision</h3>

              <p className="mt-1 text-xs text-slate-500">
                Demonstration-only action.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setDecision("Approved in Demo")}
                  className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Approve Demo
                </button>

                <button
                  onClick={() => setDecision("Rejected in Demo")}
                  className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Reject Demo
                </button>

                <button
                  onClick={() =>
                    setDecision("More Information Required")
                  }
                  className="rounded-lg border px-5 py-3 text-sm font-semibold"
                >
                  Request More Information
                </button>
              </div>

              <p className="mt-4 text-sm font-semibold">
                Decision status: {decision}
              </p>
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          LoanIQ is an independent demonstration prototype, not an official
          Canara Bank application. The orchestration and officer actions are
          simulated. BigQuery document results are dataset-provided.
        </p>
      </div>
    </main>
  );
}
