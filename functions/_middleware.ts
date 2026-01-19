// Cloudflare Pages Function to set correct MIME types for assets
interface CloudflareContext {
  request: Request;
  next: () => Promise<Response>;
  env?: Record<string, unknown>;
  params?: Record<string, string>;
}

export async function onRequest(context: CloudflareContext) {
  const response = await context.next();
  const url = new URL(context.request.url);

  // Set correct MIME types based on file extension
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.mjs')) {
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Content-Type', 'text/javascript; charset=utf-8');
    return newResponse;
  }

  if (url.pathname.endsWith('.css')) {
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Content-Type', 'text/css; charset=utf-8');
    return newResponse;
  }

  return response;
}
