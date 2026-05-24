// SPDX-FileCopyrightText: 2026 Eugene Fisher <z.ribin20@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    target: "es2022",
    sourcemap: false,
  },
});
