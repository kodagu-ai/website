# Kodagu.ai

The community open-source hub for **Kodagu** (Kodava community, Karnataka, India).
_Rooted in Heritage. Driven by Purpose._

Built with [Next.js](https://nextjs.org) (App Router) and deployed on
[Vercel](https://vercel.com). Styled directly from the Kodagu.ai Brand Book —
Barlow Condensed type; Black `#111111`, Gold `#D4AF37`, Red `#C8102E`.

The first project is **Aane Alert**, an open elephant early-warning network.
The site is built to grow: adding a project is a single-file edit.

---

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Other commands:

```bash
npm run build   # production build
npm start       # serve the production build
```

---

## Add a new project (no coding required beyond one file)

Everything about a project lives in **`app/lib/projects.ts`**. To add one, copy
the `aane-alert` object, change the fields, and give it a new `slug`. It will
automatically appear on the home page and get its own page at
`/projects/<slug>`. That's it.

Common edits:

| What | Where |
| --- | --- |
| Add / edit a project | `app/lib/projects.ts` |
| Site name, tagline, GitHub URL, contact email | `app/lib/site.ts` |
| Colors, fonts, spacing | `app/globals.css` (top of file) |
| Home page copy | `app/page.tsx` |
| About page | `app/about/page.tsx` |
| Get Involved page | `app/join/page.tsx` |
| Logo / favicon | `public/kodagu-logo.png`, `public/icon.svg` |

---

## Deploy to Vercel

You have two options. **Option A (GitHub + Vercel)** is recommended because
every future `git push` will auto-deploy. **Option B (CLI)** is the fastest way
to get a live URL right now.

### Option A — GitHub + Vercel (recommended)

1. **Create a GitHub repo.** Go to https://github.com/new, name it
   `kodagu-ai` (or anything), and create it **empty** (no README).

2. **Push this code** (run from the project folder):

   ```bash
   git add -A
   git commit -m "Initial Kodagu.ai site with Aane Alert"
   git branch -M main
   git remote add origin https://github.com/<your-username>/kodagu-ai.git
   git push -u origin main
   ```

3. **Import into Vercel.** Go to https://vercel.com/new, sign in with GitHub,
   pick the `kodagu-ai` repo, and click **Import**. Vercel auto-detects Next.js —
   leave every setting at its default and click **Deploy**.

4. Wait ~1 minute. You get a live URL like `kodagu-ai.vercel.app`.
   Every future `git push` to `main` redeploys automatically.

### Option B — Vercel CLI (fastest, already installed)

From the project folder:

```bash
vercel login      # sign in (opens the browser)
vercel            # answer the prompts, then it builds & deploys a preview
vercel --prod     # promote to a production URL
```

Accept the defaults when prompted — it detects Next.js automatically.

---

## Connect the kodagu.ai domain

Once deployed:

1. In the Vercel dashboard, open the project → **Settings → Domains**.
2. Enter `kodagu.ai` and click **Add**, then add `www.kodagu.ai` too.
3. Vercel shows the DNS records to set. At your domain registrar (wherever you
   bought kodagu.ai), add them:
   - **A record** `@` → `76.76.21.21`, **or** an **ALIAS/ANAME** `@` →
     `cname.vercel-dns.com` (use whichever your registrar supports).
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Save. DNS usually propagates within minutes to a few hours. Vercel issues the
   HTTPS certificate automatically. Done — `https://kodagu.ai` is live.

> Tip: the exact records shown **in your Vercel dashboard** are the source of
> truth — always use those.

---

## Project structure

```
app/
  layout.tsx            # fonts (Barlow Condensed), metadata, header + footer
  page.tsx              # home page
  globals.css           # all styles + brand tokens
  about/page.tsx        # About
  join/page.tsx         # Get Involved
  projects/[slug]/      # auto-generated page for each project
  lib/
    projects.ts         # ← the projects data (edit this to add projects)
    site.ts             # ← site-wide settings
  components/            # Header, Footer, Wordmark, ProjectCard, icons
public/                 # logo, favicon, brand book
```
