import { isRouteErrorResponse, Outlet } from "react-router";

import type { Route } from "./+types/root";
import { RootLayout } from "./components/layout/root-layout";
import { ErrorPage, type ErrorStatus } from "./components/shared/error-page";
import stylesheetUrl from "./app.css?url";

export function links() {
  return [{ rel: "stylesheet", href: stylesheetUrl }];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="page-content flex min-h-[calc(100vh-44px)] items-center justify-center">
      <p className="font-mono text-xs font-bold">Loading Teamboard…</p>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const status = getErrorStatus(error);
  return <ErrorPage status={status} />;
}

function getErrorStatus(error: unknown): ErrorStatus {
  if (!isRouteErrorResponse(error)) return 500;
  if (error.status === 403) return 403;
  if (error.status === 404) return 404;
  return 500;
}
