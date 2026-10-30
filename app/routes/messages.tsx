import type { Route } from "./+types/messages";
import { ComingSoonPage } from "~/components/shared/coming-soon-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Messages | Teamboard" },
    { name: "description", content: "Teamboard messages are coming soon." },
  ];
}

export default function Messages() {
  return <ComingSoonPage title="Messages" windowTitle="messages.inbox" />;
}
