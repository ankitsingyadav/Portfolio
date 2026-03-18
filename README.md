# Ankit Singh Yadav — Developer Portfolio

A modern, responsive developer portfolio built with **Next.js 14**, **Tailwind CSS**, **TypeScript**, and **Framer Motion**.

---

## ✨ Features

- **Hero Section** — Animated intro with name, role, tagline, CTA buttons, and social links
- **About Section** — Bio, contact info, and key stats
- **Skills Section** — Categorized tech stack with a scrolling skills ticker
- **Projects Section** — Cards with filtering by technology, live/GitHub links
- **Experience Section** — Timeline layout for open-source contributions
- **Education Section** — Academic credentials
- **Certifications Section** — All professional certifications
- **Contact Section** — EmailJS-powered contact form + direct contact links
- **Dark / Light Mode** — System preference detection + manual toggle
- **Resume Download** — Direct PDF download from navbar
- **Smooth Animations** — Framer Motion scroll-triggered reveals throughout
- **SEO Optimized** — Meta tags, OpenGraph, Twitter card
- **Mobile-First Responsive** — Works perfectly on all screen sizes

---

## 🛠 Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Framework   | Next.js 14 (App Router)            |
| Language    | TypeScript                         |
| Styling     | Tailwind CSS                       |
| Animations  | Framer Motion                      |
| Email       | EmailJS                            |
| Icons       | Lucide React                       |
| Fonts       | Syne (display) + DM Sans (body)    |
| Deployment  | Vercel                             |

---

## 📁 Folder Structure

```
ankit-portfolio/
├── app/
│   ├── globals.css          # Global styles, CSS variables, Tailwind base
│   ├── layout.tsx           # Root layout — SEO meta, ThemeProvider, Navbar, Footer
│   └── page.tsx             # Home page — assembles all sections
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Hero with animated intro
│   │   ├── About.tsx        # About + stats
│   │   ├── Skills.tsx       # Skills grid + ticker
│   │   ├── Projects.tsx     # Project cards with filter
│   │   ├── Experience.tsx   # Timeline experience
│   │   ├── Education.tsx    # Education cards
│   │   ├── Certifications.tsx # Cert grid
│   │   └── Contact.tsx      # EmailJS contact form
│   ├── ui/
│   │   ├── FadeIn.tsx       # Scroll-triggered fade animation wrapper
│   │   └── SectionHeader.tsx # Reusable section title component
│   ├── Navbar.tsx           # Sticky navbar with theme toggle
│   ├── Footer.tsx           # Footer with social links
│   └── ThemeProvider.tsx    # Dark/light mode context
├── lib/
│   ├── data.ts              # ✏️  ALL PORTFOLIO CONTENT — edit this to update info
│   └── utils.ts             # cn() helper for class merging
├── public/
│   └── resume.pdf           # ← Place your resume PDF here
├── .env.local.example       # EmailJS environment variables template
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm / yarn / pnpm

### 1. Clone / Download the project

```bash
git clone https://github.com/ankitsingyadav/portfolio.git
cd portfolio
```

Or simply extract the downloaded ZIP into a folder.

### 2. Install dependencies

```bash
npm install
```

### 3. Add your resume PDF

Place your resume PDF at:
```
public/resume.pdf
```

### 4. Set up EmailJS (for the contact form)

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and create a free account
2. Create a **Service** (connect your Gmail or any email)
3. Create an **Email Template** — use these template variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{subject}}` — message subject
   - `{{message}}` — message body
4. Copy your **Service ID**, **Template ID**, and **Public Key**
5. Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Then fill in your credentials in `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

6. Update `components/sections/Contact.tsx` to use the env vars:

```tsx
const EMAILJS_SERVICE_ID = "service_y7weh04";
const EMAILJS_TEMPLATE_ID = "template_s3iy1zc";
const EMAILJS_PUBLIC_KEY = "3O8IhvWn9sYtAFB_d";
```

### 5. Update your content

All portfolio content lives in **`lib/data.ts`**. Open it and update:
- `personal` — name, bio, email, phone, links
- `skills` — your tech stack
- `projects` — your projects with descriptions and links
- `experience` — your work experience
- `education` — your education
- `certifications` — your certifications

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploy on Vercel

### Option A — Vercel CLI (recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. On first deploy it will ask you to link/create a project.

### Option B — GitHub + Vercel Dashboard

1. Push your project to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to [https://vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
5. Click **Deploy** ✅

Vercel will automatically redeploy on every `git push`.

### Custom Domain (optional)
In Vercel Dashboard → Your Project → Settings → Domains → Add your domain.

---

## ✏️ Customization Guide

| What to change         | Where to change it               |
|------------------------|----------------------------------|
| Personal info / bio    | `lib/data.ts` → `personal`       |
| Skills                 | `lib/data.ts` → `skills`         |
| Projects               | `lib/data.ts` → `projects`       |
| Experience             | `lib/data.ts` → `experience`     |
| Education              | `lib/data.ts` → `education`      |
| Certifications         | `lib/data.ts` → `certifications` |
| Color scheme           | `tailwind.config.ts` + `globals.css` |
| Fonts                  | `app/globals.css` `@import` + `tailwind.config.ts` |
| Nav links              | `components/Navbar.tsx`          |
| SEO meta tags          | `app/layout.tsx`                 |

---

## 🔧 Optional Improvements

- Add **Google Analytics** — install `next/third-parties`
- Add a **blog** section using MDX or Contentlayer
- Add **project detail pages** at `/projects/[slug]`
- Integrate **Notion API** to manage projects from a Notion database
- Add **loading skeleton** for images using `next/image` with blur placeholder
- Add **cursor spotlight** effect for a premium feel
- Add **OG image generation** using `next/og` for social sharing

---

## 📄 License

MIT — free to use and modify for your own portfolio.
