# Production RAG Systems: From Zero to Live in One Week

[← Back to Case Studies](../case-studies.md)

---

## Executive Summary

Built a coordinated suite of 4 production-ready RAG (Retrieval-Augmented Generation) applications in under one week, directly addressing recurring interview feedback of "lacks hands-on AI experience." Two systems are live public demos, one is a comprehensive research lab with custom evaluation framework, and one demonstrates agentic development patterns. This work represents production AI engineering—not tutorial-following—with evaluation rigor that differentiates from most AI practitioners.

**Key Results:**
- **4 production systems** shipped December 4-9, 2025 (<1 week)
- **2 live public demos** accessible 24/7 without authentication
- **~5,000+ lines** of production-quality Python and TypeScript
- **+15% Precision, +22% overall quality** through measured improvements
- **Custom evaluation framework** with ground-truth curation (not RAGAS)

---

## The Challenge

After reaching second and third-round interviews for AI engineering roles, a consistent pattern emerged: recruiters and hiring managers valued my strategic thinking and systems architecture experience, but cited "lacks hands-on AI implementation experience" as the blocking factor. Despite holding an AWS AI Practitioner certification and demonstrating deep understanding of AI concepts, the gap between theoretical knowledge and production code was preventing final offers.

The feedback was clear: **I needed concrete evidence of building and shipping AI applications.**

---

## The Approach

Rather than building a single demo application, I designed a coordinated experimental unit demonstrating:
1. **Multi-platform deployment** (Vercel, Cloudflare Workers, local Jupyter)
2. **Production patterns** (streaming, error handling, cost optimization)
3. **Evaluation rigor** (custom metrics, not off-the-shelf frameworks)
4. **Advanced RAG techniques** (reranking, semantic chunking, hybrid search)
5. **Real engineering trade-offs** (API vs. local inference, latency vs. cost)

---

## What I Built

### Platform 1: Vercel + Next.js 16 + pgvector

