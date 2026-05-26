This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## What Is Included

- Login, register, forgot-password, and reset-password pages.
- A reusable Supabase browser client helper.
- Tailwind-based auth layouts with a more polished visual style.
- A simple authenticated dashboard at `/dashboard`.
- A Supabase SQL example in [supabase/schema.sql](supabase/schema.sql) for a `profiles` table and RLS policies.

## Supabase Setup

1. Copy [.env.local.example](.env.local.example) to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project.
3. Set `NEXT_PUBLIC_APP_URL` to your local or deployed app URL.
4. In Supabase, allow your app URL in the auth redirect settings.
5. Run the SQL in [supabase/schema.sql](supabase/schema.sql) in the Supabase SQL editor.

## Database Example

The included schema creates a `profiles` table keyed by the authenticated user ID. It also adds a trigger that inserts or updates a profile row whenever a new Supabase auth user is created, and RLS policies that restrict reads and writes to the row owned by the current user.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
