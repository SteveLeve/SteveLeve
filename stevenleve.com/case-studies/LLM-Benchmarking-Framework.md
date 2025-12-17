# Case Study: Open-Source Intel GPU LLM Benchmarking Framework

**Role:** AI Engineer / Researcher  
**Date:** October - November 2025  
**Technologies:** Python, OpenVINO, llama.cpp, Ollama, Shell Scripting, Intel Hardware

## Executive Summary

Developed an open-source benchmarking framework to systematically evaluate the performance of Large Language Models (LLMs) on consumer hardware, specifically focusing on Intel GPU acceleration. The project provides data-driven insights into the viability of local inference for production applications.

## The Challenge

With the explosion of open-source LLMs (Llama 3, Mistral, etc.), developers face a paradox of choice regarding models and hardware. Specifically, the performance trade-offs of running models locally on Intel integrated graphics (iGPU) versus CPU-only execution were not well documented. I needed to determine if local inference was a viable alternative to cloud APIs for interactive applications.

## The Solution

I created a reproducible benchmarking suite that automates the testing of various model configurations.

### Technical Implementation

*   **Hardware Acceleration:** Leveraged the OpenVINO toolkit to offload inference to Intel GPUs, comparing results against CPU-only baselines using llama.cpp.
*   **Automated Testing:** Wrote shell scripts to orchestrate the download, configuration, and execution of tests across multiple models and quantization levels.
*   **Metrics Collection:** Automated the capture of key performance indicators:
    *   Time to First Token (TTFT)
    *   Tokens Per Second (TPS)
    *   Peak Memory Usage
    *   Model Load Time

### Models Benchmarked

*   Mistral 7B (Q4, Q5, Q8 quantizations)
*   Llama 3 8B
*   QWEN3 VL (Vision-Language)
*   GPT-J 6B, Phi-2, TinyLlama

## Key Findings

1.  **GPU Acceleration:** Achieved **2-4x speedup** for 7B+ parameter models on Intel GPUs compared to CPU baselines.
2.  **Quantization Sweet Spot:** 4-bit quantization (Q4) offered a **40% speed gain** over 8-bit (Q8) with minimal perceptible loss in output quality for general tasks.
3.  **Latency Bottleneck:** Despite throughput improvements, first-token latency remained in the 15-30 second range for 7B models on consumer hardware. This finding was critical in the decision to use cloud APIs for user-facing interactive applications.

## Impact

*   **Open Source:** Released the framework under the MIT license to the community.
*   **Decision Support:** Provided the empirical data needed to justify architectural decisions (API vs. Local) in subsequent projects.
*   **Knowledge Sharing:** Comprehensive documentation enables other developers to reproduce results and benchmark their own hardware.

## Artifacts

*   **GitHub Repository:** [intel-gpu-llm-inference](https://github.com/SteveLeve/intel-gpu-llm-inference)
