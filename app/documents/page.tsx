
"use client";

import { useMemo, useRef, useState } from "react";

type DocumentItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  url: string;
  uploaded?: boolean;
};

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    name: "Home Loan Application Checklist",
    category: "Application",
    description: "Applicant identity, income and property document checklist.",
    url: "/documents/01_Home_Loan_Application_Checklist.pdf",
  },
  {
    id: 2,
    name: "Income Assessment Guide",
    category: "Financial",
    description: "Income verification, EMI and FOIR calculations.",
    url: "/documents/02_Income_Assessment_Guide.pdf",
  },
  {
    id: 3,
    name: "Document Verification SOP",
    category: "Verification",
    description: "Document checking, completeness and exception handling.",
    url: "/documents/03_Document_Verification_SOP.pdf",
  },
  {
    id: 4,
    name: "AI Risk Assessment Framework",
    category: "Risk",
    description: "Risk indicators, AI findings and human oversight.",
    url: "/documents/04_AI_Risk_Assessment_Framework.pdf",
  },
  {
    id: 5,
    name: "Loan Processing Workflow",
    category: "Policy",
    description: "Illustrative loan journey from application to disbursement.",
    url: "/documents/05_Loan_Processing_Workflow.pdf",
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<DocumentItem | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const categories = [
    "All",
    "Application",
    "Financial",
    "Verification",
    "Risk",
    "Policy",
    "Uploaded",
  ];

  const filteredDocuments = useMemo(
    () =>
      documents.filter((doc) => {
        const matchesCategory =
          category === "All" ||
          (category === "Uploaded"
            ? doc.uploaded
            : doc.category === category);

        const text =
          `${doc.name} ${doc.description} ${doc.category}`.toLowerCase();

        return matchesCategory && text.includes(search.toLowerCase());
      }),
    [documents, search, category]
  );

  function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(
      (file) => file.type === "application/pdf"
    );

    if (validFiles.length === 0) {
      setUploadMessage("Please select PDF files only.");
      return;
    }

    const uploaded = validFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name.replace(/\.pdf$/i, ""),
      category: "Uploaded",
      description: "PDF uploaded during this browser session.",
      url: URL.createObjectURL(file),
      uploaded: true,
    }));

    setDocuments((old) => [...uploaded, ...old]);
    setUploadMessage(`${uploaded.length} PDF file(s) added successfully.`);
    setCategory("All");

    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-5 text-slate-800 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Workspace / Document Library
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Document Intelligence Library
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Search, inspect and manage loan workflow documents.
            </p>
          </div>

          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
            Demo repository
          </span>
        </div>

        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Documents</p>
            <p className="mt-2 text-3xl font-bold">{documents.length}</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Library PDFs</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {documents.filter((doc) => !doc.uploaded).length}
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Uploaded This Session</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {documents.filter((doc) => doc.uploaded).length}
            </p>
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Document Repository</h2>
              <p className="mt-1 text-sm text-slate-500">
                Browse the five sample PDFs or upload additional documents.
              </p>
            </div>

            <button
              onClick={() => fileInput.current?.click()}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              ↑ Upload PDF
            </button>

            <input
              ref={fileInput}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />
          </div>

          {uploadMessage && (
            <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
              {uploadMessage}
            </p>
          )}

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filteredDocuments.map((doc) => (
              <article
                key={doc.id}
                className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-2xl">
                    📕
                  </span>
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    PDF Available
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  {doc.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {doc.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-md bg-slate-100 px-2 py-1">
                    {doc.category}
                  </span>
                  <span>PDF Document</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setSelected(doc)}
                    className="flex-1 rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Preview PDF
                  </button>
                  <a
                    href={doc.url}
                    download
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    ↓
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <p className="py-12 text-center text-sm text-slate-500">
              No matching documents found.
            </p>
          )}
        </section>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 md:p-6">
            <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between gap-3 border-b p-4">
                <div>
                  <p className="text-xs font-semibold text-blue-600">
                    PDF DOCUMENT PREVIEW
                  </p>
                  <h2 className="mt-1 font-bold">{selected.name}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
                >
                  ×
                </button>
              </div>

              <iframe
                key={selected.url}
                src={selected.url}
                title={selected.name}
                className="min-h-[65vh] w-full flex-1 bg-slate-100"
              />

              <div className="flex justify-end gap-3 border-t p-4">
                <a
                  href={selected.url}
                  download
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg border px-5 py-3 text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          LoanIQ is an independent demonstration prototype. Sample PDFs are
          illustrative and are not official Canara Bank policy documents.
          Additional uploads remain in browser memory during the current session.
        </p>
      </div>
    </main>
  );
}
