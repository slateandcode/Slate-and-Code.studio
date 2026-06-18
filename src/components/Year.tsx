"use client";

import { useEffect, useState } from "react";

/**
 * Renders the current year on the client. Every route is statically
 * prerendered, so a plain `new Date().getFullYear()` in a Server Component
 * would freeze at build time. Starting from the launch year keeps the
 * server and first client render identical (no hydration mismatch), then
 * the effect corrects it once a new year rolls over.
 */
export default function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
