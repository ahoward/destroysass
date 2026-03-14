import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import type { ROImage } from "./types";

export const PROSE_CLASSES =
  "prose prose-sm dark:prose-invert max-w-none text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-headings:lowercase prose-headings:tracking-tight prose-strong:text-[var(--text-primary)] prose-a:text-red-500 prose-hr:border-[var(--border-primary)] prose-table:text-sm prose-th:text-left prose-th:p-2 prose-td:p-2";

export function ROMarkdown({
  raw,
  images,
  className,
}: {
  raw: string;
  images?: Record<string, ROImage>;
  className?: string;
}) {
  return (
    <div className={className ?? PROSE_CLASSES}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: (props) => {
            const src = typeof props.src === "string" ? props.src : undefined;
            const alt = typeof props.alt === "string" ? props.alt : "";
            const info = src ? images?.[src] : undefined;

            if (info && info.width > 0 && info.height > 0) {
              return (
                <Image
                  src={info.src}
                  alt={alt}
                  width={info.width}
                  height={info.height}
                />
              );
            }

            return <img src={src} alt={alt} />;
          },
        }}
      >
        {raw}
      </ReactMarkdown>
    </div>
  );
}
