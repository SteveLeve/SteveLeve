# ADR-003: Framework Architecture Clarification

## Status
Accepted

## Context
After examining the generated Cloudflare + Astro project, we need to clarify the roles of different frameworks in our architecture:

1. **Vite**: Build tool that comes with Astro (not a framework choice)
2. **Hono**: Backend framework for separate Cloudflare Workers (API endpoints)
3. **Current Setup**: Astro with Cloudflare adapter for static site + server-side rendering

The generated project uses:
- Astro with `@astrojs/cloudflare` adapter for the main site
- Wrangler configuration pointing to `./dist/_worker.js/index.js`
- This creates a single Worker that serves the Astro site

## Decision
We will use a **hybrid architecture**:

1. **Main Site**: Astro + React + Cloudflare Pages (current setup)
2. **API Endpoints**: Separate Hono-based Cloudflare Worker for contact forms and future API needs

## Rationale

### Architecture Benefits
- **Separation of Concerns**: Static site generation separate from API logic
- **Performance**: Astro optimizes static content, Hono optimizes API performance
- **Scalability**: API can scale independently from the main site
- **Development**: Easier to develop and test API endpoints separately

### Current Setup Analysis
The generated project structure is correct for the main site:
- Astro handles static generation and SSR
- Cloudflare adapter optimizes for Cloudflare Pages deployment
- Vite is just the build tool (not a framework decision)
- React integration works for interactive components

### Hono Integration Plan
We'll create a separate Worker for API endpoints:
```
project-structure/
├── src/consulting-website/     # Main Astro site
└── workers/
    └── api/                    # Hono-based API Worker
        ├── src/
        │   ├── index.ts        # Hono app
        │   └── routes/
        └── wrangler.toml       # Separate Worker config
```

## Implementation Strategy

### Phase 1: Complete Astro Site Setup
- Finish current Astro + React + Tailwind setup
- Deploy main site to Cloudflare Pages
- Verify static generation and performance

### Phase 2: Add Hono API Worker
- Create separate Hono Worker for contact form API
- Set up subdomain or path routing (api.domain.com or domain.com/api)
- Configure CORS for cross-origin requests from main site

### Phase 3: Integration
- Update contact form to call Hono API endpoints
- Set up shared environment variables and secrets
- Configure deployment pipeline for both components

## Technical Details

### Main Site (Astro)
- **Purpose**: Static content, SEO, performance-optimized pages
- **Technology**: Astro + React + Tailwind + Cloudflare Pages
- **Deployment**: Cloudflare Pages with GitHub integration

### API Worker (Hono)
- **Purpose**: Dynamic functionality (contact forms, future client portal)
- **Technology**: Hono + TypeScript + Zod validation
- **Deployment**: Cloudflare Workers with Wrangler

### Communication
- **Frontend → API**: Fetch requests to Worker endpoints
- **Shared Resources**: Environment variables, email services
- **Authentication**: Future client portal will use shared auth tokens

## Consequences

### Positive
- Clear separation of static and dynamic concerns
- Optimal performance for both static content and API endpoints
- Independent scaling and deployment
- Better development experience with focused tooling

### Negative
- Slightly more complex deployment (two components)
- Need to manage CORS and cross-origin communication
- Additional configuration overhead

### Risks and Mitigations
- **Risk**: CORS configuration complexity
  - **Mitigation**: Use same domain with path-based routing initially
- **Risk**: Deployment coordination
  - **Mitigation**: GitHub Actions can deploy both components in sequence

## Implementation Notes
- Keep current Astro setup as-is for main site
- Add Hono Worker in Task 6 as planned
- Use environment-based routing for API endpoints
- Document API endpoints for future development

## Related Decisions
- Links to ADR-001 (Technology Stack Selection)
- Links to ADR-002 (Astro Project Initialization Method)
- Future ADR for API routing and CORS configuration

---
**Date**: 2025-01-30  
**Author**: Steve Leve  
**Decision Driver**: Architecture clarity and optimal framework usage