import type { SyntheticEvent } from "react";

// Neutral gradient shown if any image fails to load, so no broken icon appears.
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A1A1D"/><stop offset="1" stop-color="#3a3a40"/></linearGradient></defs><rect width="16" height="10" fill="url(#g)"/></svg>`,
  );

export function imgFallback(e: SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget;
  if (t.dataset["fallback"]) return;
  t.dataset["fallback"] = "1";
  t.src = FALLBACK;
}
