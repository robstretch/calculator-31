const { join } = require("path");
const { readFileSync } = require("fs");
const path = require("path");
const sirv = require("sirv");
const compression = require("compression");

// Constants
const base = process.env.BASE || "/";

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

      // Get the file path relative to the dist/client directory
      const filePath = join(__dirname, "../../dist/client", event.path);

      try {
        const fileContent = readFileSync(filePath);
        const ext = path.extname(event.path);

        // Basic content type mapping
        const contentTypes = {
          ".css": "text/css",
          ".js": "application/javascript",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".svg": "image/svg+xml",
          ".json": "application/json",
        };

        console.log("step 3.1 ------");

        return {
          statusCode: 200,
          headers: {
            "Content-Type": contentTypes[ext] || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000",
          },
          body: fileContent.toString("base64"),
          isBase64Encoded: true,
        };
      } catch (err) {
        console.error("Static file error:", err);
        return {
          statusCode: 404,
          body: "File not found",
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
