import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Teamboard" },
    { name: "description", content: "Your Teamboard dashboard." },
  ];
}

export default function Dashboard() {
  return (
    <>
      <div className="font-display text-3xl font-bold">Bricolage Grotesque</div>
      <div className="font-mono text-3xl font-bold">Bricolage Grotesque</div>
      <div className="font-sans text-3xl font-bold">Bricolage Grotesque</div>
    </>
  );
}
