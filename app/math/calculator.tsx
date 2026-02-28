"use client";

import { useState } from "react";

type Tool = { name: string; cost: string };

const INITIAL_TOOLS: Tool[] = [
  { name: "CRM", cost: "100" },
  { name: "project management", cost: "50" },
  { name: "invoicing / bookkeeping", cost: "50" },
];

const COLLECTIVE_COST = 50; // $/month per business per collective

const input_classes =
  "w-full rounded border bg-[var(--bg-input)] border-[var(--border-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors";

export default function Calculator() {
  const [tools, setTools] = useState<Tool[]>(INITIAL_TOOLS);

  const monthly = tools.reduce((sum, t) => sum + (Number(t.cost) || 0), 0);
  const annual = monthly * 12;
  const decade = monthly * 12 * 10;

  const toolCount = tools.filter((t) => (Number(t.cost) || 0) > 0).length;
  const dsMonthly = toolCount * COLLECTIVE_COST;
  const dsDecade = dsMonthly * 12 * 10;
  const savings = decade - dsDecade;

  function updateTool(index: number, field: keyof Tool, value: string) {
    setTools((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  }

  function removeTool(index: number) {
    setTools((prev) => prev.filter((_, i) => i !== index));
  }

  function addTool() {
    setTools((prev) => [...prev, { name: "", cost: "" }]);
  }

  return (
    <div className="space-y-6">
      {/* tool inputs */}
      <div className="space-y-3">
        {tools.map((tool, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="tool name"
              value={tool.name}
              onChange={(e) => updateTool(i, "name", e.target.value)}
              className={`${input_classes} flex-1`}
            />
            <div className="relative shrink-0 w-28">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">
                $
              </span>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={tool.cost}
                onChange={(e) => updateTool(i, "cost", e.target.value)}
                className={`${input_classes} pl-7 text-right`}
              />
            </div>
            <span className="text-xs text-[var(--text-faint)] shrink-0 w-8">
              /mo
            </span>
            {tools.length > 1 && (
              <button
                type="button"
                onClick={() => removeTool(i)}
                className="text-[var(--text-faint)] hover:text-red-600 transition-colors text-lg leading-none shrink-0"
                aria-label="remove tool"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addTool}
        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        + add another tool
      </button>

      {/* results */}
      {monthly > 0 && (
        <div className="border border-[var(--border-primary)] rounded-lg overflow-hidden">
          {/* saas side */}
          <div className="p-5 border-b border-[var(--border-primary)]">
            <p className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-3">
              what you&apos;re paying now (saas)
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                  ${monthly.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  per month
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                  ${annual.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  per year
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600 tabular-nums">
                  ${decade.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  over 10 years
                </p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-faint)] text-center mt-3">
              0 shares. 0 votes. 0 ownership. they can raise prices any time.
            </p>
          </div>

          {/* destroysaas side */}
          <div className="p-5 border-b border-[var(--border-primary)]">
            <p className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-3">
              with destroysaas
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                  ${dsMonthly.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  per month
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                  co-own {toolCount}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  cooperative{toolCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600 tabular-nums">
                  ${dsDecade.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  over 10 years
                </p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-faint)] text-center mt-3">
              equity shares. voting rights. open-source code. legal standing. fork freedom.
            </p>
          </div>

          {/* savings */}
          {savings > 0 && (
            <div className="p-5 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                10-year savings
              </p>
              <p className="text-3xl font-bold text-green-600 tabular-nums mt-1">
                ${savings.toLocaleString()}
              </p>
              <p className="text-sm text-[var(--text-primary)] font-medium mt-2">
                &hellip;and you actually own something at the end.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
