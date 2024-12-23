const { createServer } = require("http");
const { join } = require("path");
const { readFileSync } = require("fs");

exports.handler = async (event, context) => {
  console.log("event.rawUrl", event.rawUrl);

  const template = readFileSync(
    join(__dirname, "../../dist/client/index.html"),
    "utf-8"
  );

  console.log("template", template);

  // Read the server entry point
  const manifest = JSON.parse(
    readFileSync(
      join(__dirname, "../../dist/client/.vite/ssr-manifest.json"),
      "utf-8"
    )
  );

  console.log("manifest", manifest);

  // Import your server entry point
  const { render } = require("../../dist/server/entry-server.js");

  try {
    const url = event.rawUrl || event.path;
    const rendered = await render({ path: url }, manifest);

    console.log("rendered", rendered);

    const helmet = rendered.head;

    const helmetString = `${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}`;

    const html = template
      .replace(`<!--app-head-->`, helmetString)
      .replace(`<!--app-html-->`, rendered.html ?? "");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
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