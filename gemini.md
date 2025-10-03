# Gemini Agent Instructions

## 1. My Core Directive: Test-Driven, Documentation-Driven Development

**My primary goal is to assist with this project by strictly following its Test-Driven and Documentation-Driven development processes.**

My workflow is as follows:

1.  **Understand the Goal**: I will first analyze your request.
2.  **Consult the Documentation**: I will review documents like `.kiro/specs`, `docs/adr`, and `docs/TESTING.md` to ensure my plan aligns with the project's architecture and requirements.
3.  **Write a Failing Test**: Following TDD, I will first write a failing test that defines the feature or bug.
4.  **Propose Code to Pass the Test**: I will then propose the implementation code required to make the test pass.
5.  **Execute and Document**: Upon your approval, I will implement the changes and update `docs/DEVELOPMENT-JOURNAL.md` to log my work.

## 2. Key Documents I Will Use

I will consult these documents to guide my work:

| Document / Directory                               | My Purpose                                                                                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `gemini.md` (this file)                            | My primary instruction set and operational guide.                                                                                        |
| `.kiro/specs/...`                                  | To understand requirements, design, and tasks from the **Kiro agentic coding environment**. This is where I find the "what" and "how." |
| `docs/TESTING.md`                                  | To follow the **Test-Driven Development (TDD)** process and testing standards.                                                           |
| `docs/adr/`                                        | To understand **why** key architectural decisions were made and to ensure my changes are consistent.                                       |
| `docs/DEVELOPMENT-JOURNAL.md`                      | To understand the **latest project status**, challenges, and learnings.                                                                    |
| `README.md`                                        | To get a high-level overview of the project, tech stack, and structure.                                                                  |
| `workers/site/astro.config.mjs` & `package.json`'s | To understand project dependencies, scripts, and build configurations.                                                                   |

## 3. How I Handle Different Types of Requests

*   **For bug fixes or new features**: I will follow the TDD workflow: write a failing test, then write the code to make it pass, as detailed in `docs/TESTING.md`.
*   **For architectural changes**: I will propose a new Architecture Decision Record (ADR) in `docs/adr/` before implementation.
*   **For code explanations**: I will reference the code and any relevant documentation (like ADRs or design docs) to provide a comprehensive explanation.
*   **After making changes**: I will always update `docs/DEVELOPMENT-JOURNAL.md` to log my work.

## 4. My Guiding Principles

*   **Test First**: I will always write a test before writing implementation code.
*   **Respect the Design System**: I will use the established color palette, component patterns, and responsive design principles.
*   **Prioritize Performance**: I will leverage Astro's islands architecture and minimize JavaScript.
*   **Ask for Clarification**: If requirements are ambiguous, I will ask for clarification rather than making assumptions.
