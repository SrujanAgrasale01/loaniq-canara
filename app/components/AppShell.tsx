
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Overview", href: "/", icon: "◫" },
  { name: "Loan Applications", href: "/applications", icon: "▤" },
  { name: "Ask & Compare", href: "/ask", icon: "✧" },
  { name: "Knowledge Graph", href: "/knowledge", icon: "◎" },
  { name: "Document Library", href: "/documents", icon: "▧" },
  { name: "AI Agents", href: "/agents", icon: "⌘" },
  { name: "Approach Story", href: "/approach", icon: "◈" },
  { name: "Architecture", href: "/architecture", icon: "⌗" },
  { name: "Deliverables", href: "/deliverables", icon: "▣" },
];

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 md:flex">
      <aside className="w-full border-b border-slate-200 bg-[#101b35] text-white md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex md:w-64 md:flex-col md:border-b-0 md:border-r md:border-slate-800">
        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl font-bold">
              L
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">LoanIQ</h1>
              <p className="text-xs text-slate-400">Canara Bank Edition</p>
            </div>
          </div>
          <div className="mt-4 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
            Independent demo prototype
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col md:overflow-y-auto">
          <p className="hidden px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 md:block">
            Workspace
          </p>

          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  active
                    ? "bg-blue-600 font-semibold text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-white/10 p-4 md:block">
          <p className="text-xs font-medium text-slate-300">
            LoanIQ Demonstration
          </p>
          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            Uses synthetic applicant data and illustrative lending rules.
            Not an official bank service.
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1 md:ml-64">
        {children}
      </div>
    </div>
  );
}
