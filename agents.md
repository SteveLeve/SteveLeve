# agents.md

## Project Overview

**Steve Leve Consulting Website**

A personal consultancy website, performance-optimized web application using Astro + React and Cloudflare infrastructure. This project serves as both a professional consulting platform and a demonstration of modern web development practices.

## Agent Collaboration Context

### Project Goals
- **Primary**: Create production-ready consulting website for job applications and client acquisition
- **Secondary**: Learn modern DevOps technologies (Terraform, Cloudflare Workers, infrastructure as code)
- **Timeline**: ASAP deployment required for job search activities

### Current Status
- **Phase**: Core website implementation (Tasks 1-4 complete)
- **Next**: Contact form and Cloudflare Workers integration
- **Deployment**: Ready for Cloudflare Pages deployment

## Technical Architecture

### Stack Decisions
- **Frontend**: Astro 4.x + React 18 + TypeScript + Tailwind CSS
- **Backend**: Cloudflare Workers with Hono framework (planned)
- **Infrastructure**: Cloudflare Pages + Workers + Terraform (planned)
- **Deployment**: GitHub Actions + Wrangler CLI

### Key Components
- Responsive layout system with Header/Footer
- Animated Hero sections with canvas backgrounds
- Service cards with hover animations
- Case study presentations with structured data
- Theme switching (light/dark) with persistence

## Development Approach

### Test-Driven, Documentation-Driven Development
- **Test First**: Write a failing test before writing implementation code, following the process in `docs/TESTING.md`.
- **Document First**: Create or update design documents and ADRs before implementation.
- **Implement**: Write the code to pass the tests.
- **Log Progress**: Update the development journal to track progress and learnings.

### Quality Standards
- TypeScript for type safety
- Responsive design (mobile-first)
- Performance optimization (Lighthouse 90+)
- Accessibility compliance
- SEO optimization

## Agent Instructions

### When Working on This Project

1. **Read Context First**
   - Review `docs/DEVELOPMENT-JOURNAL.md` for current progress.
   - Review `docs/TESTING.md` to understand the testing strategy.
   - Check `.kiro/specs/consulting-website-modernization/` for requirements.
   - Understand current task status in `tasks.md`.

2. **Follow TDD and Documentation Standards**
   - Write a failing test before any implementation.
   - Create ADRs for architectural decisions.
   - Update development journal after significant changes.

3. **Respect Design System**
   - Use established CSS custom properties
   - Follow component patterns in existing code
   - Maintain responsive design principles
   - Preserve Material Design aesthetic

4. **Performance First**
   - Leverage Astro's islands architecture
   - Minimize JavaScript bundle size
   - Optimize images and assets
   - Test across device sizes

### Current Priorities

1. **Contact Form Implementation** (Task 5)
   - React component with validation
   - Integration with Cloudflare Workers
   - Email service setup

2. **Deployment Pipeline** (Tasks 8-9)
   - GitHub Actions configuration
   - Cloudflare Pages deployment
   - Environment management

3. **Infrastructure as Code** (Tasks 14-15)
   - Terraform modules for Cloudflare resources
   - Environment-specific configurations
   - State management

### Code Patterns

#### Component Structure
```typescript
// Astro component with TypeScript
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<section class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</section>

<style>
  .component {
    /* Use CSS custom properties */
    background: var(--surface);
    color: var(--ink);
    border-radius: var(--radius);
  }
</style>
```

#### Responsive Design
```css
/* Mobile-first approach */
.component {
  padding: 1rem;
}

@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}
```

### File Organization

- **Components**: Reusable UI elements in `src/components/`
- **Pages**: Route-based pages in `src/pages/`
- **Layouts**: Page templates in `src/layouts/`
- **Styles**: Global styles in `src/styles/`
- **Documentation**: Project docs in `docs/`

### Testing Approach

This project follows a comprehensive testing strategy outlined in `docs/TESTING.md`. All agents must adhere to the processes defined in that document, including:

- **Test-Driven Development (TDD)**
- **Unit & Integration Testing (Vitest)**
- **End-to-End Testing (Playwright)**
- **Performance Auditing (Lighthouse)**
- **Manual & Cross-Browser Testing**

## Business Context

### Target Audience
- **Primary**: Potential employers for full-time roles
- **Secondary**: Consulting clients for project work
- **Tertiary**: Technical community for networking

### Content Strategy
- Professional but approachable tone
- Technical expertise demonstration
- Clear service offerings and pricing
- Measurable results in case studies

### Success Metrics
- Fast page load times (< 2 seconds)
- High Lighthouse scores (90+)
- Mobile-friendly design
- Professional appearance
- Clear call-to-action paths

## Collaboration Guidelines

### Communication
- Use development journal for progress updates
- Create ADRs for significant technical decisions
- Document challenges and solutions
- Maintain clear task status tracking

### Code Quality
- Follow established patterns and conventions
- Write self-documenting code with clear naming
- Use TypeScript for type safety
- Test thoroughly before marking tasks complete

### Project Management
- Work on one task at a time
- Update task status appropriately
- Ask for clarification when requirements are unclear
- Suggest improvements while respecting timeline constraints

---

*This document serves as a guide for AI agents working on the Steve Leve consulting website modernization project. It provides context, standards, and patterns to ensure consistent, high-quality development.*