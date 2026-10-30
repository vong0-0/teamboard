import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });

    const updateTime = () => setTime(formatter.format(new Date()));
    let timeoutId: number | undefined;

    const syncTime = () => {
      updateTime();

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      const delayUntilNextMinute = 60_000 - (Date.now() % 60_000);
      timeoutId = window.setTimeout(syncTime, delayUntilNextMinute);
    };

    const syncWhenVisible = () => {
      if (!document.hidden) {
        syncTime();
      }
    };

    syncTime();
    window.addEventListener("focus", syncTime);
    document.addEventListener("visibilitychange", syncWhenVisible);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      window.removeEventListener("focus", syncTime);
      document.removeEventListener("visibilitychange", syncWhenVisible);
    };
  }, []);

  return (
    <div
      aria-label="Phone status bar"
      className="bg-paper text-ink absolute top-0 left-0 flex h-11 w-full items-center justify-between px-6 lg:hidden"
      role="group"
    >
      {time ? (
        <time className="font-mono text-[13px] font-bold">{time}</time>
      ) : (
        <Skeleton aria-hidden="true" className="h-3 w-10 rounded-sm" />
      )}

      <div className="flex items-center gap-2">
        <svg
          aria-label="Battery level"
          className="h-4 w-8"
          fill="none"
          height="16"
          role="img"
          viewBox="0 0 31 14"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
            width="26"
            x="1"
            y="1"
          />
          <path d="M29 4V10" stroke="currentColor" strokeWidth="2" />
          <rect fill="currentColor" height="6" rx="1" width="19" x="4" y="4" />
        </svg>
      </div>
    </div>
  );
}
