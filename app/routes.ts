import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("403", "routes/403.tsx"),
  route("404", "routes/404.tsx"),
  route("500", "routes/500.tsx"),
  layout("routes/layout/protected-layout.tsx", [
    // Add routes that require authentication inside this layout.
    route("dashboard", "routes/dashboard.tsx"),
    route("projects", "routes/projects.tsx"),
    route("board", "routes/board.tsx"),
    route("messages", "routes/messages.tsx"),
    route("calendar", "routes/calendar.tsx"),
    route("team", "routes/team.tsx"),
  ]),
] satisfies RouteConfig;
