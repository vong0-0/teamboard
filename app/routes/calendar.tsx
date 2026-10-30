import type { Route } from "./+types/calendar";
import { ComingSoonPage } from "~/components/shared/coming-soon-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Calendar | Teamboard" },
    { name: "description", content: "Teamboard calendar is coming soon." },
  ];
}

export default function Calendar() {
  return <ComingSoonPage title="Calendar" windowTitle="calendar.schedule" />;
}
