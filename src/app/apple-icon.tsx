import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Placeholder apple-touch-icon matching the favicon. */
export default function AppleIcon() {
  const { accent, background } = siteConfig.theme.dark;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          borderRadius: 999,
          border: "16px solid #f4f4ef",
        }}
      >
        <div style={{ width: 32, height: 32, marginRight: -22, marginBottom: -22, borderRadius: 999, background: accent }} />
      </div>
    </div>,
    size,
  );
}
