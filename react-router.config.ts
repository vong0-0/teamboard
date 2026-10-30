import type { Config } from "@react-router/dev/config";

export default {
  basename: process.env.GITHUB_PAGES === "true" ? "/teamboard/" : "/",
  // GitHub Pages serves static files and cannot run the React Router server.
  ssr: false,
} satisfies Config;
