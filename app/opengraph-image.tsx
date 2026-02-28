import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "destroysaas — own the software you use";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#dc2626",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 32,
            letterSpacing: "-0.02em",
          }}
        >
          destroysaas
        </div>
        <div
          style={{
            color: "#f0f0f0",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          the place where small businesses
          <br />
          <span style={{ color: "#dc2626" }}>stop renting software</span>
          <br />
          and start owning it.
        </div>
        <div
          style={{
            color: "#737373",
            fontSize: 24,
            marginTop: 16,
          }}
        >
          destroysaas.coop
        </div>
      </div>
    ),
    { ...size }
  );
}
