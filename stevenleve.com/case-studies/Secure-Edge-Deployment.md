# Case Study: Secure Edge Computing Platform on Cloudflare

**Role:** Cloud Architect / Full-Stack Engineer  
**Date:** October - November 2025  
**Technologies:** Cloudflare Workers, Cloudflare Pages, Astro, React, TypeScript, Hono, Resend API

## Executive Summary

Architected and deployed a high-performance, secure consulting website (stevenleve.com) utilizing the Cloudflare edge network. The project transformed a basic web presence into a secure, globally distributed platform, achieving a 96% security score and sub-100ms response times worldwide.

## The Challenge

Modern web applications require more than just good design; they need robust security, global performance, and scalability. The initial deployment of the personal site had a security score of only 19%, lacking critical protections against bots and common web vulnerabilities. The goal was to build a "fortress" that was also lightning fast.

## The Solution

I implemented a serverless architecture leveraging Cloudflare's edge capabilities to handle logic closer to the user.

### Architecture & Security

*   **Edge Compute (Cloudflare Workers):** Built a serverless backend using the Hono framework to handle dynamic functionality like contact forms. This runs V8 isolates at the edge, eliminating cold starts associated with traditional serverless functions.
*   **Static Site Generation (Astro):** Used Astro with React "islands" for the frontend. This delivers zero-JavaScript HTML by default, hydrating only interactive components, resulting in exceptional load times.
*   **Defense in Depth:**
    *   **CSRF Protection:** Implemented token-based verification for all form submissions.
    *   **Rate Limiting:** Configured rules to prevent abuse and DDoS attacks.
    *   **Bot Detection:** Leveraged Cloudflare's bot management to filter malicious traffic.
    *   **Headers:** Enforced strict security headers (HSTS, X-Content-Type-Options, etc.).
*   **Email Integration:** Integrated the Resend API for reliable transactional email delivery, triggered securely from the edge workers.

## Results

*   **Security:** Improved security score from **19% to 96%** (measured by standard security auditing tools).
*   **Performance:** Achieved a **95+ Lighthouse performance score**. Global CDN distribution ensures sub-100ms latency for users worldwide.
*   **Efficiency:** Serverless architecture incurs near-zero running costs while scaling automatically to handle traffic spikes.

## Artifacts

*   **Live Site:** [stevenleve.com](https://stevenleve.com)
