// SPDX-FileCopyrightText: 2026 Eugene Fisher <z.ribin20@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {
  "use strict";

  const display = document.getElementById("display");
  const history = document.getElementById("history");
  const keys = document.querySelector('[role="group"][aria-label="Keypad"]');
  const paywall = document.getElementById("paywall");

  const state = {
    current: "0",
    previous: null,
    operator: null,
    justEvaluated: false,
    overwrite: false,
  };

  const MAX_LEN = 14;

  const format = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (!Number.isFinite(value)) return "Error";

    const abs = Math.abs(value);
    if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) {
      return value.toExponential(6).replace(/\.?0+e/, "e");
    }

    const rounded = Math.round(value * 1e10) / 1e10;
    const s = String(rounded);
    if (s.length <= MAX_LEN) return s;
    return rounded.toPrecision(10).replace(/\.?0+$/, "");
  };

  const OP_SYMBOL = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  const render = () => {
    display.textContent = state.current;

    if (state.previous !== null && state.operator) {
      history.textContent = `${format(state.previous)} ${OP_SYMBOL[state.operator]}`;
    } else {
      history.innerHTML = "&nbsp;";
    }

    document.querySelectorAll(".key--op").forEach((btn) => {
      btn.classList.toggle(
        "is-armed",
        !!state.operator &&
          btn.dataset.op === state.operator &&
          state.overwrite
      );
    });
  };

  const inputDigit = (d) => {
    if (state.overwrite || state.justEvaluated) {
      state.current = d;
      state.overwrite = false;
      state.justEvaluated = false;
      return;
    }
    if (state.current === "0") {
      state.current = d;
    } else if (state.current.replace(/[-.]/g, "").length < MAX_LEN) {
      state.current += d;
    }
  };

  const inputDot = () => {
    if (state.overwrite || state.justEvaluated) {
      state.current = "0.";
      state.overwrite = false;
      state.justEvaluated = false;
      return;
    }
    if (!state.current.includes(".")) {
      state.current += ".";
    }
  };

  const clearAll = () => {
    state.current = "0";
    state.previous = null;
    state.operator = null;
    state.justEvaluated = false;
    state.overwrite = false;
  };

  const toggleSign = () => {
    if (state.current === "0") return;
    state.current = state.current.startsWith("-")
      ? state.current.slice(1)
      : "-" + state.current;
  };

  const percent = () => {
    const n = parseFloat(state.current);
    if (!Number.isFinite(n)) return;
    state.current = format(n / 100);
  };

  const compute = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const setOperator = (op) => {
    const currentNum = parseFloat(state.current);

    if (state.previous !== null && state.operator && !state.overwrite) {
      const result = compute(state.previous, currentNum, state.operator);
      state.previous = result;
      state.current = format(result);
    } else {
      state.previous = currentNum;
    }

    state.operator = op;
    state.overwrite = true;
    state.justEvaluated = false;
  };

  const LOCKED = "•••";

  const equals = () => {
    if (state.previous === null || state.operator === null) return;
    state.current = LOCKED;
    state.previous = null;
    state.operator = null;
    state.overwrite = false;
    state.justEvaluated = true;
  };

  /* -------- Paywall -------- */
  const openPaywall = () => {
    if (!paywall.classList.contains("hidden")) return;
    paywall.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    const firstCta = paywall.querySelector("[data-plan]");
    if (firstCta) firstCta.focus({ preventScroll: true });
  };

  const toast = (text) => {
    const el = document.createElement("div");
    el.className =
      "fixed left-1/2 bottom-8 -translate-x-1/2 translate-y-3 " +
      "px-4 py-2.5 rounded-full bg-ink-800 border border-zinc-800 " +
      "text-sm text-zinc-100 shadow-monolith opacity-0 z-[60] " +
      "transition-all duration-200 pointer-events-none";
    el.textContent = text;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.classList.remove("opacity-0", "translate-y-3");
      el.classList.add("opacity-100", "translate-y-0");
    });
    setTimeout(() => {
      el.classList.add("opacity-0");
      setTimeout(() => el.remove(), 250);
    }, 2600);
  };

  /* -------- Events -------- */
  keys.addEventListener("click", (e) => {
    const target = e.target.closest("button.key");
    if (!target) return;

    if (target.dataset.num !== undefined) {
      inputDigit(target.dataset.num);
    } else if (target.dataset.op !== undefined) {
      setOperator(target.dataset.op);
    } else {
      const action = target.dataset.action;
      switch (action) {
        case "clear": clearAll(); break;
        case "sign": toggleSign(); break;
        case "percent": percent(); break;
        case "dot": inputDot(); break;
        case "equals":
          equals();
          render();
          openPaywall();
          return;
      }
    }
    render();
  });

  paywall.addEventListener("click", (e) => {
    const target = e.target.closest("[data-plan]");
    if (!target) return;
    toast("Payment processor is temporarily unavailable.");
  });

  document.addEventListener("keydown", (e) => {
    if (!paywall.classList.contains("hidden")) return;

    if (/^[0-9]$/.test(e.key)) {
      inputDigit(e.key);
      render();
    } else if (e.key === ".") {
      inputDot();
      render();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
      setOperator(e.key);
      render();
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      equals();
      render();
      openPaywall();
    } else if (e.key === "Backspace") {
      if (state.overwrite || state.justEvaluated) {
        clearAll();
      } else if (state.current.length > 1) {
        state.current = state.current.slice(0, -1);
        if (state.current === "-") state.current = "0";
      } else {
        state.current = "0";
      }
      render();
    } else if (e.key.toLowerCase() === "c" || e.key === "Escape") {
      clearAll();
      render();
    } else if (e.key === "%") {
      percent();
      render();
    }
  });

  render();
})();
