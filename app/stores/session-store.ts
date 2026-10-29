import { create } from "zustand";
import type { User } from "~/type";

const SESSION_STORAGE_KEY = "teamboard:user-session";

interface SessionState {
  session: User | null;
  hasHydrated: boolean;
  setSession: (session: User) => void;
  clearSession: () => void;
  hydrateSession: () => void;
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.role === "string" &&
    typeof user.online === "boolean" &&
    typeof user.storageUsedGB === "number" &&
    typeof user.storageLimitGB === "number"
  );
}

export const useSessionStore = create<SessionState>()((set) => ({
  session: null,
  hasHydrated: false,
  setSession: (session) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }

    set({ session });
  },
  clearSession: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }

    set({ session: null });
  },
  hydrateSession: () => {
    if (typeof window === "undefined") return;

    const savedSession = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (savedSession === null) {
      set({ hasHydrated: true });
      return;
    }

    try {
      const parsedSession: unknown = JSON.parse(savedSession);

      if (isUser(parsedSession)) {
        set({ session: parsedSession, hasHydrated: true });
        return;
      }
    } catch {
      // Remove invalid session data below.
    }

    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    set({ session: null, hasHydrated: true });
  },
}));

export const useSession = () => useSessionStore((state) => state.session);
export const useSessionHydrated = () =>
  useSessionStore((state) => state.hasHydrated);
