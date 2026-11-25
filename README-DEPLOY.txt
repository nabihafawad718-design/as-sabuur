AS-SABUUR — QUICK DEPLOY

Full instructions: docs/DEPLOYMENT.md

1. npm install
2. cp .env.example .env   (fill in DATABASE_URL, ADMIN_PASSCODE, ADMIN_SECRET)
3. npx drizzle-kit push
4. npx tsx src/db/seed.ts     (optional: gatherings, journal essays, verses)
5. npm run dev                (check http://localhost:3000)
6. npm run typecheck && npm run build
7. Push to GitHub, import the repo in Vercel.
8. Add DATABASE_URL, ADMIN_PASSCODE and ADMIN_SECRET in Vercel → Settings → Environment Variables.
9. Deploy, then add the domain as-sabuur.com.

Notes
- ADMIN_PASSCODE and ADMIN_SECRET are both required. There is no default passcode.
- No payment provider is connected. Pricing is displayed; enrolment is arranged directly.
- No images ship with the site. All visuals are original SVG. See docs/PHOTOGRAPHY-BRIEF.md.
- Before launch, read docs/CONTENT-VERIFICATION.md and confirm every ⚠️ item.
