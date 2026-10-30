import type { ReactNode } from "react";
import { HardDrive, Mail, ShieldCheck, UserRound } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { SidebarTrigger } from "~/components/layout/sidebar-trigger";
import { Topbar } from "~/components/layout/topbar";
import { PageHeader } from "~/components/shared/page-header";
import { Track } from "~/components/shared/track";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { getAvatarFallback } from "~/lib/get-avatar-fallback";
import { useSession, useSessionHydrated } from "~/stores/session-store";

export default function ProfilePage() {
  const session = useSession();
  const sessionHydrated = useSessionHydrated();
  const name = session?.name ?? "Your profile";
  const storageUsed = session?.storageUsedGB ?? 0;
  const storageLimit = session?.storageLimitGB ?? 0;
  return (
    <>
      <Topbar
        left={
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        right={<SidebarTrigger />}
      />
      <div className="page-content">
        <PageHeader eyebrow="YOUR ACCOUNT" title="Profile" />

        <div className="mt-7 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
          <section className="window min-w-0">
            <WindowBar title="profile.account" />
            <div className="bg-paper p-5 sm:p-7">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <Avatar className="border-ink size-16 rounded-md border-2 bg-gray-100 sm:size-20">
                  <AvatarFallback className="font-display rounded-none bg-gray-100 text-xl font-bold text-ink sm:text-2xl">
                    {sessionHydrated ? getAvatarFallback(name) : "…"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h2 className="font-display truncate text-2xl leading-tight font-bold sm:text-3xl">
                    {sessionHydrated ? name : "Loading profile…"}
                  </h2>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {sessionHydrated ? (session?.role ?? "Team member") : " "}
                  </p>
                  <span className="border-ink bg-ok mt-2 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[10px] leading-none font-bold uppercase">
                    <span className="size-1.5 rounded-full bg-ink" />
                    {session?.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              <div className="border-ink mt-7 grid gap-4 border-t-2 pt-5 sm:grid-cols-2">
                <ProfileDetail
                  icon={<UserRound aria-hidden="true" className="size-4" />}
                  label="FULL NAME"
                  value={sessionHydrated ? (session?.name ?? "—") : "Loading…"}
                />
                <ProfileDetail
                  icon={<Mail aria-hidden="true" className="size-4" />}
                  label="EMAIL ADDRESS"
                  value={sessionHydrated ? (session?.email ?? "—") : "Loading…"}
                />
                <ProfileDetail
                  icon={<ShieldCheck aria-hidden="true" className="size-4" />}
                  label="ROLE"
                  value={sessionHydrated ? (session?.role ?? "Team member") : "Loading…"}
                />
                <ProfileDetail
                  icon={<UserRound aria-hidden="true" className="size-4" />}
                  label="MEMBER ID"
                  value={sessionHydrated ? (session?.id ?? "—") : "Loading…"}
                  mono
                />
              </div>
            </div>
          </section>

          <section className="window min-w-0">
            <WindowBar title="profile.storage" />
            <div className="bg-paper p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] font-bold text-gray-500">
                    WORKSPACE STORAGE
                  </p>
                  <p className="font-display mt-2 text-3xl font-bold">
                    {sessionHydrated ? `${storageUsed} GB` : "—"}
                    <span className="ml-1 text-base font-medium text-gray-500">
                      / {sessionHydrated ? `${storageLimit} GB` : "—"}
                    </span>
                  </p>
                </div>
                <span className="border-ink bg-accent shadow-hard-sm grid size-10 shrink-0 place-items-center rounded-sm border-2">
                  <HardDrive aria-hidden="true" className="size-5" />
                </span>
              </div>
              <div className="mt-5">
                <Track
                  value={storageUsed}
                  max={storageLimit}
                  label="Workspace storage used"
                />
                <p className="mt-2 text-xs text-gray-500">
                  {sessionHydrated
                    ? `${Math.max(storageLimit - storageUsed, 0)} GB available`
                    : " "}
                </p>
              </div>
              <div className="border-ink mt-6 border-t-2 pt-4">
                <p className="text-sm leading-relaxed text-gray-500">
                  Storage is shared across your workspace files and project attachments.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function WindowBar({ title }: { title: string }) {
  return (
    <div className="window-bar relative justify-center">
      <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
        <i className="border-ink size-1.5 rounded-full border" />
        <i className="border-ink size-1.5 rounded-full border" />
      </span>
      <span>{title}</span>
    </div>
  );
}

function ProfileDetail({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="border-ink mt-0.5 grid size-8 shrink-0 place-items-center rounded-sm border-2 bg-gray-100">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-bold text-gray-500">{label}</p>
        <p className={`mt-1 break-words text-sm font-semibold ${mono ? "font-mono" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
