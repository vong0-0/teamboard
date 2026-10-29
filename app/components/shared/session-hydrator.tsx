import { useEffect } from "react";
import { useSessionStore } from "~/stores/session-store";

export function SessionHydrator() {
  useEffect(() => {
    useSessionStore.getState().hydrateSession();
  }, []);

  return null;
}
