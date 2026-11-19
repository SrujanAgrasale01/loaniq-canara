
"use client";

import { useEffect, useMemo, useState } from "react";

type Application = {
  applicationId: string;
  customerId: string;
  fullName: string;
  dateOfBirth: string | null;
  customerCity: string | null;
  employer: string | null;
  designation: string | null;
  employmentType: string | null;
  monthlyIncome: number;
  kycStatus: string;
  loanAmount: number;
  propertyValue: number;
  propertyCity: string | null;
  tenureYears: number;
  interestRate: number;
  requestedDate: string | null;
  status: string;
};

const money = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;

const journeyStages = [
  "Application",
  "Verification",
  "Assessment",
  "Officer Review",
  "Sanction",
  "Disbursement",
];

export default function ApplicationsPage() {
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [applicant, setApplicant] = useState("");
  const [age, setAge] = useState("30");
  const [income, setIncome] = useState("75000");
  const [employment, setEmployment] = useState("Salaried");
  const [loanAmount, setLoanAmount] = useState("3000000");
  const [existingEmi, setExistingEmi] = useState("10000");
  const [tenure, setTenure] = useState("20");

  const [assessed, setAssessed] = useState(false);
  const [decision, setDecision] = useState("Pending");
  const [documents, setDocuments] = useState([
    true, true, false, false, true,
  ]);

  const [sanctioned, setSanctioned] = useState(false);
  const [disbursed, setDisbursed] = useState(false);
  const [sanctionReference, setSanctionReference] = useState("");

  const documentNames = [
    "PAN Card",
    "Aadhaar Card",
    "Salary Slips (last 3 months)",
    "Bank Statements (last 6 months)",
    "Property Documents",
  ];

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await fetch("/api/applications");
        if (!response.ok) throw new Error("Unable to load applications.");

        const result = await response.json();
        if (!result.success) throw new Error("BigQuery request failed.");

        setApplications(result.applications);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const term = search.toLowerCase();

    return applications.filter((app) =>
      [
        app.applicationId,
        app.fullName,
        app.customerId,
        app.propertyCity,
        app.status,
      ].some((value) => value?.toLowerCase().includes(term))
    );
  }, [applications, search]);

  const numericIncome = Number(income);
  const numericLoan = Number(loanAmount);
  const numericEmi = Number(existingEmi);
  const monthlyRate = 0.085 / 12;
  const months = Number(tenure) * 12;

  const estimatedEmi =
    numericLoan > 0 && months > 0
      ? (numericLoan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  const foir =
    numericIncome > 0
      ? ((estimatedEmi + numericEmi) / numericIncome) * 100
      : 100;

  const eligible =
    numericIncome > 0 &&
    foir <= 50 &&
    Number(age) >= 21 &&
    Number(age) <= 60;

  const completedDocuments = documents.filter(Boolean).length;
  const allDocumentsReceived = completedDocuments === documentNames.length;

  const journeyStep = disbursed
    ? 6
    : sanctioned
      ? 5
      : decision === "Approved in Demo"
        ? 4
        : assessed
          ? 3
          : completedDocuments > 0
            ? 2
            : 1;

  function startNewApplication() {
    setMode("new");
    setSelected(null);
    setApplicant("");
    setAge("30");
    setIncome("75000");
    setEmployment("Salaried");
    setLoanAmount("3000000");
    setExistingEmi("10000");
    setTenure("20");
    setAssessed(false);
    setDecision("Pending");
    setDocuments([true, true, false, false, true]);
    setSanctioned(false);
    setDisbursed(false);
    setSanctionReference("");
  }

  function selectApplication(app: Application) {
    setSelected(app);
  }

  function runAssessment() {
    setAssessed(true);
    setDecision("Pending");
    setSanctioned(false);
    setDisbursed(false);
    setSanctionReference("");
  }

  function approveApplication() {
    if (!eligible || !allDocumentsReceived) return;
    setDecision("Approved in Demo");
  }

  function rejectApplication() {
    setDecision("Rejected in Demo");
    setSanctioned(false);
    setDisbursed(false);
  }

  function requestMoreInformation() {
    setDecision("More Information Required");
    setSanctioned(false);
    setDisbursed(false);
  }

  function generateSanction() {
    if (decision !== "Approved in Demo") return;

    const reference = `LIQ-SAN-${Date.now().toString().slice(-8)}`;
    setSanctionReference(reference);
    setSanctioned(true);
    setDisbursed(false);
  }

  function confirmDisbursement() {
    if (!sanctioned) return;
    setDisbursed(true);
  }

  function useExistingApplication(app: Application) {
    setApplicant(app.fullName);
    setAge("30");
    setIncome(String(app.monthlyIncome));
    setEmployment(app.employmentType || "Salaried");
    setLoanAmount(String(app.loanAmount));
    setExistingEmi("0");
    setTenure(String(app.tenureYears || 20));
    setDocuments([true, true, true, true, true]);
    setAssessed(false);
    setDecision("Pending");
    setSanctioned(false);
    setDisbursed(false);
    setSanctionReference("");
    setMode("new");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 text-slate-800 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-7">
          <p className="text-sm text-slate-500">
            Workspace / Loan Applications
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Home Loan Applications
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Application, verification, assessment, sanction and disbursement.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setMode("existing");
              setSelected(null);
            }}
            className={`rounded-xl px-5 py-3 text-sm font-semibold ${
              mode === "existing"
                ? "bg-blue-600 text-white"
                : "border bg-white text-slate-700"
            }`}
          >
            Existing Applications ({applications.length})
          </button>

          <button
            onClick={startNewApplication}
            className={`rounded-xl px-5 py-3 text-sm font-semibold ${
              mode === "new"
                ? "bg-blue-600 text-white"
                : "border bg-white text-slate-700"
            }`}
          >
            + New Application
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {mode === "existing" && (
          <>
            <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">
                    Existing Loan Applications
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Live records retrieved from Google BigQuery
                  </p>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                  ● BigQuery Connected
                </span>
              </div>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by application ID, customer, city or status..."
                className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              {loading ? (
                <p className="py-10 text-center text-sm text-slate-500">
                  Loading applications from BigQuery...
                </p>
              ) : (
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-sm">
                    <thead>
                      <tr className="border-b text-xs uppercase text-slate-400">
                        <th className="pb-3">Application ID</th>
                        <th className="pb-3">Applicant</th>
                        <th className="pb-3">City</th>
                        <th className="pb-3">Loan Amount</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((app) => (
                        <tr
                          key={app.applicationId}
                          className="border-b border-slate-100"
                        >
                          <td className="py-4 font-semibold text-blue-700">
                            {app.applicationId}
                          </td>
                          <td className="py-4">{app.fullName}</td>
                          <td className="py-4">{app.propertyCity || "—"}</td>
                          <td className="py-4 font-medium">
                            {money(app.loanAmount)}
                          </td>
                          <td className="py-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
                              {app.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => selectApplication(app)}
                              className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                            >
                              View details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredApplications.length === 0 && (
                    <p className="py-8 text-center text-sm text-slate-500">
                      No matching applications found.
                    </p>
                  )}
                </div>
              )}
            </section>

            {selected && (
              <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-blue-600">
                      APPLICATION DETAILS
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                      {selected.applicationId}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg border px-4 py-2 text-sm"
                  >
                    Close details
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    ["Applicant", selected.fullName],
                    ["Customer ID", selected.customerId],
                    ["Application Status", selected.status],
                    ["Monthly Income", money(selected.monthlyIncome)],
                    ["Employment", selected.employmentType || "—"],
                    ["Employer", selected.employer || "—"],
                    ["Designation", selected.designation || "—"],
                    ["KYC Status", selected.kycStatus],
                    ["Date of Birth", selected.dateOfBirth || "—"],
                    ["Loan Amount", money(selected.loanAmount)],
                    ["Property Value", money(selected.propertyValue)],
                    ["Property City", selected.propertyCity || "—"],
                    ["Loan Tenure", `${selected.tenureYears} years`],
                    ["Interest Rate", `${selected.interestRate}%`],
                    ["Requested Date", selected.requestedDate || "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-2 break-words text-sm font-semibold">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  This is an existing BigQuery application record. Its actual
                  status is {selected.status}. Further assessment and officer
                  actions in this prototype do not update the bank's records.
                </div>

                <button
                  onClick={() => useExistingApplication(selected)}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Use details in assessment preview
                </button>
              </section>
            )}
          </>
        )}

        {mode === "new" && (
          <>
            {/* JOURNEY TRACKER */}
            <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-blue-600">
                END-TO-END LOAN JOURNEY
              </p>
              <h2 className="mt-2 text-xl font-bold">
                Application to Disbursement
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {journeyStages.map((stage, index) => {
                  const active = index + 1 <= journeyStep;

                  return (
                    <div
                      key={stage}
                      className={`rounded-xl border p-3 ${
                        active
                          ? "border-blue-200 bg-blue-50"
                          : "border-slate-100 bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          active
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <p className="mt-3 text-xs font-semibold">{stage}</p>
                      <p className={`mt-1 text-xs ${active ? "text-blue-600" : "text-slate-400"}`}>
                        {active ? "Reached" : "Pending"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border bg-white p-5">
                <p className="text-sm text-slate-500">Application ID</p>
                <p className="mt-2 font-bold text-blue-700">NEW · DEMO</p>
              </div>
              <div className="rounded-xl border bg-white p-5">
                <p className="text-sm text-slate-500">Loan Product</p>
                <p className="mt-2 font-bold">Home Loan</p>
              </div>
              <div className="rounded-xl border bg-white p-5">
                <p className="text-sm text-slate-500">Application Status</p>
                <p className="mt-2 font-bold text-amber-600">
                  {disbursed
                    ? "Disbursed in Demo"
                    : sanctioned
                      ? "Sanctioned in Demo"
                      : decision}
                </p>
              </div>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-3">
              <section className="space-y-6 lg:col-span-2">
                {/* APPLICANT INFORMATION */}
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold">
                    01. Applicant Information
                  </h2>
                  <p className="mb-5 mt-1 text-sm text-slate-500">
                    Enter the applicant's basic details.
                  </p>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="text-sm font-medium">
                      Full Name
                      <input
                        value={applicant}
                        onChange={(e) => {
                          setApplicant(e.target.value);
                          setAssessed(false);
                        }}
                        placeholder="Enter applicant name"
                        className="mt-2 w-full rounded-lg border px-4 py-3 font-normal outline-none focus:border-blue-500"
                      />
                    </label>

                    <label className="text-sm font-medium">
                      Age
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => {
                          setAge(e.target.value);
                          setAssessed(false);
                        }}
                        className="mt-2 w-full rounded-lg border px-4 py-3 font-normal outline-none focus:border-blue-500"
                      />
                    </label>

                    <label className="text-sm font-medium">
                      Employment Type
                      <select
                        value={employment}
                        onChange={(e) => setEmployment(e.target.value)}
                        className="mt-2 w-full rounded-lg border bg-white px-4 py-3 font-normal"
                      >
                        <option>Salaried</option>
                        <option>Self-employed</option>
                        <option>Business Owner</option>
                      </select>
                    </label>

                    <label className="text-sm font-medium">
                      Monthly Income (₹)
                      <input
                        type="number"
                        value={income}
                        onChange={(e) => {
                          setIncome(e.target.value);
                          setAssessed(false);
                        }}
                        className="mt-2 w-full rounded-lg border px-4 py-3 font-normal"
                      />
                    </label>

                    <label className="text-sm font-medium">
                      Existing Monthly EMI (₹)
                      <input
                        type="number"
                        value={existingEmi}
                        onChange={(e) => {
                          setExistingEmi(e.target.value);
                          setAssessed(false);
                        }}
                        className="mt-2 w-full rounded-lg border px-4 py-3 font-normal"
                      />
                    </label>

                    <label className="text-sm font-medium">
                      Requested Loan Amount (₹)
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => {
                          setLoanAmount(e.target.value);
                          setAssessed(false);
                        }}
                        className="mt-2 w-full rounded-lg border px-4 py-3 font-normal"
                      />
                    </label>

                    <label className="text-sm font-medium md:col-span-2">
                      Loan Tenure
                      <select
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className="mt-2 w-full rounded-lg border bg-white px-4 py-3 font-normal"
                      >
                        {[10, 15, 20, 25, 30].map((year) => (
                          <option key={year} value={year}>
                            {year} Years
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                {/* DOCUMENT CHECKLIST */}
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold">
                    02. Document Verification
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Illustrative document checklist.
                  </p>

                  <div className="mt-5 space-y-3">
                    {documentNames.map((name, index) => (
                      <label
                        key={name}
                        className="flex cursor-pointer items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-3 text-sm font-medium">
                          <input
                            type="checkbox"
                            checked={documents[index]}
                            onChange={() => {
                              setDocuments((old) =>
                                old.map((value, i) =>
                                  i === index ? !value : value
                                )
                              );
                              setAssessed(false);
                            }}
                            className="h-4 w-4 accent-blue-600"
                          />
                          {name}
                        </span>

                        <span
                          className={`text-xs font-semibold ${
                            documents[index]
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
                          {documents[index] ? "Received" : "Pending"}
                        </span>
                      </label>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    {completedDocuments} of {documentNames.length} checklist
                    items marked received.
                  </p>
                </div>

                <button
                  onClick={runAssessment}
                  disabled={
                    !applicant.trim() ||
                    numericIncome <= 0 ||
                    numericLoan <= 0 ||
                    Number(age) <= 0 ||
                    months <= 0
                  }
                  className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  ✧ Run Illustrative Loan Assessment
                </button>

                {/* ASSESSMENT RESULT AND OFFICER DECISION */}
                {assessed && (
                  <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold text-blue-600">
                      03. CREDIT ASSESSMENT RESULT
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {eligible
                        ? "Potentially Eligible"
                        : "Needs Further Review"}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {eligible
                        ? "The prototype's configured income, age and FOIR checks are within the illustrative thresholds."
                        : "One or more illustrative checks need attention. Review the applicant information."}
                    </p>

                    <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                      {documentNames.length - completedDocuments} document(s)
                      pending in the checklist.
                    </div>

                    <div className="mt-6 border-t pt-5">
                      <p className="font-bold">
                        04. Human Credit Officer Decision
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Final decision belongs to an authorized officer.
                        Demo actions only.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={approveApplication}
                          disabled={!eligible || !allDocumentsReceived}
                          className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                          Approve Demo
                        </button>

                        <button
                          onClick={rejectApplication}
                          className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white"
                        >
                          Reject Demo
                        </button>

                        <button
                          onClick={requestMoreInformation}
                          className="rounded-lg border px-5 py-3 text-sm font-semibold"
                        >
                          Request More Information
                        </button>
                      </div>

                      {!allDocumentsReceived && (
                        <p className="mt-3 text-xs text-amber-700">
                          Complete all document checklist items before
                          approving this demo application.
                        </p>
                      )}

                      <p className="mt-4 text-sm font-semibold">
                        Decision: {decision}
                      </p>
                    </div>
                  </div>
                )}

                {/* SANCTION */}
                {decision === "Approved in Demo" && (
                  <section className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold text-green-700">
                      05. LOAN SANCTION
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                      Sanction Processing
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      The officer-approved demo application is ready for
                      illustrative sanction generation.
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">
                          Applicant
                        </p>
                        <p className="mt-2 font-semibold">{applicant}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">
                          Proposed Sanction Amount
                        </p>
                        <p className="mt-2 font-semibold">
                          {money(numericLoan)}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">
                          Illustrative Interest Rate
                        </p>
                        <p className="mt-2 font-semibold">8.5% p.a.</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">
                          Tenure
                        </p>
                        <p className="mt-2 font-semibold">
                          {tenure} years
                        </p>
                      </div>
                    </div>

                    {!sanctioned ? (
                      <button
                        onClick={generateSanction}
                        className="mt-5 w-full rounded-xl bg-green-600 px-5 py-4 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        Generate Demo Sanction Letter
                      </button>
                    ) : (
                      <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
                        <p className="text-xs font-semibold text-green-700">
                          SANCTION GENERATED IN DEMO
                        </p>
                        <h3 className="mt-2 text-lg font-bold text-green-900">
                          Home Loan Sanction Letter
                        </h3>
                        <p className="mt-2 text-sm text-green-800">
                          Reference: {sanctionReference}
                        </p>
                        <p className="mt-3 text-sm text-green-800">
                          Applicant: {applicant}
                        </p>
                        <p className="mt-1 text-sm text-green-800">
                          Sanction amount: {money(numericLoan)}
                        </p>
                        <p className="mt-1 text-sm text-green-800">
                          Estimated EMI: {money(estimatedEmi)}
                        </p>
                        <p className="mt-3 text-xs leading-5 text-green-800">
                          This is a demonstration-only sanction preview,
                          not a bank-issued sanction letter or binding offer.
                        </p>
                      </div>
                    )}
                  </section>
                )}

                {/* DISBURSEMENT */}
                {sanctioned && (
                  <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold text-blue-600">
                      06. LOAN DISBURSEMENT
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                      Disbursement Management
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Demonstrate the final disbursement stage after
                      sanction. No real funds will be transferred.
                    </p>

                    <div className="mt-5 rounded-xl bg-blue-50 p-5">
                      <p className="text-xs text-blue-700">
                        Approved demo sanction reference
                      </p>
                      <p className="mt-2 font-bold text-blue-900">
                        {sanctionReference}
                      </p>
                      <p className="mt-4 text-xs text-blue-700">
                        Proposed disbursement amount
                      </p>
                      <p className="mt-1 text-2xl font-bold text-blue-900">
                        {money(numericLoan)}
                      </p>
                    </div>

                    {!disbursed ? (
                      <button
                        onClick={confirmDisbursement}
                        className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Complete Demo Disbursement
                      </button>
                    ) : (
                      <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
                        <div className="flex items-center gap-2 text-green-700">
                          <span className="text-xl">✓</span>
                          <h3 className="font-bold">
                            Demo Disbursement Completed
                          </h3>
                        </div>
                        <p className="mt-3 text-sm text-green-800">
                          Applicant: {applicant}
                        </p>
                        <p className="mt-1 text-sm text-green-800">
                          Amount: {money(numericLoan)}
                        </p>
                        <p className="mt-1 text-sm text-green-800">
                          Sanction reference: {sanctionReference}
                        </p>
                        <p className="mt-3 text-xs leading-5 text-green-800">
                          This is a simulated completion state. No bank
                          account was credited and no payment was executed.
                        </p>
                      </div>
                    )}
                  </section>
                )}
              </section>

              {/* RIGHT SIDEBAR */}
              <aside className="space-y-5">
                <div className="rounded-2xl bg-[#142b50] p-6 text-white shadow-sm">
                  <p className="text-xs font-semibold tracking-wider text-blue-200">
                    LOAN CALCULATOR
                  </p>
                  <h2 className="mt-2 text-xl font-bold">
                    Estimated EMI
                  </h2>
                  <p className="mt-5 text-3xl font-bold">
                    {money(estimatedEmi)}
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Monthly · Illustrative 8.5% annual interest
                  </p>

                  <div className="mt-5 border-t border-white/15 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Loan amount</span>
                      <span>{money(numericLoan)}</span>
                    </div>
                    <div className="mt-3 flex justify-between text-sm">
                      <span className="text-slate-300">Tenure</span>
                      <span>{tenure} years</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold tracking-wider text-slate-400">
                    ASSESSMENT PREVIEW
                  </p>
                  <h2 className="mt-2 text-lg font-bold">
                    Financial Indicators
                  </h2>

                  <div className="mt-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">FOIR</span>
                      <span className="font-bold">{foir.toFixed(1)}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${Math.min(foir, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-slate-500">Income</span>
                    <span className="font-semibold">
                      {money(numericIncome)}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-slate-500">Existing EMI</span>
                    <span className="font-semibold">
                      {money(numericEmi)}
                    </span>
                  </div>

                  <p className="mt-5 rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-800">
                    FOIR is an illustrative indicator. The 50% threshold
                    and 8.5% interest rate are prototype assumptions, not
                    verified Canara Bank lending policy.
                  </p>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold text-slate-400">
                    CURRENT JOURNEY STATUS
                  </p>
                  <h2 className="mt-2 text-lg font-bold">
                    {disbursed
                      ? "Disbursement Complete"
                      : sanctioned
                        ? "Sanction Generated"
                        : decision === "Approved in Demo"
                          ? "Officer Approved"
                          : assessed
                            ? "Assessment Complete"
                            : "Application in Progress"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {disbursed
                      ? "The simulated journey has reached its final stage."
                      : sanctioned
                        ? "The demo sanction is ready for simulated disbursement."
                        : decision === "Approved in Demo"
                          ? "Proceed to generate the illustrative sanction."
                          : "Complete each stage to progress through the loan journey."}
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          LoanIQ is an independent demonstration prototype and is not an
          official Canara Bank application. Existing records are retrieved
          from BigQuery. New applications, assessment decisions, sanction
          and disbursement actions are illustrative and are not saved to
          bank systems.
        </p>
      </div>
    </main>
  );
}
