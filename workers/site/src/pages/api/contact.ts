// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

// Ensure this route is server-rendered
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // In a development environment, this endpoint acts as a proxy to the actual API worker.
  if (import.meta.env.DEV) {
    try {
      // The API worker runs on port 8787, and the endpoint is /contact/submit
      const apiUrl = 'http://localhost:8787/contact/submit';

      // Forward the request to the API worker
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: request.headers,
        body: request.body,
        // @ts-ignore - This is required for streaming request bodies in Node.js/undici
        duplex: 'half',
      });

      // Return the response from the API worker
      return response;
    } catch (error) {
      console.error('Error proxying request to API worker:', error);
      return new Response(
        JSON.stringify({ message: 'Failed to proxy request to the API worker.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  // In a production environment, this endpoint should not be directly accessed.
  // The client should be configured to make requests directly to the API worker's public URL.
  return new Response(
    JSON.stringify({
      message: 'This endpoint is intended for development proxying only.',
    }),
    {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

