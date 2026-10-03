# Keploy quickstart guide

A hands-on guide to recording and replaying your first API tests with Keploy, using a Go URL shortener built with Echo and PostgreSQL.

The tutorial follows my Linux quickstart experience, including the details that differed on my setup: Docker Compose syntax, a shifted line number, existing recordings, and curl's quiet redirect response. It explains what Keploy captures and why replay is useful, alongside the commands to try it yourself.

## The page

- Six numbered steps with highlighted, copyable commands and terminal labels.
- Personal observations separated from instructions and optional tips.
- Expandable troubleshooting and installation help, with environment tabs for Docker.
- Responsive navigation, reading progress, and light/dark mode.

Built with **Next.js App Router, MDX, TypeScript, Tailwind CSS, and shadcn/ui**. Shiki highlights code, next-themes handles the theme toggle, and fonts are bundled locally.

## Run locally

You'll need Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

Go, Docker, PostgreSQL, and Keploy are needed to follow the tutorial's exercises; they aren't needed to run this website. The page requires no environment variables or backend service.

## Check and build

```sh
npm run typecheck
npm run build
```

The type check generates Next.js route types before running TypeScript. The build exports the static website to `out/`, using `output: "export"` in `next.config.mjs`.

## Deploy to Vercel

Once the source is published to GitHub:

1. Import the repository into Vercel.
2. Keep the detected **Next.js** framework preset and its default build settings, using this project directory as the root.
3. Deploy. No environment variables are required.

See [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) for the platform's deployment guide. Dependencies and build output are excluded from the repository by `.gitignore`; Vercel installs dependencies and builds the page from source.

## Edit the guide

| Location | Purpose |
| --- | --- |
| `app/page.mdx` | Tutorial content, code examples, and embedded React components |
| `mdx-components.tsx` | Markdown mappings for headings, personal notes, and code blocks |
| `components/` | Tutorial layout, navigation, themes, and copy controls |
| `components/ui/` | shadcn/ui buttons, accordions, and tabs |
| `app/globals.css` | Typography, colors, and responsive styling |
| `public/` | Static assets |

`app/page.mdx` is the source of truth for the tutorial. Keep `package-lock.json` with the source so installations remain reproducible.

## Reference

Based on [Keploy's official Echo + PostgreSQL quickstart](https://keploy.io/docs/quickstart/samples-echo/#running-app-locally-on-linuxwsl-), with original explanations and observations from my run. Supporting references appear beside the relevant tutorial steps.
