import { Construction } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { PageHeader } from "~/components/shared/page-header";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import { Topbar } from "~/components/layout/topbar";

type ComingSoonPageProps = {
  title: string;
  windowTitle: string;
};

export function ComingSoonPage({ title, windowTitle }: ComingSoonPageProps) {
  return (
    <>
      <Topbar
        left={
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        right={<SidebarTrigger />}
      />
      <div className="page-content">
        <PageHeader title={title} />
        <section className="window mt-8 w-full">
          <div className="window-bar relative justify-center">
            <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
              <i className="border-ink size-1.5 rounded-full border" />
              <i className="border-ink size-1.5 rounded-full border" />
            </span>
            <span>{windowTitle}</span>
          </div>
          <div className="bg-paper flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
            <span className="border-ink bg-warn text-ink shadow-hard-sm mb-4 flex size-12 items-center justify-center rounded-sm border-2">
              <Construction aria-hidden="true" className="size-6" />
            </span>
            <h2 className="font-display text-xl leading-tight font-bold">
              Coming back soon
            </h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              We’re working on {title.toLowerCase()}. Check back soon.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
