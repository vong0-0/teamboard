import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/layout/protected-layout.tsx", [
    // Add routes that require authentication inside this layout.
    index("routes/home.tsx"),
  ]),
] satisfies RouteConfig;
