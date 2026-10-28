import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Placeholder favicon: a ring with an accent dot. Replace with a real mark when you have one. */
export default function Icon() {
  const { accent, background } = siteConfig.theme.dark;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        background,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          borderRadius: 999,
          border: "7px solid #f4f4ef",
        }}
      >
        <div style={{ width: 14, height: 14, marginRight: -10, marginBottom: -10, borderRadius: 999, background: accent }} />
      </div>
    </div>,
    size,
  );
}
