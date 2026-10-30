import type { Route } from "./+types/team";
import { ComingSoonPage } from "~/components/shared/coming-soon-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Team | Teamboard" },
    { name: "description", content: "Teamboard team tools are coming soon." },
  ];
}

export default function Team() {
  return <ComingSoonPage title="Team" windowTitle="team.members" />;
}
