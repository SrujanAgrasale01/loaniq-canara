
"use client";

import { useEffect, useState } from "react";

type Application = {
  applicationId: string;
  customerId: string;
  customerName: string;
  loanAmount: number;
  propertyCity: string;
  status: string;
  requestedDate: string | null;
};

type DashboardData = {
  success: boolean;
  source: string;
  summary: {
    totalApplications: number;
    totalRequestedAmount: number;
    totalCustomers: number;
  };
  statusBreakdown: {
    status: string;
    count: number;
  }[];
  recentApplications: Application[];
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatCompactCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return formatCurrency(amount);
};

const statusStyle = (status: string) => {
  const value = status.toUpperCase();

  if (value.includes("APPROV")) {
    return "bg-green-50 text-green-700";
  }
  if (value.includes("REJECT")) {
    return "bg-red-50 text-red-700";
  }
  if (value.includes("SUBMIT")) {
    return "bg-blue-50 text-blue-700";
  }
  return "bg-amber-50 text-amber-700";
};

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Unable to load dashboard data.");
        }

        const result: DashboardData = await response.json();

        if (!result.success) {
          throw new Error("BigQuery returned an unsuccessful response.");
        }

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const totalApplications = data?.summary.totalApplications ?? 0;
  const totalCustomers = data?.summary.totalCustomers ?? 0;
  const totalAmount = data?.summary.totalRequestedAmount ?? 0;
  const submittedCount =
    data?.statusBreakdown.find(
      (item) => item.status?.toUpperCase() === "SUBMITTED"
    )?.count ?? 0;

  const metrics = [
    {
      label: "Total Applications",
      value: loading ? "..." : error ? "—" : totalApplications.toLocaleString("en-IN"),
      note: "Records from BigQuery",
      icon: "▤",
    },
    {
      label: "Total Customers",
      value: loading ? "..." : error ? "—" : totalCustomers.toLocaleString("en-IN"),
      note: "Unique customer records",
      icon: "♙",
    },
    {
      label: "Requested Loan Amount",
      value: loading ? "..." : error ? "—" : formatCompactCurrency(totalAmount),
      note: "Total requested value",
      icon: "₹",
    },
    {
      label: "Submitted Applications",
      value: loading ? "..." : error ? "—" : submittedCount.toLocaleString("en-IN"),
      note: "Awaiting further processing",
      icon: "◷",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 text-slate-800 md:p-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Workspace / Overview</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            Loan Intelligence Dashboard
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Monitor applications, AI assessments and loan processing activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
            ● BigQuery Connected
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#101f3d] font-semibold text-white">
            A
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error} Please check the BigQuery API connection.
        </div>
      )}

      <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{item.label}</p>
              <span className="text-xl text-blue-600">{item.icon}</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              {item.value}
            </p>
            <p className="mt-2 text-xs text-slate-500">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="mb-7 grid gap-5 xl:grid-cols-3">
        <div className="rounded-2xl bg-[#142b50] p-6 text-white shadow-sm xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-blue-200">
                AGENTIC AI WORKFLOW
              </p>
              <h3 className="mt-2 text-xl font-bold">
                Intelligent Loan Processing
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Coordinate document verification, policy checks and credit
                assessment through specialized agents, with a human officer
                making the final decision.
              </p>
            </div>

            <span className="rounded-lg bg-blue-500/20 px-3 py-2 text-xs text-blue-200">
              Illustrative workflow
            </span>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["01", "Application", "Received"],
              ["02", "Documents", "Verification"],
              ["03", "Credit AI", "Assessment"],
              ["04", "Officer", "Final decision"],
            ].map((step) => (
              <div
                key={step[0]}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <p className="text-xs text-blue-300">{step[0]}</p>
                <p className="mt-3 text-sm font-semibold">{step[1]}</p>
                <p className="mt-1 text-xs text-slate-400">{step[2]}</p>
              </div>
            ))}
          </div>

          <a
            href="/applications"
            className="mt-6 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Explore loan workflow →
          </a>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            AI AGENT ACTIVITY
          </p>
          <h3 className="mt-2 text-xl font-bold">System Overview</h3>

          <div className="mt-6 space-y-5">
            {[
              ["Document Verification", "Illustrative agent workflow"],
              ["Policy Intelligence", "Sample policy knowledge lookup"],
              ["Credit Assessment", "Illustrative risk assessment"],
              ["Human Review", "Officer decision required"],
            ].map((item) => (
              <div key={item[0]} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-semibold">{item[0]}</p>
                  <p className="mt-1 text-xs text-slate-500">{item[1]}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            Agent activity is illustrative and is not represented as completed
            processing of the BigQuery applications.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Recent Loan Applications
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Latest records retrieved from the BigQuery lakehouse
            </p>
          </div>

          <a
            href="/applications"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Loan workflow →
          </a>
        </div>

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-500">
            Loading applications from BigQuery...
          </p>
        ) : !error && data?.recentApplications.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">
            No applications found.
          </p>
        ) : !error && data ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-4 font-medium">Application ID</th>
                  <th className="pb-4 font-medium">Applicant</th>
                  <th className="pb-4 font-medium">City</th>
                  <th className="pb-4 font-medium">Loan Amount</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {data.recentApplications.map((app) => (
                  <tr
                    key={app.applicationId}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-4 font-medium text-blue-700">
                      {app.applicationId}
                    </td>
                    <td className="py-4 font-medium">
                      {app.customerName}
                    </td>
                    <td className="py-4 text-slate-500">
                      {app.propertyCity || "—"}
                    </td>
                    <td className="py-4 font-medium">
                      {formatCurrency(app.loanAmount)}
                    </td>
                    <td className="py-4 text-slate-500">
                      {app.requestedDate || "—"}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
          <span>Data source: Google BigQuery · loaniq dataset</span>
          <span>{data?.recentApplications.length ?? 0} recent records</span>
        </div>
      </section>

      <footer className="mt-7 text-center text-xs leading-5 text-slate-400">
        LoanIQ is an independent demonstration prototype and is not an
        official Canara Bank application. AI workflow and agent activity
        are illustrative. Customer data must be dummy or anonymized.
      </footer>
    </main>
  );
}
