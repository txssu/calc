<!--
SPDX-FileCopyrightText: 2026 Eugene Fisher <z.ribin20@gmail.com>
SPDX-License-Identifier: AGPL-3.0-or-later
-->

# Calc

A minimal calculator with subscription plans, deployed to
[calc.txssu.dev](https://calc.txssu.dev) via GitHub Pages.

## Local development

The project is a static site with no build step. Open `index.html` directly,
or serve the directory with any static HTTP server:

```sh
python3 -m http.server 8080
# http://localhost:8080
```

## Tech stack

- Static HTML and vanilla JavaScript
- Tailwind CSS via the Play CDN
- GitHub Actions for deployment
- GitHub Pages with a custom domain

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which publishes the
repository contents to GitHub Pages. The custom domain `calc.txssu.dev` is
configured via the `CNAME` file at the repository root.

### One-time setup

1. In **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Add a DNS `CNAME` record pointing `calc.txssu.dev` to `<owner>.github.io`.
3. After the certificate is provisioned, enable **Enforce HTTPS** in
   **Settings → Pages**.

## License

Licensed under [AGPL-3.0-or-later](LICENSES/AGPL-3.0-or-later.txt).

The repository is [REUSE](https://reuse.software/) compliant: every file
declares its copyright and license either inline (via `SPDX-FileCopyrightText`
and `SPDX-License-Identifier` headers) or through `REUSE.toml`. Compliance
is verified on every push by `.github/workflows/reuse.yml`.
