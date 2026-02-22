"use client";

import { useState, useTransition } from "react";
import { approveDevCell, rejectDevCell } from "./actions";

type Props = {
  cellId: string;
};

export default function DevCellReviewButton({ cellId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ error?: string; success?: boolean; action?: string } | null>(null);

  function handleApprove() {
    startTransition(async () => {
      const res = await approveDevCell(cellId);
      setResult(res ? { ...res, action: "approved" } : { success: true, action: "approved" });
    });
  }

  function handleReject() {
    startTransition(async () => {
      const res = await rejectDevCell(cellId);
      setResult(res ? { ...res, action: "rejected" } : { success: true, action: "rejected" });
    });
  }

  if (result?.success) {
    const color = result.action === "approved" ? "text-green-400" : "text-red-400";
    return <span className={`text-xs ${color}`}>{result.action}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleApprove}
        disabled={isPending}
        className="text-xs bg-green-900 hover:bg-green-800 border border-green-700 text-green-200 rounded px-2.5 py-1 transition-colors disabled:opacity-50"
      >
        {isPending ? "..." : "approve"}
      </button>
      <button
        onClick={handleReject}
        disabled={isPending}
        className="text-xs bg-red-900 hover:bg-red-800 border border-red-700 text-red-200 rounded px-2.5 py-1 transition-colors disabled:opacity-50"
      >
        {isPending ? "..." : "reject"}
      </button>
      {result?.error && (
        <span className="text-xs text-red-400">{result.error}</span>
      )}
    </div>
  );
}
