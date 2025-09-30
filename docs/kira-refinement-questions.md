**Technical Stack & Architecture:**

1. **Question:** For the Astro \+ React setup, do you want to maintain the current visual design and content structure, or are you planning significant changes to the UI/UX?

   **Answer:** I plan significant changes, if it is better to start with a standard Astro project and import layouts and content that is acceptable. 

2. **Question:** Since you're moving from a simple static site to Cloudflare Workers \+ Astro, what dynamic functionality are you planning to add? (e.g., contact forms, CMS integration, analytics, etc.)

   **Answer:** In the short term I will add contact forms, longer term a client area with secure login. 

3. **Question:** For the "headless CMS" mentioned in your workshop projects \- do you have a preference for which CMS (Contentful, Strapi, Sanity, etc.) or should I recommend one based on your use case?

   **Answer:** CMS is optional, headless is not. If there is a lightweight headless CMS that is modern and well supported I will consider it. I am not entirely opposed to a static Astro site and will consider using an established blogging platform for regular publications. 

**Deployment & Infrastructure:** 

1. **Question:** You mentioned GitHub Actions for deployment automation \- do you want separate staging/production environments, or just production deployment to Cloudflare Pages?

   **Answer:** Ideally I would like to incorporate a staging environment where authorized users can preview changes. There should be local development, staging, and production environments.

2. **Question:** Are you planning to use Terraform for infrastructure management from the start, or would you prefer to begin with Wrangler CLI and migrate to Terraform later?

   **Answer:** I am flexible for speed and simplicity but prefer to use Terraform where appropriate as a way to learn the technology in a real world scenario. 

**Content & Features:** 

1. **Question:** Looking at your current site, should the new version maintain the same sections (services, case studies, about, contact) or are you planning to add/modify any sections?

   **Answer:** I may modify the sections, I am working on content refinement and information architecture in another thread.

2. **Question:** For the contact functionality, do you want to implement server-side form handling with Cloudflare Workers, or integrate with a third-party service?

   **Answer:** Let’s develop a solution using Cloudflare Workers. I have not yet setup email services for my domain(s) and may need to do so as part of this solution. 

**Project Scope:** 

1. **Question:** Is this primarily a learning/experimentation project where we prioritize trying new technologies, or do you need it production-ready quickly for your consulting business?

   I have recently lost my job due to layoff. My purpose is multi-fold. I am actively seeking work on any terms (full time salaried, contract, or project based). I am developing this consultancy website to showcase my professional services for potential clients, have a personal website to list on applications (I have no other personal website), and refresh stale front-end skills while developing new skills in DevOps technologies (k8s, terraform). This project is one of a series of projects in my professional development initiative. I need this site to be production ready ASAP because it is blocking other initiatives, I must establish this web presence to satisfy expectations of job applications.