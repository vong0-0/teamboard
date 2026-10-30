import type { Route } from "./+types/404";
import { ErrorPage } from "~/components/shared/error-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 · Page not found | Teamboard" },
    {
      name: "description",
      content: "The page you’re looking for wasn’t found.",
    },
  ];
}

export default function NotFound() {
  return <ErrorPage status={404} />;
}
