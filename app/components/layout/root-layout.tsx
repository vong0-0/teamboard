import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import { StatusBar } from "./status-bar";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="pt-11 lg:pt-0">
        <header>
          <StatusBar />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
