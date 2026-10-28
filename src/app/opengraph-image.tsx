import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}, ${siteConfig.jobTitle} in ${siteConfig.location.city}, ${siteConfig.location.country}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const muted = "rgba(244, 244, 239, 0.62)";

export default function OpengraphImage() {
  const { accent, background } = siteConfig.theme.dark;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: `radial-gradient(circle at 88% 18%, ${accent}33, transparent 42%), ${background}`,
        color: "#f4f4ef",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 4, color: muted }}>
        <div style={{ width: 14, height: 14, borderRadius: 999, background: accent }} />
        OPEN TO WORK
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 1, letterSpacing: -6 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 20, fontSize: 48, color: muted }}>
          {`${siteConfig.jobTitle}, ${siteConfig.location.city}`}
        </div>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {["React", "Next.js", "TypeScript"].map((tech) => (
          <div
            key={tech}
            style={{
              display: "flex",
              padding: "10px 24px",
              borderRadius: 999,
              border: "2px solid rgba(244, 244, 239, 0.25)",
              fontSize: 26,
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
