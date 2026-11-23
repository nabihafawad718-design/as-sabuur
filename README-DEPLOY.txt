1. Copy these 3 files into the ROOT of your project (next to package.json):
   drizzle.config.ts, .gitignore, .env.example
2. DELETE the old drizzle.config.json (replaced by drizzle.config.ts).
3. Nothing else in your template changes.
4. Push to GitHub, import repo in Vercel, add DATABASE_URL, ADMIN_PASSCODE, ADMIN_SECRET.
5. Create .env locally with the same DATABASE_URL, then run once:
   npx drizzle-kit push
   npx tsx src/db/seed.ts
6. Redeploy in Vercel.
