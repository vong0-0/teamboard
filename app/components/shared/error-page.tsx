import {
  FileQuestion,
  ShieldAlert,
  ServerCrash,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router";

export type ErrorStatus = 403 | 404 | 500;

const errorContent: Record<
  ErrorStatus,
  { title: string; message: string; icon: LucideIcon; code: string }
> = {
  403: {
    title: "Access denied",
    message: "You don’t have permission to view this page.",
    icon: ShieldAlert,
    code: "FORBIDDEN",
  },
  404: {
    title: "Page not found",
    message: "The page you’re looking for doesn’t exist or may have moved.",
    icon: FileQuestion,
    code: "NOT FOUND",
  },
  500: {
    title: "Something went wrong",
    message: "We hit an unexpected error. Please try again in a moment.",
    icon: ServerCrash,
    code: "SERVER ERROR",
  },
};

export function ErrorPage({ status }: { status: ErrorStatus }) {
  const content = errorContent[status];
  const Icon = content.icon;

  return (
    <div className="flex min-h-[calc(100dvh-2.75rem)] items-center justify-center bg-gray-100 p-4 sm:p-8 lg:min-h-dvh">
      <section
        aria-labelledby="error-page-title"
        className="window shadow-hard-lg w-full max-w-xl"
      >
        <div className="window-bar relative justify-center">
          <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
            <i className="border-ink size-1.5 rounded-full border" />
            <i className="border-ink size-1.5 rounded-full border" />
          </span>
          <span>teamboard.error.{status}</span>
        </div>

        <div className="bg-paper flex flex-col items-center px-5 py-10 text-center sm:px-10 sm:py-14">
          <span className="border-ink bg-warn text-ink shadow-hard-sm flex size-14 items-center justify-center rounded-sm border-2">
            <Icon aria-hidden="true" className="size-7" />
          </span>
          <p className="mt-5 font-mono text-[10px] font-bold tracking-widest text-gray-500">
            ERROR {status} · {content.code}
          </p>
          <h1
            id="error-page-title"
            className="font-display mt-2 text-3xl leading-tight font-black sm:text-4xl"
          >
            {content.title}
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
            {content.message}
          </p>
          <Link
            to="/"
            className="border-ink bg-ink text-paper shadow-hard-sm button-press-sm mt-7 inline-flex min-h-10 items-center justify-center rounded-sm border-2 px-4 text-xs font-bold"
          >
            Go to home
          </Link>
          <span className="mt-8 font-mono text-[9px] font-bold tracking-wide text-gray-500">
            TEAMBOARD · {status}
          </span>
        </div>
      </section>
    </div>
  );
}
