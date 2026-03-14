import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const roDir = path.join(process.cwd(), "public/ro");

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const push = (data: string) => {
        try {
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch {
          // stream closed
        }
      };

      // heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          clearInterval(heartbeat);
        }
      }, 30000);

      let watcher: fs.FSWatcher | null = null;

      try {
        watcher = fs.watch(roDir, { recursive: true }, (_event, filename) => {
          if (filename) {
            push(JSON.stringify({ path: String(filename) }));
          }
        });
      } catch {
        // fs.watch may not be supported
      }

      // cleanup when client disconnects
      const cleanup = () => {
        clearInterval(heartbeat);
        watcher?.close();
      };

      // register cleanup — ReadableStream cancel is called on disconnect
      (controller as unknown as { _cleanup?: () => void })._cleanup = cleanup;
    },

    cancel() {
      // called when client disconnects
      (this as unknown as { _cleanup?: () => void })._cleanup?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
