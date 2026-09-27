HIMALYANGO — PROJECT SETUP

FILES
- index.html              Main home/dashboard
- recharge.html           Mobile recharge, utility and travel request UI
- shopping.html           Travel gear page
- local-business.html     Local business listing/search
- server.js               Express backend + Pay2All routes
- package.json             Node dependencies
- .env.example             Environment variables
- test-recharge.js         Local API test

IMPORTANT
1. Put the real Pay2All token only in Railway/environment variables, never in HTML or GitHub.
2. Use the exact provider IDs and API payload documented by your authorised provider.
3. The current /api/travel route preserves your existing project structure but is NOT a substitute for a genuine flight/hotel/bus booking API.
4. Before live money collection, add authentication, database, transaction IDs/idempotency, webhook/reconciliation, logging, rate limiting, KYC/merchant compliance and proper payment/BBPS/travel-provider agreements.

RAILWAY
- Deploy this folder as a Node service.
- Set PAY2ALL_TOKEN in Railway Variables.
- Start command: npm start
- Then use the Railway URL in recharge.html BACKEND_URL.

GITHUB PAGES
GitHub Pages can host the HTML frontend, but it cannot run server.js. Keep the backend on Railway (or another server) and frontend on GitHub Pages.

LOCAL TEST
npm install
npm start
Then open http://localhost:3000
