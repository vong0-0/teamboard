import { Button } from "~/components/ui/button";
import { PageHeader } from "~/components/shared/page-header";

export function ProjectsHeader({
  onCreateProject,
}: {
  onCreateProject: () => void;
}) {
  return (
    <PageHeader
      title="Projects"
      actions={
        <>
          <Button
            variant="outline"
            className="border-ink bg-paper text-ink shadow-hard-sm hover:text-paper hover:bg-ok min-w-0 flex-1 rounded-sm border-2 px-2 py-2 text-xs whitespace-nowrap transition-all duration-200 sm:flex-none sm:px-5 sm:py-2.5 sm:text-[14px]"
          >
            Import CSV
          </Button>
          <Button
            type="button"
            onClick={onCreateProject}
            className="border-ink bg-ink text-paper shadow-hard-sm hover:text-ink min-w-0 flex-1 rounded-sm border-2 px-2 py-2 text-xs whitespace-nowrap transition-all duration-200 hover:bg-transparent sm:flex-none sm:px-5 sm:py-2.5 sm:text-[14px]"
          >
            + New project
          </Button>
        </>
      }
    />
  );
}
