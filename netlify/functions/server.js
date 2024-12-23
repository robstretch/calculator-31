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
  try {
    // Handle favicon
    if (event.path === "/favicon.svg") {
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
      event.path === "/robots.txt" ||
      event.path === "/calculator-sitemap.xml"
    ) {
      // Get the file path relative to the dist/client directory
      const filePath = join(__dirname, "../../dist/client", event.path);

      try {
        const fileContent = readFileSync(filePath);
        const ext = path.extname(event.path);

        const contentType = getContentType(ext);
        const isBinary = isBinary(ext);

        return {
          statusCode: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000",
          },
          body: isBinary
            ? fileContent.toString("base64")
            : fileContent.toString(),
          isBase64Encoded: isBinary,
        };
      } catch (err) {
        console.error("Static file error:", err);
        return {
          statusCode: 404,
          body: "File not found",
        };
      }
    }

    const { render } = await import("../../dist/server/entry-server.js");
    const rendered = await render(
      { path: event.path },
      JSON.parse(ssrManifest)
    );

    const helmet = rendered.head;
    const helmetString = `${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}`;

    const html = templateHtml
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
      body: error.stack,
    };
  }
};

// Basic content type mapping
const contentTypes = {
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
  ".html": "text/html",
  ".htm": "text/html",
};

// Determine if the file should be base64 encoded
const binaryTypes = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".otf",
];

function getContentType(ext) {
  return contentTypes[ext] || "application/octet-stream";
}

function isBinary(ext) {
  return binaryTypes.includes(ext);
}
