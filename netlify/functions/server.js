const { join } = require("path");
const { readFileSync } = require("fs");
const path = require("path");
const sirv = require("sirv");

// Create static file handler
const staticHandler = sirv(join(__dirname, "../../dist/client"), {
  extensions: [],
});

exports.handler = async (event, context) => {
  console.log("event.rawUrl", event.rawUrl);

  // Favicon Fix
  if (event.rawUrl === "/favicon.svg") {
    return {
      statusCode: 200,
      body: readFileSync(join(__dirname, "../../public/favicon.svg")),
      headers: {
        "Content-Type": "image/svg+xml",
      },
    };
  }

  try {
    // Handle static assets
    if (event.rawUrl.startsWith("/assets/")) {
      // Convert Netlify event into mock req/res objects for sirv
      const req = {
        url: event.rawUrl,
        headers: event.headers,
      };

      let responseBody;
      let contentType;

      const res = {
        setHeader: (key, value) => {
          if (key.toLowerCase() === "content-type") {
            contentType = value;
          }
        },
        end: (body) => {
          responseBody = body;
        },
      };

      // Use sirv to handle the static file
      await new Promise((resolve) => {
        staticHandler(req, res, resolve);
      });

      if (responseBody) {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": contentType,
          },
          body: responseBody.toString("base64"),
          isBase64Encoded: true,
        };
      }
    }

    // Handle HTML requests
    const indexPath = path.join(
      __dirname,
      "..",
      "..",
      "dist",
      "client",
      "index.html"
    );
    const template = readFileSync(indexPath, "utf8");

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
