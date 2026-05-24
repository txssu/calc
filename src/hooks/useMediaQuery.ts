// SPDX-FileCopyrightText: 2026 Eugene Fisher <z.ribin20@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useState } from "react";

const supportsMatchMedia = (): boolean =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";

const readInitial = (query: string): boolean =>
  supportsMatchMedia() ? window.matchMedia(query).matches : false;

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => readInitial(query));

  useEffect(() => {
    if (!supportsMatchMedia()) return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
