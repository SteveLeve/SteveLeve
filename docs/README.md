# Documentation

This directory contains all architectural, design, and decision records for the project.

---

## Philosophy

- **Test First, Document First**: Write failing tests, then document the intention, then implement the code.
- **Living Docs**: Capture *what, why, and how thinking changed*.
- **AI-Friendly**: Consistent, structured docs that LLM agents can consume.

---

## Structure

- `spec/` — Platform overview, UI specs, functional requirements
- `adr/` — Architecture decision records (ADR format)
- `api/` — API schemas, authentication flows
- `diagrams/` — System, data flow, and deployment diagrams (Mermaid)
- `TESTING.md` — The project's **Test-Driven Development (TDD)** strategy.
- `DEVELOPMENT-JOURNAL.md` — Log of learnings, changes, intentions

---

## Workflow

1.  **Write a Failing Test**: See `TESTING.md` for instructions.
2.  **Draft Spec or ADR**: Document the intention before making changes.
3.  **Implement Code**: Write the code to pass the test.
4.  **Log Lessons**: Update `DEVELOPMENT-JOURNAL.md`.
