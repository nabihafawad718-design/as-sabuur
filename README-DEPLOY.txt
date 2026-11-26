AS-SABUUR — QUICK DEPLOY

Full instructions: docs/DEPLOYMENT.md

1. npm install
2. cp .env.example .env   (fill in DATABASE_URL, ADMIN_PASSCODE, ADMIN_SECRET)
3. npx drizzle-kit push
4. Optional: seed sample content only into a NEW empty database after reading the warning below.
5. npm run dev                (check http://localhost:3000)
6. npm run typecheck && npm run build
7. Push to GitHub, import the repo in Vercel.
8. Add DATABASE_URL, ADMIN_PASSCODE and ADMIN_SECRET in Vercel → Settings → Environment Variables.
9. Deploy, then add the domain as-sabuur.com.

Notes
- The seed script clears existing program, essay, reflection and verse rows before inserting sample content. NEVER run it against a database containing real academy data.
- The homepage and the new Experience, Pricing, Class Details and Global Trust pages can be viewed without seeding sample content. Database-backed pages and forms need a configured PostgreSQL database.
- ADMIN_PASSCODE and ADMIN_SECRET are both required. There is no default passcode.
- No payment provider is connected. Current fees are shared directly by the academy; enrolment is arranged directly.
- The project includes original SVG artwork and a social-preview image. See docs/PHOTOGRAPHY-BRIEF.md for future photography guidance.
- Before launch, read docs/CONTENT-VERIFICATION.md and confirm every ⚠️ item.

VISIBLE WEBSITE CHANGES
-----------------------
The main navigation includes Experience, Courses, Pricing, Class Details, Contact and Global Trust. Each of the Experience, Pricing, Class Details and Global Trust links opens its own route with its own page content and layout. The Pricing page intentionally does not show unapproved sample amounts; contact the academy for current fees.

For a list of this delivery's changes and verification limits, see PROJECT-CHANGES-THIS-DELIVERY.txt.
