# Teamboard

Teamboard is a responsive project and task management dashboard. It includes a project overview, a task board, account profile, and shared workspace UI built with React Router and Tailwind CSS.

## Features

- **Dashboard** with summary cards, charts, latest tasks, and activity log.
- **Projects** with status tabs, URL-based filters, search, pagination, bulk actions, and shared create/edit form.
- **Board** with project selection, draggable task columns, list view, task details, and a shared create/edit task form.
- **Profile** showing the current session details and workspace storage usage.
- **Responsive navigation** with a desktop sidebar and mobile tab bar.
- **Branded error pages** for 403, 404, and 500 errors.
- Messages, Calendar, and Team routes currently show a coming-soon page.

Project and task content currently comes from local mock data; there is no backend API. The sample user session is stored in browser local storage.

## Tech stack

- React 19 and React Router 8 Framework Mode
- TypeScript and Vite
- Tailwind CSS 4
- Base UI and shadcn-style components
- TanStack Table, Recharts, Zustand, React Hook Form, and Zod
- dnd-kit for board interactions

## Requirements

- Node.js 24 (used by the deployment workflow; React Router requires a version newer than 22.22.0)
- npm

## Getting started

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run typecheck` | Generate React Router types and run TypeScript checks. |
| `npm run build` | Create a production build in `build/`. |
| `npm run start` | Serve the production build. Run `npm run build` first. |

## Routes

| Path | Page |
| --- | --- |
| `/` | Redirects to Dashboard. |
| `/dashboard` | Workspace overview. |
| `/projects` | Project list and filters. |
| `/board` | Project task board. |
| `/profile` | Current user profile. |
| `/messages` | Coming soon. |
| `/calendar` | Coming soon. |
| `/team` | Coming soon. |
| `/403`, `/404`, `/500` | Branded error pages. |

## GitHub Pages deployment

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds and deploys the static app whenever changes are pushed to `main`. It builds with the `/teamboard/` base path, copies the SPA entry point to `404.html` for direct route access, and uploads `build/client` to GitHub Pages.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. Then check the workflow run under the Actions tab after pushing to `main`.

## Project structure

```text
app/
  components/   Shared UI, layout, dashboard, project, and board components
  hooks/        Reusable React hooks
  lib/          Formatting and general utilities
  mock-data/    Sample dashboard, project, and board data
  routes/       Route modules and page layouts
  stores/       Client-side session state
  type.ts       Shared TypeScript domain types
public/         Static public assets
.github/
  workflows/    GitHub Actions deployment workflow
```
