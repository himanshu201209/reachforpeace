/**
 * - Redirect www → apex (https://reachforpeace.in) as the global canonical host
 * - Noindex Cloudflare Pages preview/project hosts (*.pages.dev)
 * - Content negotiation: Accept: text/markdown → markdown body for agents
 */

function prefersMarkdown(acceptHeader) {
  if (!acceptHeader) return false;
  let mdQ = null;
  let htmlQ = null;
  for (const part of acceptHeader.split(",")) {
    const bits = part.trim().split(";").map((s) => s.trim());
    const type = (bits[0] || "").toLowerCase();
    let q = 1;
    for (const bit of bits.slice(1)) {
      if (bit.startsWith("q=")) {
        const parsed = Number.parseFloat(bit.slice(2));
        q = Number.isFinite(parsed) ? parsed : 0;
      }
    }
    if (type === "text/markdown") mdQ = q;
    if (type === "text/html") htmlQ = q;
  }
  if (mdQ === null || mdQ <= 0) return false;
  if (htmlQ === null) return true;
  return mdQ >= htmlQ;
}

function markdownAssetPath(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const map = {
    "/": "/content/index.md",
    "/index": "/content/index.md",
    "/index.html": "/content/index.md",
    "/privacy": "/content/privacy.md",
    "/privacy.html": "/content/privacy.md",
    "/terms": "/content/terms.md",
    "/terms.html": "/content/terms.md",
  };
  return map[path] || null;
}

function estimateTokens(text) {
  // Rough token estimate (~4 chars / token), matches common agent heuristics
  return Math.max(1, Math.round(text.length / 4));
}


function withSecurityHeaders(headers) {
  const h = headers instanceof Headers ? headers : new Headers(headers);
  h.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  h.set("X-Frame-Options", "SAMEORIGIN");
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Allow Clarity, Google Fonts, Instagram embeds; block framing by others via frame-ancestors
  h.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://scripts.clarity.ms https://www.instagram.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://www.clarity.ms https://*.clarity.ms https://c.bing.com https://c.clarity.ms",
      "frame-src https://www.instagram.com https://instagram.com",
    ].join("; ")
  );
  return h;
}

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const host = (request.headers.get("host") || url.host || "").toLowerCase();

  // Global canonical host: apex without www
  if (host === "www.reachforpeace.in") {
    url.protocol = "https:";
    url.hostname = "reachforpeace.in";
    return Response.redirect(url.toString(), 301);
  }

  // Markdown for Agents — content negotiation
  if (
    request.method === "GET" ||
    request.method === "HEAD"
  ) {
    const accept = request.headers.get("accept") || "";
    const mdPath = markdownAssetPath(url.pathname);
    if (mdPath && prefersMarkdown(accept) && context.env && context.env.ASSETS) {
      const assetUrl = new URL(mdPath, url.origin);
      const mdRes = await context.env.ASSETS.fetch(assetUrl);
      if (mdRes.ok) {
        const markdown = await mdRes.text();
        const headers = withSecurityHeaders(new Headers());
        headers.set("Content-Type", "text/markdown; charset=utf-8");
        headers.set("Vary", "Accept");
        headers.set("Cache-Control", "public, max-age=300, must-revalidate");
        headers.set("x-markdown-tokens", String(estimateTokens(markdown)));
        headers.set(
          "content-signal",
          "ai-train=yes, search=yes, ai-input=yes"
        );
        if (host === "reachforpeace.in") {
          const canonicalPath =
            url.pathname === "/index.html" ? "/" : url.pathname;
          const canonical = `https://reachforpeace.in${
            canonicalPath === "/" ? "/" : canonicalPath.replace(/\.html$/, "")
          }`;
          headers.set("Link", `<${canonical}>; rel="canonical"`);
        }
        if (request.method === "HEAD") {
          return new Response(null, { status: 200, headers });
        }
        return new Response(markdown, { status: 200, headers });
      }
    }
  }

  const response = await context.next();

  if (host.endsWith(".pages.dev")) {
    const headers = withSecurityHeaders(new Headers(response.headers));
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  // Hint preferred host for HTML on the apex domain (skip errors / 404)
  if (host === "reachforpeace.in" && response.ok) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      const headers = withSecurityHeaders(new Headers(response.headers));
      const path = url.pathname === "/" ? "/" : url.pathname;
      const clean =
        path === "/index.html"
          ? "/"
          : path === "/privacy.html"
            ? "/privacy"
            : path === "/terms.html"
              ? "/terms"
              : path;
      const canonical = `https://reachforpeace.in${clean}`;
      headers.set("Link", `<${canonical}>; rel="canonical"`);
      // Help caches distinguish HTML vs markdown variants if CF edge converts later
      const vary = headers.get("Vary");
      if (!vary) headers.set("Vary", "Accept");
      else if (!/\bAccept\b/i.test(vary)) headers.set("Vary", `${vary}, Accept`);
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
  }

  // Security headers on other apex responses (404, assets passthrough HTML, etc.)
  if (host === "reachforpeace.in") {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: withSecurityHeaders(new Headers(response.headers)),
    });
  }

  return response;
}
