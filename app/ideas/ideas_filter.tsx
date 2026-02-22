"use client";

import { useState } from "react";

type IdeaRow = {
  id: string;
  title: string;
  description: string;
  problem: string;
  monthly_ask: number;
  status: string;
  created_at: string;
  total_pledged: number;
  pledge_count: number;
};

const STATUS_LABELS: Record<string, string> = {
  proposed: "proposed",
  gaining_traction: "gaining traction",
  threshold_reached: "threshold reached",
  cell_forming: "cell forming",
  active: "active",
  cancelled: "cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  proposed: "text-gray-500 border-gray-700",
  gaining_traction: "text-yellow-600 border-yellow-800",
  threshold_reached: "text-green-500 border-green-700",
  cell_forming: "text-purple-400 border-purple-600",
  active: "text-green-400 border-green-600",
  cancelled: "text-red-800 border-red-900",
};

const SORT_OPTIONS = [
  { value: "pledged", label: "most pledged" },
  { value: "newest", label: "newest" },
  { value: "sponsors", label: "most sponsors" },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export default function IdeasFilter({ ideas }: { ideas: IdeaRow[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("pledged");

  const filtered = ideas
    .filter((idea) => {
      if (statusFilter !== "all" && idea.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          idea.title.toLowerCase().includes(q) ||
          idea.problem.toLowerCase().includes(q) ||
          idea.description.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "pledged") return b.total_pledged - a.total_pledged;
      if (sort === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sort === "sponsors") return b.pledge_count - a.pledge_count;
      return 0;
    });

  // unique statuses present in the data
  const statuses = [...new Set(ideas.map((i) => i.status))];

  return (
    <>
      {/* controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search ideas..."
          className="flex-1 bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none transition-colors"
        />
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
          >
            <option value="all">all statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s] ?? s}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* results */}
      {filtered.length === 0 ? (
        <div className="border border-[#222] rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">
            {search || statusFilter !== "all"
              ? "no ideas match your filters."
              : "no ideas yet. be the first."}
          </p>
          <a
            href="/ideas/new"
            className="text-sm text-red-600 hover:text-red-500 transition-colors"
          >
            submit an idea →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((idea, i) => (
            <a
              key={idea.id}
              href={`/ideas/${idea.id}`}
              className="block border border-[#1e1e1e] rounded-lg p-6 hover:border-[#333] transition-colors group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-red-600 font-bold tabular-nums text-sm shrink-0">
                    #{i + 1}
                  </span>
                  <h2 className="font-semibold group-hover:text-red-400 transition-colors truncate">
                    {idea.title}
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-red-600 tabular-nums">
                    ${idea.total_pledged.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">per month pledged</div>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                {idea.problem}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>
                  <span className="text-gray-400">{idea.pledge_count}</span>{" "}
                  {Number(idea.pledge_count) === 1 ? "sponsor" : "sponsors"}
                </span>
                <span className="text-gray-700">·</span>
                <span>
                  submitter asks{" "}
                  <span className="text-gray-400">${idea.monthly_ask}</span>/mo
                </span>
                <span className="text-gray-700">·</span>
                <span
                  className={`border rounded px-1.5 py-0.5 ${STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-700"}`}
                >
                  {STATUS_LABELS[idea.status] ?? idea.status}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
