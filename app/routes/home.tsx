import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="font-display text-3xl font-bold">Bricolage Grotesque</div>
      <div className="font-mono text-3xl font-bold">Bricolage Grotesque</div>
      <div className="font-sans text-3xl font-bold">Bricolage Grotesque</div>
    </>
  );
}
