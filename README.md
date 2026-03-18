# SewaSetu

Production-ready Next.js + NextAuth + Prisma app for Nepal government service portals.

## 1. Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env file and fill values:

```bash
cp .env.example .env.local
```

3. Apply schema and seed data:

```bash
npm run db:push
npm run db:seed
```

4. Start development server:

```bash
npm run dev
```

## 2. Go Live With GitHub + Vercel

1. Push code to GitHub:

```bash
git add .
git commit -m "Prepare production deployment"
git push origin <your-branch>
```

2. In Vercel:

- Import your GitHub repository.
- Framework preset: Next.js.
- Build command: `npm run vercel-build`.
- Output directory: leave default.

3. Add environment variables in Vercel (Production + Preview):

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (set to your Vercel URL, for example `https://your-app.vercel.app`)

4. Deploy.

5. Run DB initialization against production database once:

```bash
npm run db:push
npm run db:seed
```

## 3. Database Notes (Neon)

- Use pooled Neon connection for `DATABASE_URL`.
- Use direct Neon connection for `DIRECT_URL`.
- Both should include `?sslmode=require`.

## 4. Admin Login

After running the seed script, default accounts are:

- Admin: `admin@sewasetu.com.np` / `admin123!`
- Demo user: `demo@sewasetu.com.np` / `demo1234`

How to access admin panel:

1. Sign in from `/login`.
2. Open `/admin` directly, or use the Admin Panel link from dashboard sidebar.

Security recommendation:

- Change the default admin password immediately after first production login.

## 5. Login Verification Status

Verified on 2026-03-18 using the live auth callback endpoint:

- Admin credentials: login success.
- Demo credentials: login success.
- Newly registered user credentials: login success.
- Wrong password: rejected with HTTP 401.

This confirms multi-account credentials login is working.
