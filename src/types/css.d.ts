import "react";

declare module "react" {
  interface CSSProperties {
    /** Allow CSS custom properties in style props. */
    [key: `--${string}`]: string | number | undefined;
  }
}
