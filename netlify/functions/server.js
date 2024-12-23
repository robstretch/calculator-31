const { join } = require("path");
const { readFileSync } = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  console.log("event.rawUrl", event.rawUrl);

  try {
    const indexPath = path.join(
      __dirname,
      "..",
      "..",
      "dist",
      "client",
      "index.html"
    );
    const template = readFileSync(indexPath, "utf8");

    // Import the server entry point using dynamic import
    const { render } = await import("../../dist/server/entry-server.js");

    const manifest = JSON.parse(
      readFileSync(
        join(__dirname, "../../dist/client/.vite/ssr-manifest.json"),
        "utf-8"
      )
    );

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
