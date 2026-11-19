
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6 text-slate-800 md:p-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-slate-500">Workspace / Contact</p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Contact LoanIQ
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Have feedback or questions about the LoanIQ demonstration?
          Use the form below to prepare your message.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <section className="rounded-2xl bg-[#142b50] p-7 text-white lg:col-span-2">
            <p className="text-xs font-semibold tracking-widest text-blue-200">
              LOANIQ
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              Let's connect
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              LoanIQ is an independent home loan workflow demonstration
              exploring connected data, specialized agents and
              human-supervised lending decisions.
            </p>

            <div className="mt-8 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold">Project</p>
              <p className="mt-2 text-sm text-slate-300">
                AI-assisted Home Loan Approval Workflow
              </p>

              <p className="mt-5 text-sm font-semibold">Technology</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Next.js · TypeScript · Tailwind CSS · Google BigQuery
              </p>

              <p className="mt-5 text-sm font-semibold">Prototype status</p>
              <p className="mt-2 text-sm text-slate-300">
                Independent demonstration · 2026
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-bold">Send a Message</h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill in the details below.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="font-bold text-green-800">
                  Message prepared successfully
                </h3>
                <p className="mt-2 text-sm leading-6 text-green-700">
                  This is a frontend demonstration. Your message has
                  not been sent to an email address or external service.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  Prepare another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <label className="block text-sm font-medium">
                  Your Name
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Email Address
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Message
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Submit Demonstration Form
                </button>

                <p className="text-xs leading-5 text-slate-400">
                  Demo only. Form entries are not stored or transmitted.
                </p>
              </form>
            )}
          </section>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          LoanIQ · Independent Demonstration Prototype · 2026
        </p>
      </div>
    </main>
  );
}
