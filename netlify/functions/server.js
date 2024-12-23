const { join } = require("path");
const { readFileSync } = require("fs");
const path = require("path");
const sirv = require("sirv");
const compression = require("compression");

// Constants
const base = process.env.BASE || "/";

// Create static file handlers
const staticHandler = sirv(join(__dirname, "../../dist/client"), {
  extensions: [],
  immutable: true,
});

const compressHandler = compression();

// Cache production assets
const templateHtml = readFileSync(
  join(__dirname, "../../dist/client/index.html"),
  "utf-8"
);
const ssrManifest = readFileSync(
  join(__dirname, "../../dist/client/.vite/ssr-manifest.json"),
  "utf-8"
);

exports.handler = async (event, context) => {
  console.log("event.rawUrl", event.rawUrl);
  console.log("event.path", event.path);

  try {
    // Handle favicon
    if (event.path === "/favicon.svg") {
      console.log("FAVICON!! event.rawUrl", event.rawUrl);
      const favicon = readFileSync(join(__dirname, "../../public/favicon.svg"));
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "image/svg+xml",
        },
        body: favicon.toString("base64"),
        isBase64Encoded: true,
      };
    }

    // Handle static assets from dist/client or public folder
    if (
      event.path.startsWith("/assets/") ||
      event.path.startsWith("/public/")
    ) {
      console.log("STATIC!! event.rawUrl", event.rawUrl);

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

      // Apply compression
      await new Promise((resolve) => {
        compressHandler(req, res, resolve);
      });

      console.log("step 2 ----");

      // Try serving from dist/client
      await new Promise((resolve) => {
        staticHandler(req, res, resolve);
      });

      console.log("step 3 ---- responseBody", responseBody);

      if (responseBody) {
        console.log("step 3.1 ------");
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

    console.log("step 4 ----");

    const { render } = await import("../../dist/server/entry-server.js");
    const rendered = await render(
      { path: event.rawUrl },
      JSON.parse(ssrManifest)
    );

    console.log("step 4.1 ---- rendered");

    const helmet = rendered.head;
    const helmetString = `${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}`;

    const html = templateHtml
      .replace(`<!--app-head-->`, helmetString)
      .replace(`<!--app-html-->`, rendered.html ?? "");

    console.log("step 5 ----");

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
      body: error.stack,
    };
  }
};
