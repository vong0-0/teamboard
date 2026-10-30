import type { Route } from "./+types/403";
import { ErrorPage } from "~/components/shared/error-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "403 · Access denied | Teamboard" },
    {
      name: "description",
      content: "You don’t have permission to view this page.",
    },
  ];
}

export default function Forbidden() {
  return <ErrorPage status={403} />;
}
