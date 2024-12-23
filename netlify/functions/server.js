const { createServer } = require("http");
const { join } = require("path");
const { readFileSync } = require("fs");

exports.handler = async (event, context) => {
  const template = readFileSync(
    join(__dirname, "../../dist/client/index.html"),
    "utf-8"
  );

  // Read the server entry point
  const manifest = JSON.parse(
    readFileSync(
      join(__dirname, "../../dist/client/.vite/ssr-manifest.json"),
      "utf-8"
    )
  );

  // Import your server entry point
  const { render } = require("../../dist/server/entry-server.js");

  try {
    const url = event.rawUrl || event.path;
    const rendered = await render({ path: url }, manifest);

    const helmet = rendered.head;

    const helmetString = `${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}`;

    const html = template
      .replace(`<!--app-head-->`, helmetString)
      .replace(`<!--app-html-->`, rendered.html ?? "");

    return {
      statusCode: status || 200,
      headers: {
        "Content-Type": "text/html",
        ...headers,
      },
      body: html,
    };
  } catch (error) {
    console.error("SSR Error:", error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
