"use client";

/**
 * A script that runs while the HTML is parsed, before first paint. When React renders it on
 * the client it is marked text/plain, so React doesn't warn about a script it won't execute.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
