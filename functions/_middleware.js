/**
 * - Redirect www → apex (https://reachforpeace.in) as the global canonical host
 * - Noindex Cloudflare Pages preview/project hosts (*.pages.dev)
 */
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

  const response = await context.next();

  if (host.endsWith(".pages.dev")) {
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  // Hint preferred host for HTML on the apex domain
  if (host === "reachforpeace.in") {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      const headers = new Headers(response.headers);
      const path = url.pathname === "/" ? "/" : url.pathname;
      const canonical = `https://reachforpeace.in${path === "/index.html" ? "/" : path}`;
      headers.set("Link", `<${canonical}>; rel="canonical"`);
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
  }

  return response;
}
