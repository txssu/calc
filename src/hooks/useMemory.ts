// SPDX-FileCopyrightText: 2026 Eugene Fisher <z.ribin20@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "calc.memory";

const loadInitial = (): number | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
};

export type MemoryApi = {
  value: number | null;
  isEmpty: boolean;
  add: (n: number) => void;
  subtract: (n: number) => void;
  recall: () => number | null;
  clear: () => void;
};

export const useMemory = (): MemoryApi => {
  const [value, setValue] = useState<number | null>(() => loadInitial());

  useEffect(() => {
    try {
      if (value === null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      /* ignore */
    }
  }, [value]);

  const add = useCallback((n: number) => {
    if (!Number.isFinite(n)) return;
    setValue((prev) => (prev ?? 0) + n);
  }, []);

  const subtract = useCallback((n: number) => {
    if (!Number.isFinite(n)) return;
    setValue((prev) => (prev ?? 0) - n);
  }, []);

  const recall = useCallback(() => value, [value]);

  const clear = useCallback(() => setValue(null), []);

  return { value, isEmpty: value === null, add, subtract, recall, clear };
};