**Live Demo:** [vercel-rag-demo.stevenleve.com](https://vercel-rag-demo.stevenleve.com)

**Architecture:**
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 5
- **Backend:** Vercel Edge Functions, API routes
- **Database:** Neon PostgreSQL with pgvector extension
- **LLM:** OpenAI GPT-4o with streaming responses
- **Vector Search:** pgvector with cosine similarity
- **Ingestion:** Document chunking, embedding generation, vector storage

**Key Features:**
- Streaming chat interface with real-time responses
- Semantic search across 100+ document corpus
- Sub-second latency (TTFT < 1s)
- Source attribution with document references
- Error handling and rate limiting
- ~2,000 LOC TypeScript

**Technical Highlights:**
- Implemented progressive enhancement (works without JavaScript)
- Used React Server Components for optimal performance
- Designed efficient vector search with metadata filtering
- Built ingestion pipeline with incremental updates

---

### Platform 2: Cloudflare Workers + Edge Inference

**Live Demo:** [cloudflare-rag-demo.stevenleve.com](https://cloudflare-rag-demo.stevenleve.com)

**Architecture:**
- **Frontend:** React + Vite SPA hosted on Cloudflare Pages
- **Backend:** Cloudflare Workers (Hono framework)
- **LLM:** Llama-3.1-8B via Workers AI (@cf/meta)
- **Embeddings:** BGE Base English (@cf/baai)
- **Vector Database:** Cloudflare Vectorize
- **Storage:** D1 (SQLite), R2 (object storage), KV (key-value)

**Key Features:**
- **On-device inference:** Zero external API calls for LLM
- **Global edge deployment:** ~100ms latency worldwide
- **90%+ cost reduction:** vs. traditional cloud architecture
- **Complete ingestion pipeline:** Document upload → chunking → embedding → storage
- **Semantic search:** Vectorize with hybrid metadata filtering

**Technical Highlights:**
- Built on fully serverless edge infrastructure
- Demonstrated cost optimization through edge inference
- Implemented complete document lifecycle
- Used Cloudflare's AI inference service (Workers AI)
- Showcased distributed systems patterns (stateless architecture)

---

### Platform 3: Jupyter Research Lab

**Repository:** [rag_wiki_demo](https://github.com/SteveLeve/rag_wiki_demo)

**Purpose:** Deep-dive exploration of RAG patterns with systematic evaluation methodology.

**Architecture:**
- **Environment:** Jupyter notebooks with progressive complexity
- **LLM:** Ollama (local inference) + Anthropic Claude (API)
- **Vector DB:** PostgreSQL + pgvector
- **Embeddings:** Hugging Face (BGE Base, Llama models)
- **Framework:** sentence-transformers, langchain components

**Research Structure:**
1. **Foundation:** Basic RAG implementation, chunking strategies
2. **Intermediate:** Reranking, query expansion, hybrid search
3. **Advanced:** Semantic chunking, metadata filtering, citation tracking
4. **Evaluation:** Custom metrics framework with dashboards

**Custom Evaluation Framework:**

Unlike off-the-shelf tools (RAGAS), built ground-up evaluation system:

**Ground-Truth Curation:**
- Created reference question-answer pairs
- Documented expected source documents
- Established baseline performance metrics

**Retrieval Metrics:**
- **Precision@K:** Relevance of top-K results
- **Recall:** Coverage of relevant documents
- **MRR (Mean Reciprocal Rank):** Position of first relevant result
- **NDCG:** Normalized discounted cumulative gain

**Generation Metrics:**
- **BLEU:** N-gram overlap with reference answers
- **ROUGE:** Recall-oriented understudy for gisting evaluation
- **Custom semantic similarity:** Embedding-based answer comparison

**Evaluation Dashboard:**
- Visualization of retrieval performance
- Comparison across RAG configurations
- A/B testing framework for systematic improvement

**Measured Improvements:**
- **Reranking:** +15% Precision@10 over baseline
- **Semantic Chunking:** +22% overall quality score
- **Query Expansion:** +12% Recall@20
- **Hybrid Search:** +18% NDCG vs. vector-only

---

### Platform 4: Claude Marketplace (Agentic Patterns)

**Repository:** [claude-marketplace](https://github.com/SteveLeve/claude-marketplace)

**Purpose:** Personal AI marketplace demonstrating agentic workflows and Model Context Protocol (MCP) integration.

**Key Components:**

**Cloudflare Expert Plugin:**
- Multi-skill coordination (workers, wrangler, platform, AI)
- Interactive workflow commands (/dev, /deploy, /debug)
- MCP integration for external context sources
- Persistent memory across conversations

**Hooks Lab Plugin:**
- Hook demonstration and testing
- Audit trail for workflow execution
- Management interface for plugin configuration

**Technical Innovation:**
- Demonstrated agentic development patterns
- Showcased context engineering with structured data
- Implemented persistent state across agent interactions

---

## Technical Differentiation

### Not Tutorial-Following

Most AI portfolios show completed tutorials or minor variations. This demonstrates:
- **Original architecture decisions** with documented trade-offs
- **Custom evaluation framework** built from scratch
- **Multi-platform deployment** showing flexibility
- **Measured improvements** through systematic experimentation

### Evaluation Rigor

The custom evaluation framework (Platform 3) represents a level of rigor most practitioners lack:
- Ground-truth dataset curation methodology
- Multiple evaluation dimensions (retrieval + generation)
- Baseline measurement before optimization
- A/B testing framework for systematic improvement
- Documented improvements (+15% to +22% measured gains)

### Production Patterns

Both live demos implement production-ready patterns:
- Streaming responses for better UX
- Error handling and graceful degradation
- Rate limiting and abuse prevention
- Source attribution and citation tracking
- Security headers and input validation
- Cost optimization (edge inference reducing costs 90%+)

### Advanced RAG Techniques

Implemented and measured effectiveness of:
- **Reranking:** Improve precision of top results
- **Semantic chunking:** Context-aware document segmentation
- **Query expansion:** Improve recall for ambiguous queries
- **Hybrid search:** Combine vector + keyword matching
- **Citation tracking:** Maintain provenance of information
- **Multi-LLM abstraction:** Swap providers without code changes

---

## Results

### Quantifiable Outcomes

**Shipping Velocity:**
- **4 complete systems** built in <1 week (December 4-9, 2025)
- **Estimated baseline:** 2-3 weeks without AI augmentation
- **2-3x velocity multiplier** through agentic development

**Code Volume:**
- **~5,000+ lines** of production Python and TypeScript
- Full-stack implementation (backend + frontend + infrastructure)
- Production quality with error handling, testing, documentation

**Live Demos:**
- **2 public URLs** accessible 24/7 ([Vercel](https://vercel-rag-demo.stevenleve.com), [Cloudflare](https://cloudflare-rag-demo.stevenleve.com))
- **No authentication required** for immediate evaluation
- **Real-time streaming** chat interface
- **Sub-second latency** in production

**Measured Improvements:**
- **+15% Precision** through reranking implementation
- **+22% overall quality** through semantic chunking
- **+12% Recall** via query expansion
- **+18% NDCG** with hybrid search

### Interview Impact

This portfolio work directly addresses the "lacks hands-on experience" blocker:
- **Concrete evidence** of building production AI applications
- **Live demos** that interviewers can test immediately
- **Code repositories** for technical deep-dives
- **Evaluation rigor** demonstrating engineering maturity
- **Multi-platform deployment** showing architectural flexibility

### Technical Credibility

**Systems Thinking:**
- Demonstrated understanding of distributed systems (edge computing)
- Cost optimization through architecture choices (90%+ reduction)
- Trade-off analysis (API vs. local inference, latency vs. cost)

**Evaluation Maturity:**
- Built custom metrics framework vs. using off-the-shelf
- Ground-truth curation methodology
- Systematic A/B testing and measurement

**Production Readiness:**
- Error handling, rate limiting, security headers
- Streaming responses, source attribution
- Infrastructure as code (deployment automation)

---

## Architectural Decisions

### API vs. Local Inference

**Initial Assumption:** Local LLMs (Ollama) would be viable for cost control and privacy.

**Reality Discovered Through Benchmarking:**
- Local inference: 15-30 second first-token latency
- API inference: Sub-second TTFT (< 1s)
- **Decision:** Use APIs for user-facing, local for research/batch

**Measured Trade-offs:**
- **Latency:** 15-30x faster with APIs
- **Cost:** $6-60/month (API) vs. $61/month (local hardware + power)
- **Quality:** Local 7B models significantly below GPT-4/Claude capability
- **Conclusion:** For interactive applications, API latency is non-negotiable

### Platform Selection

**Vercel Rationale:**
- Fastest path to production for full-stack apps
- Built-in edge functions for backend
- pgvector on Neon provides familiar SQL + vectors
- Standard Next.js patterns developers understand

**Cloudflare Rationale:**
- Showcase edge computing cost optimization
- Demonstrate on-device inference (Workers AI)
- Global latency optimization (~100ms worldwide)
- 90%+ cost reduction vs. traditional architecture

**Jupyter Lab Rationale:**
- Systematic evaluation requires experimentation environment
- Progressive notebooks for teaching/documentation
- Local control for reproducibility
- Flexibility for custom metrics development

---

## Technical Stack

### Frontend
- Next.js 16 (App Router), React 19, TypeScript 5
- Vite + React for Cloudflare demo
- Tailwind CSS for styling
- Streaming chat interfaces

### Backend
- Python (FastAPI, asyncio) for Jupyter work
- Node.js / TypeScript for production APIs
- Cloudflare Workers (Hono framework)
- Vercel Edge Functions

### Databases & Vector Storage
- PostgreSQL + pgvector (Neon, local)
- Cloudflare Vectorize
- Cloudflare D1, R2, KV

### LLMs & Embeddings
- OpenAI GPT-4o
- Anthropic Claude (Sonnet)
- Llama-3.1-8B (@cf/meta via Workers AI)
- BGE Base English embeddings (@cf/baai)
- Ollama (local experimentation)

### Infrastructure & Deployment
- Vercel (serverless deployment)
- Cloudflare Pages + Workers (edge)
- Docker + DevContainers
- Git-based CI/CD

### Evaluation & Monitoring
- Custom metrics framework (Python)
- Jupyter notebooks for visualization
- Error tracking and logging
- Performance monitoring

---

## What This Demonstrates

**For AI Engineering Roles:**
- Hands-on production RAG implementation
- Custom evaluation framework (not off-the-shelf)
- Multi-platform deployment expertise
- Advanced patterns with measured improvements
- Real engineering trade-offs (latency, cost, quality)

**For Technical Leadership Roles:**
- Strategic architecture decisions
- Cost optimization thinking (90%+ reduction)
- Evaluation rigor and measurement
- Documentation and knowledge transfer
- Portfolio-driven execution

**For General Engineering Roles:**
- Full-stack development (Python, TypeScript, React)
- Distributed systems (edge computing, stateless architecture)
- Production patterns (streaming, error handling, security)
- Infrastructure as code
- Systematic experimentation and A/B testing

---

## Code & Demos

**Live Demos:**
- [Vercel RAG Demo](https://vercel-rag-demo.stevenleve.com)
- [Cloudflare RAG Demo](https://cloudflare-rag-demo.stevenleve.com)

**GitHub Repositories:**
- [rag_wiki_demo](https://github.com/SteveLeve/rag_wiki_demo) — Research lab
- [chatbot-demo-vercel](https://github.com/SteveLeve/chatbot-demo-vercel) — Production Vercel
- [chatbot-demo-cloudflare](https://github.com/SteveLeve/chatbot-demo-cloudflare) — Edge deployment
- [claude-marketplace](https://github.com/SteveLeve/claude-marketplace) — Agentic patterns

---

## Contact

Built something interesting? Let's discuss how this approach could apply to your challenges.

**Get in Touch:** [stevenleve.com/contact](https://stevenleve.com/contact)  
**LinkedIn:** [linkedin.com/in/steve-leve](https://linkedin.com/in/steve-leve)

---

[← Back to Case Studies](../case-studies.md)
