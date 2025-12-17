# Case Study: Production RAG Application with Sub-Second Latency

**Role:** AI Engineer / Full-Stack Developer  
**Date:** November 2025  
**Technologies:** Python, FastAPI, React, TypeScript, Vector Databases, LLM APIs (Anthropic, OpenAI), Docker

## Executive Summary

Designed and built a production-ready Retrieval-Augmented Generation (RAG) application that enables users to chat with their data in real-time. The system processes a corpus of 100+ documents, performing semantic search and synthesis with sub-second response times. This project demonstrates the transition from theoretical AI knowledge to practical, high-performance application engineering.

## The Challenge

Traditional keyword search often fails to capture the intent behind user queries, while off-the-shelf LLMs lack specific domain knowledge. The goal was to bridge this gap by building a system that could:
1.  Ingest and "understand" a specific set of documents.
2.  Retrieve the most relevant information based on semantic meaning, not just keywords.
3.  Generate accurate, context-aware answers in real-time.
4.  Provide a user experience comparable to consumer AI products (streaming responses, low latency).

## The Solution

I architected a full-stack RAG pipeline emphasizing performance and modularity.

### Architecture Highlights

*   **Backend (FastAPI):** Built an asynchronous Python web service to handle concurrent requests. Implemented background tasks for document processing to ensure the API remains responsive.
*   **Vector Search:** Integrated vector database operations for semantic retrieval. The system chunks documents, generates embeddings using sentence-transformer models, and performs cosine similarity searches to find relevant context.
*   **Multi-Provider LLM Support:** Designed a flexible abstraction layer supporting Anthropic (Claude), OpenAI, and local Ollama models. This allows for easy switching between providers based on cost/performance needs.
*   **Frontend (React + TypeScript):** Developed a modern Single Page Application (SPA) with a streaming chat interface. Used React hooks for state management and real-time updates.

### Key Technical Decisions

*   **API vs. Local Inference:** Initially experimented with local LLMs (Ollama) for privacy and cost. However, benchmarking revealed a 15-30 second latency, which was unacceptable for interactive use. Pivoted to Anthropic's Claude API, achieving sub-second time-to-first-token (TTFT).
*   **Embedding Strategy:** Evaluated multiple embedding models. Selected a balance between model size and semantic quality. Implemented caching for embeddings to eliminate redundant processing.
*   **Chunking Strategy:** Implemented a sliding window chunking approach with overlap to preserve context across segment boundaries, significantly improving retrieval quality.

## Results

*   **Performance:** Achieved sub-second response latency for chat interactions.
*   **Scale:** Successfully handles a corpus of 100+ documents with efficient retrieval.
*   **Quality:** 2000+ lines of production-quality code, following 12-factor app principles.
*   **Availability:** Containerized with Docker for consistent deployment across environments.

## Artifacts

*   **GitHub Repository:** [chatgpt-data-extractor](https://github.com/SteveLeve/chatgpt-data-extractor)
