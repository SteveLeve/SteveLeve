# Testing Strategy

This document outlines the testing strategy for the Steve Leve Consulting Website project. Our goal is to ensure a high-quality, reliable, and performant application.

## 1. Test-Driven Development (TDD)

This project prefers a **Test-Driven Development (TDD)** approach for all new features and bug fixes. The development workflow should be as follows:

1.  **Write a Failing Test**: Before writing any implementation code, write an automated test that reproduces the bug or defines the new feature. This test should fail.
2.  **Write Code to Pass the Test**: Write the minimum amount of code required to make the test pass.
3.  **Refactor**: Refactor the code to improve its structure, readability, and performance while ensuring the test still passes.

## 2. Types of Testing

### a. Unit & Integration Tests (Vitest)

-   **Framework**: We will use [Vitest](https://vitest.dev/) for unit and integration testing, as it integrates seamlessly with our Vite-based Astro environment.
-   **Location**: Tests should be located in the same directory as the component or module they are testing, using a `*.test.ts` or `*.spec.ts` naming convention.
-   **Scope**: All new business logic, UI components, and API endpoints must be accompanied by tests.

### b. End-to-End (E2E) Tests (Playwright)

-   **Framework**: [Playwright](https://playwright.dev/) is the chosen framework for E2E testing to simulate user interactions and verify critical user flows.
-   **Flows to Cover**:
    -   Contact form submission.
    -   Navigation and page rendering.
    -   Theme switching (light/dark mode).

### c. Performance Auditing (Lighthouse)

-   **Tool**: Google Lighthouse will be used to audit performance, accessibility, best practices, and SEO.
-   **Target**: All pages should maintain a Lighthouse score of **90+** across all categories.
-   **Process**: Audits should be run before and after significant changes to monitor the impact on performance.

### d. Manual & Cross-Browser Testing

-   **Process**: Before a feature is considered complete, it must be manually tested on the latest versions of major browsers (Chrome, Firefox, Safari, Edge).
-   **Scope**: Manual testing should verify:
    -   Responsive design on various screen sizes (mobile, tablet, desktop).
    -   Accessibility features (keyboard navigation, screen reader compatibility).
    -   Correct rendering and functionality.

## 3. Running Tests

To run the automated tests, use the following command in the appropriate workspace (`/workers/site` or `/workers/api`):

```bash
npm test
```
