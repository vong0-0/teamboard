import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  layout("routes/layout/protected-layout.tsx", [
    // Add routes that require authentication inside this layout.
    route("dashboard", "routes/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
