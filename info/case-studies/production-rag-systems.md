# Production RAG Systems: Multi-Platform Experimental Lab

[← Back to Case Studies](../case-studies.md)

---

## Executive Summary

Developed a multi-platform RAG (Retrieval-Augmented Generation) experimental unit enabling systematic comparison of AI architectures, platforms, and techniques. Built production-ready implementations on Vercel, Cloudflare Workers, and local Jupyter environments to gain hands-on platform insights, establish reusable patterns for client work, and create controlled environments for evaluating cost, performance, and quality trade-offs.

This work demonstrates production AI engineering through custom evaluation frameworks, measured optimization, and fundamental understanding of RAG architectures—providing the foundation for informed build-vs-buy decisions and rapid deployment on consulting engagements.

**Key Capabilities Established:**
- **Multi-platform deployment expertise** across Vercel, Cloudflare, and local infrastructure
- **2 live production demos** showcasing different architectural approaches
- **Custom evaluation framework** with ground-truth curation for systematic improvement
- **Measured optimization results:** +15% Precision (reranking), +22% quality (semantic chunking)
- **Platform comparison insights** informing hosting, cost, and performance decisions

---

## The Strategic Goal

### Building Deployable AI Capability

As AI application development emerges as a core consulting service, establishing production-ready RAG capabilities requires more than theoretical knowledge. Clients need consultants who can:

- **Deploy immediately** on diverse platforms based on client constraints
- **Evaluate trade-offs** between hosting options with data, not assumptions
- **Optimize systematically** using measurement frameworks, not guesswork
- **Make informed recommendations** on build-vs-buy decisions
- **Demonstrate impact** through quantified improvements

### The Experimental Approach

Rather than learning through client projects (expensive mistakes on client time), I built a controlled experimental unit enabling:

**Platform Comparison:**
- Identical RAG implementations on Vercel, Cloudflare Workers, and local infrastructure
- Direct comparison of cost, latency, deployment complexity, and operational overhead
- Informed recommendations for client hosting decisions

**Reusable Patterns:**
- Production-ready architectures adaptable to client requirements
- Proven deployment workflows reducing client project risk
- Documented trade-offs for common architectural decisions

**Systematic Optimization:**
- Custom evaluation framework for measuring improvement
- Controlled environment for testing embedding models, chunking strategies, retrieval patterns
- Quantified results demonstrating impact on accuracy, speed, and cost

**Fundamental Understanding:**
- Simple, open-source stack maintains proximity to core principles
- Provides perspective when evaluating higher-abstraction platforms (AWS Bedrock, Azure AI Foundry)
- Enables informed build-vs-buy guidance for clients

---

## The Methodology

### Multi-Platform Experimental Design

Built identical RAG implementations across three platforms to enable direct comparison:

**Platform 1: Jupyter Research Lab**
- Local development environment for controlled experiments
- Represents build-from-fundamentals approach
- **Evaluation focus:** Evaluation methodology, optimization techniques, model comparison

**Platform 2: Vercel + Next.js + pgvector**
- Full-stack serverless with familiar PostgreSQL + vector extension
- Represents modern cloud-native approach
- **Evaluation focus:** Deployment simplicity, developer experience, scaling costs

**Platform 3: Cloudflare Workers + Edge Inference**
- Edge computing with on-device LLM inference
- Represents cost-optimized, globally distributed approach
- **Evaluation focus:** Latency optimization, cost reduction, operational simplicity

### Learning Objectives

**1. Platform Insights**
- Direct cost comparison at various scales
- Latency characteristics across geographic distribution
- Deployment complexity and operational overhead
- Vendor lock-in assessment and portability considerations

**2. Production Patterns**
- Streaming responses for improved UX
- Error handling and graceful degradation
- Rate limiting and abuse prevention
- Security best practices across platforms

**3. Optimization Methodology**
- Ground-truth dataset curation for evaluation
- Systematic A/B testing framework
- Quantified measurement of improvements
- Reproducible experimentation process

