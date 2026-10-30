import type { Config } from "@react-router/dev/config";

export default {
  basename: process.env.GITHUB_PAGES === "true" ? "/teamboard" : "/",
  ssr: process.env.GITHUB_PAGES !== "true",
} satisfies Config;
