"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import type { ROPage } from "./types";

interface ROProps {
  path: string;
  initial: ROPage;
  children: (page: ROPage) => ReactNode;
}

export function RO({ path, initial, children }: ROProps) {
  const [page, setPage] = useState<ROPage>(initial);

  const refetch = useCallback(async () => {
    try {
      const res = await fetch(`/api/ro/${path}`);
      if (!res.ok) return;
      const data: ROPage = await res.json();
      if (data._meta.built_at !== page._meta.built_at) {
        setPage(data);
      }
    } catch {
      // silently fail — content stays as-is
    }
  }, [path, page._meta.built_at]);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      // SSE hot reload in dev
      const es = new EventSource("/api/ro/__events");

      es.onmessage = (e) => {
        try {
          const { path: changedPath } = JSON.parse(e.data);
          // check if the changed file is relevant to this page's slug
          if (typeof changedPath === "string" && changedPath.includes(path.replace(/\//g, "/"))) {
            refetch();
          }
        } catch {
          // malformed event, skip
        }
      };

      return () => es.close();
    } else {
      // production: refetch on tab refocus
      const onVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          refetch();
        }
      };

      document.addEventListener("visibilitychange", onVisibilityChange);
      return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }
  }, [path, refetch]);

  return <>{children(page)}</>;
}
