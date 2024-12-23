import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";

export function render({ path }: { path: string }) {
  const helmetContext = {} as any;

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: helmet,
  };
}
