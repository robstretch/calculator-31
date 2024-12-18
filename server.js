import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { render } from './dist/server/entry-server.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const template = readFileSync(join(__dirname, 'dist/client/index.html'), 'utf-8');

// Serve static files
app.use(express.static('dist/client', { index: false }));

app.get('*', (req, res) => {
  const url = req.originalUrl;
  const { html, head } = render(url);
  
  const finalHtml = template
    .replace('</head>', `${head.title.toString()}${head.meta.toString()}${head.link.toString()}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('<!--app-state-->', '');
  
  res.setHeader('Content-Type', 'text/html');
  res.end(finalHtml);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});