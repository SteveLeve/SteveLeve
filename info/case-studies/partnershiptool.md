# PartnershipTool: Cofounder, Full-Stack, Agent-Driven

[← Back to Case Studies](../case-studies.md)

---

## Executive Summary

Cofounder (equity) and full-stack engineer of PartnershipTool, an ad-tech business intelligence and partner management platform. With a two-person founding team, I built the product and the agent-driven development system behind it — taking the platform from concept to customer-validated beta and continuing to advance both together.

**Key Results:**
- **Beta product shipped** on schedule to early customer cohort with positive feedback
- **Production full-stack architecture:** Next.js, React, TypeScript, PostgreSQL, Stripe, PostHog
- **AI agents in the product:** account configuration and performance insights (Gemini)
- **Agent-driven workflow at full depth:** Cursor + Claude, self-hosted Honcho for agent memory, Hermes as a semi-autonomous agent team
- **Ongoing engagement** — active product and data-product development

---

## The Challenge

### Startup Context

**Company:** PartnershipTool — ad-tech BI and partner management platform
**Stage:** Pre-seed / early customer validation
**Team Size:** 2-person founding team (business + technical)
**Funding:** Bootstrapped

**The Problem:**
- Ship a credible beta to early customers with a single engineer
- Make architecture and stack decisions that survive from MVP to scale
- Keep infrastructure costs near zero during validation
- Cover product engineering, infrastructure, and AI features simultaneously

**The Approach:** Agent-driven development. One engineer running a disciplined agentic workflow covers ground that used to take a team — with the verification discipline to trust the output.

---

## My Role

### Cofounder & Full-Stack Engineer

**Primary Responsibilities:**
1. **Architecture design** for the partner management and BI platform
2. **Technology stack selection** with vendor evaluation
3. **Full-stack product development** — frontend, backend, data, and AI features
4. **Agentic development system** — harness, agent memory, and workflow engineering
5. **Development roadmap** creation with phased rollout
6. **Technical liaison** with business cofounder

---

## The Agentic Development System

This project is where my agentic engineering practice runs at full depth. The development system is a first-class product alongside the platform itself.

**Current workflow:**
- **Harness:** Cursor + Claude as the core development harness
- **Agent memory:** Self-hosted Honcho, moving past ad-hoc memory toward durable agent context
- **Agent team:** Hermes orchestrating semi-autonomous agents that behave like team members, not CLI tools
- **Supporting tooling:** GitHub apps and actions, code review automation, MCP servers, custom agents and skills

**How it evolved:** The workflow started as AI-assisted coding (Claude Code, Codex, Copilot) and matured into longer-running autonomous sessions. As session length grew, review burden became the ceiling — which pushed the practice toward better knowledge architecture, agent memory, and verification workflows. That progression is the core of my agentic engineering practice today.

**Verification discipline:** Agent output is held to the same standard as human output: typed interfaces, review gates, integration tests, and deployment checklists. Autonomy without verification is just risk at higher speed.

---

## Key Contributions

### Product Launch

**Scope:**
Beta product enabling partner marketers to manage relationships and act on business intelligence.

**Outcome:**
- Beta launched on schedule to early customers
- Positive feedback from initial cohort
- No critical technical issues during launch
- Smooth onboarding experience for early users

### AI Features in the Product

- AI agents for account configuration using Gemini
- Performance-insight agents surfacing actionable analytics
- Vendor-transaction data product in progress: transforming raw transaction data from different vendors into a common data model (dbt-style transformation, data modeling, orchestration)

---

## Architecture Decisions

**Technology Stack:**

**Frontend:**
- **Framework:** Next.js (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + shadcn/ui

**Backend:**
- **Platform:** Vercel Edge Functions
- **Database:** Neon (PostgreSQL)
- **Payments:** Stripe
- **Analytics:** PostHog

**Decision Framework:**
1. **Time-to-market:** Prioritize speed to beta
2. **Cost efficiency:** Minimize fixed costs during validation
3. **Scalability:** Easy path from MVP to production scale
4. **Developer experience:** Enable fast iteration — human and agent alike
5. **Ecosystem maturity:** Avoid bleeding-edge risk

**Key Trade-offs:**
- **Chose:** Vercel over AWS (faster deployment, simpler ops)
- **Chose:** Neon over RDS (serverless scaling, lower minimum cost)
- **Chose:** Next.js full-stack over separate frontend/backend (faster development)
- **Deferred:** Kubernetes, microservices (premature for MVP)

---

## System Design

**High-Level Architecture:**
```
[Browser] ←→ [Next.js App] ←→ [Vercel Edge Functions]
                ↓                       ↓
         [Static Pages]          [API Routes]
                                       ↓
                               [Neon PostgreSQL]
                                       ↓
                          [External Services]
                          - Stripe (payments)
                          - PostHog (analytics)
                          - Gemini (product AI agents)
```

**Key Design Principles:**
- **Serverless-first:** Minimize operational overhead
- **Type safety:** End-to-end TypeScript
- **Security by default:** Authentication, input validation, SQL injection prevention
- **Observability:** Error tracking, performance monitoring, product analytics

**Database Design:**
- Normalized schema for data integrity, indexes for common query patterns
- Soft deletes for audit trail, UUID primary keys, full timestamps
- Connection pooling via Neon; N+1 prevention; pagination for large result sets

**Security Implementation:**
- Session management, role-based access control, secure password hashing
- Input validation (Zod schemas), parameterized queries, rate limiting
- Encryption at rest and in transit; PII handling discipline; audit logging

---

## Lessons Learned

### What Worked Well

**Agent-driven development:**
- Small-team leverage is real: product velocity that previously required multiple engineers
- Agent memory and knowledge architecture pay compounding dividends as the codebase grows
- Verification workflows caught agent errors early and built trust in longer autonomous sessions

**Technology choices:**
- Next.js + Vercel = fast iteration velocity
- TypeScript = caught bugs early — for humans and agents
- Serverless = minimal operational burden

### What I'd Do Differently

- Ship alpha even earlier; more customer interviews before building
- Start architecture docs from day one — they double as agent context
- Set up automated testing earlier; more end-to-end tests for critical paths

---

## What This Demonstrates

**Cofounder-level ownership:** Concept to customer-validated product with a two-person team — architecture, product, infrastructure, and AI features all owned end to end.

**Agentic engineering in production:** Not tool adoption — a working development system with harnesses, agent memory, orchestration, and verification, applied to real shipped software.

**Modern full-stack execution:** Next.js, TypeScript, PostgreSQL, Stripe, PostHog, with AI features built in from the start.

---

## Engagement Details

**Duration:** September 2025 - Present (ongoing)
**Role:** Cofounder (equity) & Full-Stack Engineer
**Status:** Active — product and data-product development continuing

---

## Contact

Building with agent-driven methods, or want to compare notes on agentic engineering practice?

**Get in Touch:** [stevenleve.com/contact](https://stevenleve.com/contact)
**LinkedIn:** [linkedin.com/in/steve-leve](https://linkedin.com/in/steve-leve)

---

[← Back to Case Studies](../case-studies.md)