**4. Technology Evaluation**
- Open-source vs. managed services trade-offs
- Simple stack vs. high-abstraction platforms (Bedrock, AI Foundry)
- Build vs. buy decision frameworks
- Cost-quality-speed triangle navigation

---

## Platform Implementations

Each platform serves specific learning and comparison objectives, creating a comprehensive experimental unit for evaluating RAG architectures, hosting options, and optimization techniques.

### Platform 3: Jupyter Research Lab

**Repository:** [rag_wiki_demo](https://github.com/SteveLeve/rag_wiki_demo)

**Learning Objectives:**
- Controlled environment for systematic experimentation
- Embedding model comparison (BGE, E5, OpenAI, domain-specific)
- LLM provider evaluation (local vs. API, quality vs. cost)
- Chunking strategy optimization
- Retrieval technique measurement and comparison
- Ground-truth evaluation methodology development

**Purpose:** Deep-dive exploration of RAG fundamentals with systematic evaluation methodology. This platform serves as the experimental foundation for understanding what works, why it works, and how to measure improvement quantitatively.

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

### Platform 2: Vercel + Next.js 16 + pgvector

**Live Demo:** [vercel-rag-demo.stevenleve.com](https://vercel-rag-demo.stevenleve.com)

**Learning Objectives:**
- Modern full-stack serverless patterns
- PostgreSQL + vector extension integration
- Familiar SQL patterns for enterprise adoption
- Deployment simplicity for rapid client delivery

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

### Platform 3: Cloudflare Workers + Edge Inference

**Live Demo:** [cloudflare-rag-demo.stevenleve.com](https://cloudflare-rag-demo.stevenleve.com)

**Learning Objectives:**
- Edge computing cost optimization strategies
- On-device inference trade-offs (latency, quality, cost)
- Global distribution patterns
- Stateless architecture at scale
- Comparing centralized vs. distributed deployment

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

## Technical Capabilities & Methodology

### Systematic Evaluation Framework

The custom evaluation framework (Platform 1) enables data-driven optimization and client impact demonstration:
- **Ground-truth dataset curation** methodology for baseline establishment
- **Multiple evaluation dimensions** (retrieval precision + generation quality)
- **A/B testing framework** for systematic improvement validation
- **Documented improvements** (+15% to +22% measured gains)
- **Reproducible experimentation** process applicable to client domains

This evaluation rigor is essential for:
- Demonstrating ROI to clients with quantified metrics
- Comparing vendor platforms with actual data
- Optimizing cost-quality-speed trade-offs systematically
- Making informed build-vs-buy recommendations

### Production Engineering Patterns

Both live demos implement production-ready patterns ready for client deployment:
- **Streaming responses** for improved user experience
- **Error handling** and graceful degradation
- **Rate limiting** and abuse prevention
- **Source attribution** and citation tracking
- **Security headers** and input validation
- **Cost optimization** (edge inference reducing costs 90%+)

### Advanced RAG Techniques with Measured Effectiveness

Implementation and quantified evaluation of:
- **Reranking:** +15% Precision improvement over baseline
- **Semantic chunking:** +22% overall quality through context preservation
- **Query expansion:** +12% Recall for ambiguous queries
- **Hybrid search:** +18% NDCG combining vector + keyword
- **Citation tracking:** Maintain information provenance
- **Multi-LLM abstraction:** Provider flexibility without code changes

### Platform Comparison Insights

Direct comparison of identical RAG implementations reveals*:

**Cost at 10K queries/day:**
- Vercel: ~$30-50/month (database + functions)
- Cloudflare: ~$5-10/month (90%+ reduction)
- Local: $61/month (hardware depreciation + power)

**Latency characteristics:**
- Vercel (regional): 200-400ms (US-based traffic)
- Cloudflare (edge): 80-150ms globally
- Local (API): <1s TTFT, Local (Ollama): 15-30s TTFT

**Deployment complexity:**
- Vercel: Hours to production (familiar patterns)
- Cloudflare: 1-2 days (learning curve, edge constraints)
- Local: Immediate (full control, ops overhead)

**When to recommend each:**
- **Vercel:** Fastest client delivery, enterprise comfort with PostgreSQL
- **Cloudflare:** Cost-sensitive projects, global user base, high scale
- **Local/On-prem:** Data sensitivity, compliance requirements, batch processing

* provisional metrics, significant refinement planned as more data becomes available.

---

## Results

### Consulting Capability Established

**Production-Ready Deployments:**
- **2 live public demos** ([Vercel](https://vercel-rag-demo.stevenleve.com), [Cloudflare](https://cloudflare-rag-demo.stevenleve.com))
- Accessible 24/7 for client demonstrations
- Real-time streaming responses with sub-second latency
- Production error handling, rate limiting, security headers

**Reusable Architecture Patterns:**
- **~5,000+ lines** of production-quality code (Python, TypeScript)
- Documented architectural decisions and trade-offs
- Deployment workflows for rapid client project initiation
- Infrastructure-as-code patterns for reproducibility

**Platform Comparison Insights:**
- **Cost:** Cloudflare edge = 90%+ reduction vs. traditional cloud
- **Latency:** Edge deployment = ~100ms globally vs. regional hosting
- **Complexity:** Vercel = fastest to production, Cloudflare = lowest operating cost
- **Portability:** Open-source stack = minimal vendor lock-in

### Precision: Measured Optimization

**Custom Evaluation Framework:**
- Ground-truth dataset curation methodology
- Multi-dimensional metrics (retrieval + generation quality)
- Baseline measurements enabling systematic improvement
- A/B testing framework for controlled experimentation

**Quantified Improvements:**
- **+15% Precision@10** through reranking implementation
- **+22% overall quality** through semantic chunking optimization
- **+12% Recall@20** via query expansion
- **+18% NDCG** with hybrid search vs. vector-only

**Evaluation Rigor:**
- Built custom metrics vs. using off-the-shelf frameworks (RAGAS)
- Documented methodology for client project application
- Reproducible experimentation process
- Systematic rather than ad-hoc optimization

### Accuracy: Engineering Trade-offs

**API vs. Local Inference Analysis:**
- **Latency:** 15-30x faster with APIs (sub-second vs. 15-30s first-token)
- **Cost:** Usage-based API vs. fixed hardware costs
- **Quality:** GPT-4/Claude significantly exceed local 7B models
- **Decision framework:** Interactive apps require API latency, batch/privacy use local

**Platform Selection Rationale:**
- Vercel: Fastest path to production, familiar patterns
- Cloudflare: Cost optimization, global distribution
- Jupyter: Experimentation flexibility, reproducibility
- Each platform serves different client constraint profiles

**Advanced RAG Techniques:**
- Reranking for precision improvement
- Semantic chunking for context preservation
- Query expansion for recall optimization
- Hybrid search combining vector + keyword
- Citation tracking for transparency
- Multi-LLM abstraction for provider flexibility

### Speed: Efficient Development

**Development Efficiency:**
- AI-augmented development patterns reducing iteration time
- Reusable components across platform implementations
- Documented patterns accelerating future projects
- Infrastructure-as-code enabling rapid deployment

**Client Project Readiness:**
- Proven architectures ready for immediate deployment
- Platform comparison data informing client recommendations
- Evaluation frameworks applicable to client domains
- Production patterns reducing project risk

---

## Ongoing Experimentation & Applications

### Active Research Areas

**Embedding Model Comparison:**
- Testing BGE, E5, OpenAI, and domain-specific models
- Measuring retrieval quality across different embedding dimensions
- Cost-performance trade-offs for various model sizes
- Multilingual embedding evaluation

**LLM Provider Evaluation:**
- Comparing OpenAI GPT-4o, Anthropic Claude, local Llama models
- Quality vs. cost analysis at scale
- Latency characteristics for different use cases
- Context window utilization and performance

**Retrieval Strategy Optimization:**
- Hybrid search weight tuning (vector vs. keyword)
- Metadata filtering strategies and performance
- Chunk size optimization for different document types
- Cross-encoder reranking effectiveness

**Cost Optimization Experiments:**
- Caching strategies for repeated queries
- Embedding storage optimization
- LLM call reduction through intelligent routing
- Edge vs. cloud cost models at various scales

### Client Application Scenarios

**Enterprise Knowledge Management:**
- Document corpus: Internal documentation, policies, procedures
- Scale: 10K-100K documents
- Focus: Accuracy and compliance over cost
- Platform: Vercel for security + control

**Customer Support Automation:**
- Document corpus: FAQs, product documentation, support tickets
- Scale: Real-time, high query volume
- Focus: Latency and cost optimization
- Platform: Cloudflare edge for global distribution

**Research & Analysis:**
- Document corpus: Academic papers, research databases
- Scale: Deep analysis, complex queries
- Focus: Quality and citation accuracy
- Platform: Local for data sensitivity + experimentation

### Reusable Consulting Deliverables

**Architecture Decision Records:**
- Platform selection framework with decision criteria
- Cost modeling spreadsheets for various scales
- Performance benchmarking methodology
- Security and compliance checklists

**Implementation Patterns:**
- Docker-based local development environments
- CI/CD pipelines for automated deployment
- Infrastructure-as-code templates (Terraform, CloudFormation)
- Monitoring and alerting configurations

**Client Workshops:**
- Build-vs-buy evaluation workshops
- RAG architecture overview and trade-offs
- Evaluation framework design for client domains
- Production readiness checklists

---

---

## Architectural Decisions & Learning

### API vs. Local Inference: Measured Trade-offs

**Hypothesis:** Local LLMs (Ollama) would be viable for cost control and privacy requirements.

**Experimental Results:**
| Metric | Local (Ollama 7B) | API (GPT-4o/Claude) | Ratio |
|--------|------------------|---------------------|-------|
| First-token latency | 15-30 seconds | <1 second | 15-30x |
| Monthly cost (10K queries) | $61 (hardware+power) | $6-60 (usage-based) | Comparable |
| Response quality | Acceptable for simple Q&A | High for complex reasoning | Significant |
| Use case fit | Batch, research, privacy | Interactive, production | Context-dependent |

**Client Advisory Framework:**

Use **local inference** when:
- Data cannot leave premises (compliance, security)
- Batch processing acceptable (non-interactive)
- Budget for hardware investment exists
- Privacy requirements paramount

Use **API inference** when:
- Interactive applications (chat, search)
- Variable workload (pay-per-use advantage)
- Bleeding-edge model quality required
- Fast iteration and deployment needed

### Platform Selection Rationale

**Vercel Selection Drivers:**
- Fastest path to production for full-stack applications
- Familiar PostgreSQL + pgvector for enterprise adoption
- Standard Next.js patterns reduce client onboarding friction
- Integrated edge functions for backend APIs
- **Best for:** Enterprise clients, rapid delivery, SQL familiarity

**Cloudflare Selection Drivers:**
- Showcase dramatic cost optimization potential (90%+ reduction)
- Demonstrate edge computing and global distribution
- On-device inference exploration (Workers AI)
- **Best for:** Cost-sensitive projects, global scale, high-volume applications

**Jupyter Lab Selection Drivers:**
- Controlled environment for reproducible experiments
- Progressive complexity for learning and documentation
- Freedom from vendor constraints during research
- Custom evaluation framework development
- **Best for:** R&D, optimization, vendor evaluation, training

### Build vs. Buy Decision Framework

**Simple Stack (Open Source) Advantages:**
- Deep understanding of fundamental principles
- Perspective when evaluating platforms (Bedrock, AI Foundry, Vertex AI)
- No vendor lock-in, maximum portability
- Lower costs at small-medium scale
- Full control over optimization

**Higher Abstraction Platforms (Bedrock, AI Foundry) Advantages:**
- Faster initial deployment (managed infrastructure)
- Enterprise support and SLAs
- Integrated monitoring and governance
- Simplified compliance (SOC2, HIPAA, etc.)
- Better at large scale (>100K queries/day)

**Informed Client Recommendations:**

Having built both ways enables data-driven recommendations:
- **Startups/SMBs:** Start simple (Vercel/Cloudflare), validate product-market fit
- **Growing companies:** Maintain optionality, avoid premature optimization
- **Enterprises:** Evaluate managed platforms when scale/compliance justifies cost
- **All clients:** Build POC with simple stack, measure actual requirements before committing to platform

This experimental methodology provides concrete cost/performance data rather than vendor marketing claims.

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

**For AI Application Development Services:**
- Production RAG implementation across multiple platforms
- Custom evaluation frameworks for systematic optimization
- Platform comparison methodology informing client recommendations
- Measured improvements demonstrating impact on quality metrics
- Reusable patterns reducing client project risk and timeline

**For Technical Advisory & Architecture:**
- Strategic architecture decisions with quantified trade-offs
- Build-vs-buy evaluation framework (open-source vs. managed platforms)
- Cost optimization through informed platform selection (90%+ reduction possible)
- Distributed systems understanding (edge computing, stateless architecture)
- Risk management through systematic evaluation before client deployment

**For Client Consulting Engagements:**
- **Rapid deployment capability:** Proven architectures ready for immediate use
- **Platform flexibility:** Can recommend and implement across Vercel, Cloudflare, AWS, Azure based on client constraints
- **Measurement discipline:** Evaluation frameworks applicable to client domains and success metrics
- **Cost-conscious engineering:** Demonstrated ability to optimize without sacrificing quality
- **Knowledge transfer:** Documented patterns and decisions enabling client team ownership

**For Strategic Technology Evaluation:**
- Simple stack approach maintaining proximity to fundamentals
- Provides perspective when evaluating enterprise platforms (AWS Bedrock, Azure AI Foundry, Google Vertex AI)
- Enables informed build-vs-buy recommendations based on client scale and requirements
- Demonstrates understanding of abstraction layers and their cost/flexibility trade-offs

---

## Code & Demos

**Live Production Demos:**
- **[Vercel RAG Demo](https://vercel-rag-demo.stevenleve.com)** — Full-stack serverless with PostgreSQL + pgvector. Demonstrates enterprise-friendly patterns with familiar SQL integration and rapid deployment workflows.
- **[Cloudflare RAG Demo](https://cloudflare-rag-demo.stevenleve.com)** — Edge computing with Workers AI. Demonstrates 90%+ cost reduction through distributed inference and global deployment patterns.

**GitHub Repositories:**
- **[rag_wiki_demo](https://github.com/SteveLeve/rag_wiki_demo)** — Jupyter research lab with custom evaluation framework. Progressive notebooks demonstrate fundamental RAG principles, optimization techniques, and systematic measurement methodology.
- **[chatbot-demo-vercel](https://github.com/SteveLeve/chatbot-demo-vercel)** — Production Vercel implementation. Full-stack Next.js 16 + React 19 with streaming responses, TypeScript type safety, and pgvector integration.
- **[chatbot-demo-cloudflare](https://github.com/SteveLeve/chatbot-demo-cloudflare)** — Edge deployment implementation. Cloudflare Workers + Hono framework with on-device inference and complete document lifecycle management.

---

## Contact

Need AI capabilities that balance accuracy, precision, and speed? Let's discuss how systematic evaluation, platform comparison, and production-ready patterns can accelerate your AI initiatives while managing cost and risk.

**Live Demos:**
- [Vercel RAG Demo](https://vercel-rag-demo.stevenleve.com) — Enterprise-ready full-stack
- [Cloudflare RAG Demo](https://cloudflare-rag-demo.stevenleve.com) — Cost-optimized edge deployment

**Get in Touch:** [stevenleve.com/contact](https://stevenleve.com/contact)  
**LinkedIn:** [linkedin.com/in/steve-leve](https://linkedin.com/in/steve-leve)

---

[← Back to Case Studies](../case-studies.md)
