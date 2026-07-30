# Zeya Mosharraf - Enterprise Engineering Portfolio & Technical Showcase

<div align="center">

  ![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-0055FF?style=for-the-badge&logo=framer&logoColor=white)

  <br />

  <p align="center">
    A <b>SaaS-inspired technical storytelling platform</b> engineered with React 18, TypeScript, Supabase, and TanStack Query. Features a dynamic data-driven content engine, modular architectural renderers, and zero-lag 60fps animations.
  </p>

</div>

---

## Portfolio Preview

<div align="center">
  <img src="https://res.cloudinary.com/dsr5lxh4w/image/upload/v1781248291/portfolio-demo_cqm6ck.gif" alt="Zeya Mosharraf Engineering Portfolio Showcase" width="100%"/>
</div>

---

## Key Architectural Highlights

* **Supabase Data Engine**: Completely data-driven via typed Supabase database tables (`projects`, `case_studies`, `blog_posts`, `skills`, `hero_metrics`, `portfolio_info`).
* **Performance-First Animation**:
  * **Offscreen Canvas Pause**: Custom `IntersectionObserver` halts background particle loops when out of view, saving 100% GPU/CPU resources during scroll.
  * **Zero-Cost CSS Animation**: Replaced heavy state re-rendering timers with hardware-accelerated CSS keyframe animations.
* **Viewport Center-Matching Carousel**: Custom linear distance algorithm ensuring smooth card selection (01 → 08) without skipping items or bounds issues.
* **Flexible Category Normalization Adapter**: Case-insensitive mapping engine unifies raw database tags (`SQL`, `Python`, `Power BI`, `Tableau`, `Looker Studio`, `Machine Learning`) into professional engineering domain categories.
* **Clean URI Routing**: Automatic URI decoding (`slugToCategoryName`) translating complex route slugs into clean category views (e.g., `/projects/bi-reporting`).

---

## Tech Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | React 18 + TypeScript 5.6 | Strict type safety & component architecture |
| **Build Tooling** | Vite 6.2 | Fast HMR & optimized production bundling |
| **Database & Auth** | Supabase JS (`@supabase/supabase-js`) | Relational PostgreSQL content backend |
| **State & Caching** | TanStack React Query v5 | Data fetching, cache windows, & prefetched routes |
| **Routing** | Wouter v3 | Lightweight, zero-dependency client routing |
| **Styling & UI** | Tailwind CSS + Lucide Icons | Dark-first visual design system |
| **Motion** | Framer Motion + AOS | Layout orchestration & reveal animations |
| **SEO & Sitemap** | `react-helmet-async` + Custom TSX script | Build-time dynamic sitemap generator & JSON-LD schemas |

---

## Repository Structure

```text
d:\zeya-mosharraf-portfolio/
├── .env.example              # Environment variables template for Supabase & Database
├── generate-sitemap.ts       # Dynamic sitemap generation script (Supabase slugs)
├── drizzle.config.ts         # Drizzle ORM configuration
├── tailwind.config.ts        # Custom theme variables, font extensions & design tokens
├── tsconfig.json             # TypeScript compiler settings
├── vercel.json               # Vercel deployment & routing config
├── vite.config.ts            # Vite build setup & alias configurations
├── client/
│   ├── index.html            # Entry HTML document
│   └── src/
│       ├── App.tsx           # App Shell, wouter route switcher & suspense boundaries
│       ├── main.tsx          # Application entry point & QueryClient provider
│       ├── index.css         # Global CSS design tokens & Tailwind utilities
│       ├── components/
│       │   ├── layout/       # App Shell components (Navbar, Footer)
│       │   ├── sections/     # Domain storytelling sections (Hero, Projects, CaseStudies, MedallionUI, Skills, Experience)
│       │   └── ui/           # Reusable UI primitives (ProjectCard, CaseStudyCard, SectionHeader, Skeletons)
│       ├── hooks/            # Data hooks (useSupabaseTable, use-toast, useCountUp)
│       ├── lib/              # Core utilities (dataTransforms, animations, constants, utils)
│       ├── pages/            # Route boundaries (Home, AllProjects, ProjectDetails, ProjectCategory, Blog, CaseStudies)
│       └── types/            # Centralized TypeScript Supabase database schemas
├── server/                   # Node/Express backend scaffolding
├── docs/                     # Engineering architecture & design docs
└── diagrams/                 # System architecture visual diagrams
```

---

## Quick Start & Setup

### Prerequisites
* **Node.js**: `>= 18.0.0`
* **npm**: `>= 9.0.0`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ZeyaMosharraf/zeya-mosharraf-portfolio.git
cd zeya-mosharraf-portfolio
npm install
```

### 2. Environment Setup
Create a `.env` file in the project root (reference [.env.example](.env.example)):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Database Connection (Optional / Migrations)
DATABASE_URL=postgresql://postgres:password@db.your-project-ref.supabase.co:5432/postgres
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build & Type Check
```bash
# Type check TypeScript codebase
npm run check

# Build production bundle & sitemap
npm run build
```

---

## Technical Documentation

* [Frontend Architecture](docs/frontend-architecture.md)
* [Design System Overview](docs/design-system.md)
* [Performance Engineering Notes](docs/performance.md)
* [Engineering Decision Log](docs/engineering-decisions.md)
* [Case Study Architecture](docs/case-study.md)
* [Architecture Diagrams](diagrams/)

---

<div align="center">
  <sub>Built with precision by <b>Zeya Mosharraf</b> - Engineering Experience Platform</sub>
</div>
