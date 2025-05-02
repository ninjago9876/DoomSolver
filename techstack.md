1. Authentication & Data Storage
--------------------------------
- Firebase (Spark Plan)
  - Handles user authentication (email, Google, etc.)
  - Stores custom question sets and user data
  - Secured using Firestore rules

2. Backend Logic & Processing
-----------------------------
- Cloudflare Workers
  - Validates answers and handles secure logic
  - Runs at the edge, globally distributed
  - Free for up to 100,000 requests/day

3. Frontend Framework
---------------------
- React (with Vite)
  - Fast and modern single-page application setup
  - Uses TypeScript for type safety and developer experience

4. Styling
----------
- TailwindCSS
  - Utility-first CSS framework
  - Enables rapid and consistent UI development

5. Math Display and Interaction
-------------------------------
- MathJax
  - Renders clean math notation using LaTeX-style syntax

- Desmos API
  - Embeds interactive graphs and math visualizations
