# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern consulting website built with Astro + React and deployed on Cloudflare Pages/Workers. The project modernizes a static GitHub Pages site into a dynamic, scalable web application while serving as both a professional platform and technical demonstration.

## Architecture

### Dual Worker Architecture
The project uses two separate Cloudflare Workers:
- **Site Worker** (`workers/site/`): Astro application with React components for the main website
- **API Worker** (`workers/api/`): Hono-based REST API for contact form processing and email services

### Technology Stack
- **Frontend**: Astro 5.x with React 19 and TypeScript
- **Styling**: Tailwind CSS 4.x with custom design system
- **Backend**: Hono framework on Cloudflare Workers
- **Email**: Resend service integration with HTML templates
- **Validation**: Zod schemas for type-safe form processing
- **Deployment**: Cloudflare Pages + Workers

## Development Commands

### Parallel Development (Recommended)
```bash
# Start both site and API servers simultaneously
./scripts/dev.sh
```
This starts:
- Astro site at `http://localhost:4321`
- Worker API at `http://localhost:8787`

### Individual Components
```bash
# Site development
cd workers/site
npm run dev

# API development  
cd workers/api
npm run dev

# Build site for production
cd workers/site
npm run build

# Build API (dry-run)
cd workers/api
npm run build
```

### Deployment
```bash
# Deploy site to Cloudflare Pages
cd workers/site
npm run deploy

# Deploy API to Cloudflare Workers
cd workers/api
npm run deploy

# Preview built site locally
cd workers/site
npm run preview
```

## Documentation-Driven Development

This project follows a **Documentation First** approach with these principles:

### Philosophy
- **Intention Before Action**: Document first, then implement
- **Living Docs**: Capture *what, why, and how thinking changed*
- **AI-Friendly**: Consistent, structured docs that LLM agents can consume

### Workflow
1. Draft spec or ADR before changes
2. Commit documentation
3. Implement code aligned to docs
4. Log lessons in `DEVELOPMENT-JOURNAL.md`

### Documentation Structure
- `docs/DEVELOPMENT-JOURNAL.md` - Continuous log of progress, decisions, and learnings
- `docs/adr/` - Architecture Decision Records (when present)
- `docs/api/` - API schemas and authentication flows (when present)
- `docs/diagrams/` - System and data flow diagrams in Mermaid format (when present)

## Code Architecture

### Design System
The project implements a comprehensive design system with:
- CSS custom properties for theming (light/dark modes)
- Brand colors: `#6750A4` (light) / `#9C88FF` (dark)
- Material Design inspired components and icons
- Responsive grid systems and typography scales

### Component Architecture
- **Astro Components** (`.astro`): Static server-rendered components for layout and content
- **React Components** (`.tsx`): Interactive client-side components (ContactForm, Navigation)
- **Layouts**: Master page template in `layouts/Layout.astro`
- **Pages**: File-based routing in `pages/` directory

### API Architecture
- **Hono Framework**: Fast, lightweight framework optimized for Workers
- **Middleware Stack**: CORS, rate limiting, error handling, request logging
- **Type Safety**: Zod validation schemas with TypeScript interfaces
- **Email Service**: Professional HTML/text templates with Resend integration

### Contact Form Flow
1. React form component validates input client-side
2. Form posts to `/api/contact` (Astro API route)
3. Astro proxies request to Hono Worker API
4. Worker validates with Zod, sends email via Resend
5. Success/error response flows back through proxy

## Key Files and Directories

### Site Structure (`workers/site/`)
```
src/
├── components/           # Reusable UI components
│   ├── Header.astro     # Navigation with theme toggle
│   ├── Footer.astro     # Social links and copyright  
│   ├── ContactForm.tsx  # React contact form with validation
│   └── ...
├── layouts/Layout.astro # Master page layout with theme system
├── pages/               # File-based routes
│   ├── index.astro     # Homepage with hero and services
│   ├── contact.astro   # Contact page integrating form
│   └── api/contact.ts  # API proxy to Worker
└── styles/global.css   # Global styles and Tailwind imports
```

### API Structure (`workers/api/`)
```
src/
├── index.ts            # Main Hono app and routing
├── types.ts            # TypeScript interfaces and Zod schemas
├── email.ts            # Email service with HTML templates
├── middleware.ts       # CORS, rate limiting, error handling
└── routes/contact.ts   # Contact form endpoint logic
```

## Environment Configuration

### Required Environment Variables
- **API Worker**: `RESEND_API_KEY`, `CONTACT_EMAIL`
- **Site Worker**: No secrets required (proxies to API)

### Setting Secrets
```bash
# Set API key for Worker
cd workers/api
wrangler secret put RESEND_API_KEY

# Set contact email
wrangler secret put CONTACT_EMAIL
```

## Testing and Validation

### Local Development Testing
1. Run `./scripts/dev.sh` to start both servers
2. Visit `http://localhost:4321` to test the site
3. Submit contact form to test end-to-end flow
4. Check `http://localhost:8787` for API health endpoints

### Build Validation
```bash
# Validate TypeScript compilation
cd workers/site && npm run build
cd workers/api && npm run build

# Test production preview
cd workers/site && npm run preview
```

## Common Development Patterns

### Adding New Pages
1. Create `.astro` file in `workers/site/src/pages/`
2. Use `Layout.astro` wrapper with title and currentPage props
3. Follow existing component patterns for consistency
4. Update navigation in `Header.astro` if needed

### Extending API Functionality
1. Define new types/schemas in `types.ts`
2. Create route handler in `routes/` directory
3. Register route in main `index.ts` app
4. Add middleware as needed for validation/rate limiting

### Theme System Usage
- CSS custom properties automatically handle light/dark themes
- Use `var(--brand)`, `var(--ink)`, `var(--muted)`, etc. for colors
- Theme toggle is handled automatically in Header component
- Responsive design uses mobile-first approach

## Performance Considerations

### Astro Islands Architecture
- Static HTML generation with selective client-side hydration
- React components only load when needed (`client:load` directive)
- Minimal JavaScript footprint for optimal performance

### Cloudflare Edge Optimization
- Global CDN distribution
- Edge-optimized Workers runtime
- Automatic image optimization (when configured)

This architecture achieves 90+ Lighthouse scores across all metrics while maintaining developer experience and business functionality.