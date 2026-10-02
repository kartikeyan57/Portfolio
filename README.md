# Kartikeyan Sharma — Portfolio

A premium, interactive engineering portfolio built with React, TypeScript, Vite, Tailwind CSS and Framer Motion. Visual concept: **Kartikeyan's Engineering Lab** — bright, colorful, robotics/electronics-driven, built for `kartikeyansharma.in`.

---

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production build is output to `dist/`.

---

## 2. Where to put your resume

Drop your real resume file at:

```
public/resume.pdf
```

It just needs to be named `resume.pdf` — the "View Resume" buttons already link to `/resume.pdf`. If you'd rather use a different filename or an external link (e.g. Google Drive), update `resumeUrl` in `src/data/profile.ts` (see below).

---

## 3. Where to add your LinkedIn, GitHub and email

Everything personal lives in **one file**: `src/data/profile.ts`. Open it and edit the top of the `profile` object:

```ts
export const profile = {
  ...
  resumeUrl: '/resume.pdf',
  email: 'YOUR_EMAIL',
  linkedin: 'YOUR_LINKEDIN_URL',
  github: 'YOUR_GITHUB_URL',
}
```

Replace the placeholders with your real values, e.g.:

```ts
  email: 'kartikeyan@example.com',
  linkedin: 'https://linkedin.com/in/kartikeyan-sharma',
  github: 'https://github.com/kartikeyan-sharma',
```

These are used everywhere — the Contact section, hero buttons, footer — so you only ever change them here.

---

## 4. How to edit projects

Still in `src/data/profile.ts`, find the `projects` array. Each project is an object like:

```ts
{
  id: 'shampy',
  name: 'SHAMPY',
  tagline: 'A multifunctional robotic companion prototype...',
  categories: ['ROBOTICS'],
  components: ['ESP32', 'SG90 Servos', 'MPU9250', 'Ultrasonic', 'OLED'],
  features: ['Four-legged movement', 'Obstacle detection', ...],
  status: 'IN DEVELOPMENT',
}
```

- **To add a project**: copy an existing object, give it a unique `id`, and fill in your details.
- **To remove a project**: delete its object from the array.
- **`categories`** must be from: `'ROBOTICS' | 'IOT' | 'ELECTRONICS' | 'DRONES' | 'RESEARCH'` — this drives the filter buttons on the Projects section automatically.
- **`status`** must be one of: `'IN DEVELOPMENT' | 'PROTOTYPE' | 'COMPLETED' | 'RESEARCH / EXPERIMENTATION'`.

The same file also holds `experience`, `skillCategories`, `labComponents`, `dashboard`, `interests` and `education` — all editable the same way, with inline comments/types guiding you.

---

## 5. How to change colors

Open `tailwind.config.js`. The custom palette is defined under `theme.extend.colors`:

```js
colors: {
  paper: '#F8FAFC',   // background
  ink: '#172033',     // primary text / dark surfaces
  skyline: '#8DD8FF', // light blue accent
  volt: '#2563EB',    // primary blue accent
  signal: '#FF8A3D',  // orange accent
  beacon: '#FFD84D',  // yellow accent
  circuit: '#0F766E', // green accent
  coral: '#FB7185',   // coral accent
  mist: '#E7EEF6',    // soft panel background
}
```

Change any hex value and it updates everywhere that color is used (`bg-volt`, `text-signal`, etc.), since every component references these semantic names rather than raw hex codes.

---

## 6. How to deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. Vercel auto-detects Vite. Confirm these settings (they're the defaults):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**.

Every push to your main branch will redeploy automatically.

---

## 7. How to connect `kartikeyansharma.in`

1. In your Vercel project, go to **Settings → Domains**.
2. Add `kartikeyansharma.in` (and `www.kartikeyansharma.in` if you want both).
3. Vercel will show you DNS records to add at your domain registrar:
   - Usually an **A record** pointing `@` to Vercel's IP, and/or
   - A **CNAME record** pointing `www` to `cname.vercel-dns.com`.
4. Add those records in your registrar's DNS settings.
5. Wait for DNS propagation (usually minutes, sometimes up to a few hours) — Vercel will show "Valid Configuration" once it's live, and will auto-provision an SSL certificate.

---

## Project structure

```
kartikeyansharma-portfolio/
├── public/
│   ├── resume.pdf        ← replace with your real resume
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/       Navbar, CustomCursor, MagneticButton, CircuitLine,
│   │                      IntroSequence, HeroVisual, FloatingObject
│   ├── sections/          Hero, About, EngineeringDashboard, ExperienceTimeline,
│   │                      ProjectGallery, ProjectCard, Lab, Skills, Education,
│   │                      ResumeCTA, Contact, Footer
│   ├── data/
│   │   └── profile.ts    ← ALL personal content lives here
│   ├── hooks/             usePrefersReducedMotion, useFinePointer
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Notes on design & accessibility

- Respects `prefers-reduced-motion`: the intro sequence, hero parallax and drifting animations are skipped/disabled for users who request reduced motion.
- The custom cursor is disabled on touch devices and only activates on fine-pointer (mouse/trackpad) input.
- Visible keyboard focus rings are included on interactive elements (`focus-ring` utility).
- No fabricated statistics, awards, or achievements are included anywhere — the Engineering Dashboard shows real, editable status fields instead of invented numbers.
