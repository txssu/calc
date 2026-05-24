// SPDX-FileCopyrightText: 2026 Eugene Fisher <z.ribin20@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Calculator } from "./components/Calculator.tsx";
import { LanguageSwitcher } from "./components/LanguageSwitcher.tsx";
import { Paywall } from "./components/Paywall.tsx";
import { useCalculator } from "./hooks/useCalculator.ts";

const App = () => {
  const calc = useCalculator();

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10
                   bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgb(6_182_212_/_0.08),transparent_60%)]"
      />

      <LanguageSwitcher />

      <main className="min-h-screen flex flex-col items-center px-6 py-12 gap-10">
        <header className="flex items-center gap-3 text-sm">
          <span className="font-mono text-accent">[</span>
          <span className="font-mono tracking-tight text-zinc-100">calc</span>
          <span className="font-mono text-accent">]</span>
          <span
            className="ml-2 px-2 py-0.5 rounded-full border border-zinc-800
                       text-[10px] uppercase tracking-[0.12em] text-zinc-500 font-mono"
          >
            v1.0.0
          </span>
        </header>

        <Calculator calc={calc} />
      </main>

      {calc.isLocked && <Paywall />}
    </>
  );
};

export default App;
