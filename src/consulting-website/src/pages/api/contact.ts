import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // In development, proxy to local Worker
    // In production, this will be handled by routing configuration
    const workerUrl = import.meta.env.DEV 
      ? 'http://localhost:8787/contact/submit'  // Local Worker dev server
      : 'https://consulting-website-api.your-subdomain.workers.dev/contact/submit'; // Production Worker

    // Forward the request to the Worker
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: await request.text(),
    });

    // Forward the response from the Worker
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('API proxy error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process request',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};