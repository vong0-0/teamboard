import { Button } from "~/components/ui/button";

export function ProjectsHeader({
  onCreateProject,
}: {
  onCreateProject: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-display min-w-0 text-[44px] leading-[100%] font-black tracking-[-3%]">
        Projects
      </h2>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          className="border-ink bg-paper text-ink shadow-hard-sm hover:text-paper hover:bg-ok rounded-sm border-2 px-5 py-2.5 text-[14px] transition-all duration-200"
        >
          Import CSV
        </Button>
        <Button
          type="button"
          onClick={onCreateProject}
          className="border-ink bg-ink text-paper shadow-hard-sm hover:text-ink rounded-sm border-2 px-5 py-2.5 text-[14px] transition-all duration-200 hover:bg-transparent"
        >
          + New project
        </Button>
      </div>
    </div>
  );
}
