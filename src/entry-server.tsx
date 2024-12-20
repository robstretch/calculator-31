import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import { App } from './App';

export function render(url: string) {
  const helmetContext = {} as FilledContext;
  
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: helmet
  };
}