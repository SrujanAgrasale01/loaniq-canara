
"use client";

import { useState } from "react";

const nodes = [
  {
    id: "applicant",
    name: "Applicant Profile",
    category: "Customer Data",
    icon: "👤",
    details: "Synthetic applicant identity, age, employment type and contact information.",
    connects: ["Income Records", "Identity Documents", "Loan Application"],
  },
  {
    id: "income",
    name: "Income Records",
    category: "Financial Data",
    icon: "💰",
    details: "Declared monthly income, salary evidence and bank statement references.",
    connects: ["Applicant Profile", "Credit Assessment"],
  },
  {
    id: "documents",
    name: "Identity Documents",
    category: "Unstructured Data",
    icon: "📄",
    details: "PAN, Aadhaar and other illustrative document verification records.",
    connects: ["Applicant Profile", "Document Agent"],
  },
  {
    id: "application",
    name: "Loan Application",
    category: "Application Data",
    icon: "🏠",
    details: "Home-loan amount, requested tenure, property information and application status.",
    connects: ["Applicant Profile", "Credit Assessment", "Policy Rules"],
  },
  {
    id: "credit",
    name: "Credit Assessment",
    category: "Derived Data",
    icon: "📊",
    details: "Illustrative EMI, FOIR, repayment capacity and credit assessment indicators.",
    connects: ["Income Records", "Loan Application", "Risk Analysis Agent"],
  },
  {
    id: "policy",
    name: "Policy Rules",
    category: "Knowledge Data",
    icon: "📚",
    details: "Demo policy knowledge entries and retrieved lending guidance.",
    connects: ["Loan Application", "Policy Intelligence Agent"],
  },
  {
    id: "document-agent",
    name: "Document Agent",
    category: "AI Agent",
    icon: "🤖",
    details: "Checks document presence and reports missing or incomplete evidence.",
    connects: ["Identity Documents", "Risk Analysis Agent"],
  },
  {
    id: "policy-agent",
    name: "Policy Intelligence Agent",
    category: "AI Agent",
    icon: "🧠",
    details: "Retrieves relevant knowledge-base entries to support policy review.",
    connects: ["Policy Rules", "Human Officer"],
  },
  {
    id: "risk",
    name: "Risk Analysis Agent",
    category: "AI Agent",
    icon: "🛡️",
    details: "Combines available findings and highlights items requiring human review.",
    connects: ["Credit Assessment", "Document Agent", "Human Officer"],
  },
  {
    id: "officer",
    name: "Human Officer",
    category: "Human Oversight",
    icon: "👨‍💼",
    details: "Reviews evidence and retains responsibility for the final decision.",
    connects: ["Risk Analysis Agent", "Policy Intelligence Agent"],
  },
];

const categories = [
  "All",
  "Customer Data",
  "Financial Data",
  "Unstructured Data",
  "Application Data",
  "Derived Data",
  "Knowledge Data",
  "AI Agent",
  "Human Oversight",
];

export default function KnowledgePage() {
  const [selected, setSelected] = useState("application");
  const [filter, setFilter] = useState("All");

  const activeNode = nodes.find((node) => node.id === selected) || nodes[0];

  const filteredNodes = nodes.filter(
    (node) => filter === "All" || node.category === filter
  );

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 text-slate-800 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Workspace / Knowledge Graph</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Loan Data Knowledge Graph</h1>
            <p className="mt-2 text-sm text-slate-500">
              Explore relationships between applicant data, documents, policies and AI agents.
            </p>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
            Synthetic graph data
          </span>
        </div>

        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            ["10", "Knowledge Nodes"],
            ["9", "Relationship Types"],
            ["3", "AI Agent Nodes"],
          ].map((item) => (
            <div key={item[1]} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-3xl font-bold text-slate-900">{item[0]}</p>
              <p className="mt-1 text-sm text-slate-500">{item[1]}</p>
            </div>
          ))}
        </section>

        <section className="mt-7 grid items-start gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Knowledge Network</h2>
                <p className="mt-1 text-xs text-slate-500">Select any node to inspect its relationships.</p>
              </div>
              <span className="text-xs text-blue-600">Interactive explorer</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                    filter === category
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {filteredNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelected(node.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    selected === node.id
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl">{node.icon}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                      {node.category}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900">{node.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {node.connects.length} connected entities
                  </p>
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-[#142b50] p-6 text-white shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-blue-200">SELECTED NODE</p>
              <div className="mt-5 text-4xl">{activeNode.icon}</div>
              <h2 className="mt-3 text-xl font-bold">{activeNode.name}</h2>
              <p className="mt-2 text-xs text-blue-200">{activeNode.category}</p>
              <p className="mt-5 text-sm leading-6 text-slate-300">{activeNode.details}</p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="font-bold">Connected Entities</h3>
              <p className="mt-1 text-xs text-slate-500">Relationships for the selected node</p>
              <div className="mt-4 space-y-3">
                {activeNode.connects.map((connection) => (
                  <div key={connection} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">{connection}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-xs font-bold text-blue-800">LAKEHOUSE CONCEPT</p>
              <p className="mt-2 text-sm leading-6 text-blue-900">
                Structured application records, unstructured document evidence and
                knowledge-base entries can be brought together to support a unified
                loan assessment.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-7 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">How the data connects</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {[
              ["01", "Data Sources", "Applicant records, documents and policy knowledge"],
              ["02", "Lakehouse", "Unified structured and unstructured data"],
              ["03", "AI Agents", "Verification, policy lookup and risk analysis"],
              ["04", "Human Decision", "Officer reviews evidence and makes the final decision"],
            ].map((step) => (
              <div key={step[0]} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold text-blue-600">{step[0]}</p>
                <p className="mt-2 text-sm font-bold">{step[1]}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{step[2]}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          LoanIQ is an independent demonstration prototype. The graph is illustrative and
          does not represent a live Canara Bank data system.
        </p>
      </div>
    </main>
  );
}
