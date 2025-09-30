# ADR-001: Technology Stack Selection for Consulting Website Modernization

## Status
Accepted

## Context
Steve Leve needs to modernize his consulting website from a static GitHub Pages site to a dynamic, production-ready application. The project has multiple objectives:

1. **Urgent Business Need**: Production website required ASAP for job applications and consulting opportunities
2. **Learning Objectives**: Gain practical experience with modern DevOps technologies (Terraform, Kubernetes concepts)
3. **Professional Development**: Refresh front-end skills while building modern full-stack capabilities
4. **Future Scalability**: Support for dynamic features like contact forms and eventual client portal

The current static site uses semantic HTML, CSS, and lightweight JavaScript with Material Web components. Content includes services (reliability, modernization, advisory, AI readiness), case studies, and professional background.

## Decision
We will use the following technology stack:

### Frontend
- **Astro 4.x** with React integration for optimal performance and developer experience
- **TypeScript** for type safety and better maintainability
- **Tailwind CSS** for consistent styling while maintaining current design system
- **Vite** for build tooling (comes with Astro)

### Backend
- **Cloudflare Workers** with **Hono framework** for serverless API endpoints
- **Zod** for runtime validation and type inference
- **Resend or SendGrid** for email service integration

### Infrastructure
- **Cloudflare Pages** for static hosting with edge optimization
- **Terraform** for infrastructure as code (learning objective)
- **GitHub Actions** for CI/CD automation

### Development Workflow
- **Wrangler CLI** for initial rapid deployment
- **Terraform** migration for infrastructure learning
- Multi-environment setup (dev/staging/prod)

## Rationale

### Astro + React Choice
- **Performance**: Astro's islands architecture minimizes JavaScript bundle size
- **Developer Experience**: Familiar React components where interactivity is needed
- **SEO Optimization**: Excellent static generation capabilities for job search visibility
- **Migration Path**: Easy to migrate existing HTML/CSS structure

### Hono for Cloudflare Workers
- **Performance**: Optimized specifically for edge runtimes
- **Modern Standards**: Uses Web APIs that work perfectly with Workers
- **Developer Experience**: Excellent TypeScript support and middleware ecosystem
- **Industry Standard**: Current best practice for Cloudflare Workers development

### Cloudflare Platform
- **Speed to Market**: Fastest path to production deployment
- **Learning Value**: Real-world experience with edge computing
- **Cost Effective**: Generous free tiers for personal/small business use
- **Integration**: Seamless Workers + Pages integration

### Terraform Decision
- **Learning Objective**: Practical infrastructure-as-code experience
- **Career Value**: High-demand DevOps skill for job applications
- **Best Practice**: Infrastructure reproducibility and version control
- **Phased Approach**: Can start with Wrangler, migrate to Terraform

## Consequences

### Positive
- Rapid time to production (Week 1 target achievable)
- Modern, performant website for professional presentation
- Practical learning experience with in-demand technologies
- Scalable foundation for future features (client portal, CMS)
- Cost-effective hosting and infrastructure

### Negative
- Learning curve for Astro (mitigated by React familiarity)
- Vendor lock-in to Cloudflare ecosystem (acceptable for learning project)
- Additional complexity compared to static site (justified by learning objectives)

### Risks and Mitigations
- **Risk**: Deployment complexity delays production launch
  - **Mitigation**: Phased approach with Wrangler first, Terraform second
- **Risk**: Astro learning curve impacts timeline
  - **Mitigation**: Leverage existing React knowledge, start with simple components
- **Risk**: Cloudflare Workers limitations for future features
  - **Mitigation**: Well-documented platform with active community support

## Implementation Notes
- Start with minimal viable product focusing on content migration and contact form
- Prioritize production deployment over perfect architecture
- Document all learning and decisions for future reference
- Maintain static export capability for GitHub Pages backup

## Related Decisions
- Email service selection (to be decided in implementation)
- CMS integration approach (future ADR)
- Authentication provider for client portal (future ADR)

---
**Date**: 2025-01-30  
**Author**: Steve Leve  
**Reviewers**: Kiro AI Assistant