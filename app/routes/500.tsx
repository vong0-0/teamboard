import type { Route } from "./+types/500";
import { ErrorPage } from "~/components/shared/error-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "500 · Server error | Teamboard" },
    {
      name: "description",
      content: "Teamboard encountered an unexpected error.",
    },
  ];
}

export default function ServerError() {
  return <ErrorPage status={500} />;
}
