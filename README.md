# Zeya Mosharraf — Engineering Experience Platform

## Executive Summary
This repository implements a **SaaS-inspired technical storytelling platform** built with React, TypeScript, Vite, Tailwind, Framer Motion, and Supabase-backed content. The application is structured as a product surface with route-level segmentation, reusable section systems, and a consistent dark-first visual language for engineering narratives, case-study flows, and project intelligence.

## Product Vision
The platform is designed as an **architecture-first frontend experience**: project and case-study content is data-driven, motion-enhanced, and organized to communicate engineering decision quality rather than static profile information.

## Engineering Philosophy
- **Composition-first UI**: sections and primitives are modularized for reuse.
- **Data-backed content surface**: Supabase tables power projects, case studies, skills, metrics, and profile metadata.
- **Tokenized visual foundation**: theme variables and Tailwind extensions shape typography, spacing, color, and interaction rhythm.
- **Editorial interaction model**: motion is used for hierarchy and narrative pacing.

## Frontend Architecture
- **App shell:** persistent `Navbar`, route body, `Footer`, assistant overlay, and toast system (`client/src/App.tsx`).
- **Routing:** `wouter` route map with static + dynamic segments.
- **Page boundaries:** home, catalog, detail, category, case-study, and editorial blog routes.
- **Lazy loading:** non-home pages are lazy loaded to reduce initial route payload.
- **Data access:** `useSupabaseTable<T>` standardizes Supabase query + query caching through TanStack Query.
- **Prefetching:** critical homepage tables are prefetched in `main.tsx` before render.

## Design System Overview
- **Tailwind extension:** custom font families, font sizes, spacing, gradients, semantic colors, shadow tokens (`tailwind.config.ts`).
- **CSS token layers:** brand and semantic variables in `index.css` (including dark-first defaults and utility layers).
- **UI primitives:** button, card, form, input, label, textarea, toast, and reusable composites.
- **Section abstractions:** `SectionHeader`, `RevealSection`, `PageHero`, `ProjectCard`, `CaseStudyCard`, `SkillBar`, skeleton loaders.

## Motion & Interaction System
- Centralized animation presets in `lib/animations.ts`.
- Framer Motion used for:
  - route entry/fallback transitions,
  - reveal-on-scroll orchestration,
  - card hover and staged list animation,
  - hero terminal simulation and metrics ticker,
  - architecture visualization transitions.
- Hero includes custom canvas particle interactions (`useHeroCanvas`) with mobile bypass for performance control.

## Responsive Architecture
- Grid/list/scroll-rail strategies adapt by breakpoint across sections and routes.
- Experience section uses Embla carousel with responsive card width distribution.
- Custom CSS media rules cap container/card growth on very large viewports.
- Mobile-specific interaction simplifications are present in hero canvas and navigation.

## Technical Stack
- **Frontend:** React 18, TypeScript, Vite, Wouter
- **Styling:** Tailwind CSS, CSS variables, shadcn/ui-compatible primitives
- **Motion:** Framer Motion, AOS (initialized in `main.tsx`)
- **Data:** Supabase client + TanStack Query
- **Forms:** React Hook Form + Zod
- **SEO:** react-helmet-async + JSON-LD schema helpers
- **Build-time content indexing:** dynamic sitemap generation from Supabase slugs

## Folder Structure
```text
client/src/
├── components/
│   ├── sections/           # Home + domain-specific storytelling sections
│   ├── ui/                 # Reusable primitives/composites
│   ├── forms/              # Form-specific modules
│   ├── layout/             # Navbar + Footer shell
│   └── SEO.tsx
├── hooks/                  # Data and interaction hooks
├── lib/                    # Animations, transforms, constants, schema, client utils
├── pages/                  # Route-level page boundaries
└── types/                  # Supabase-centered interfaces

server/                     # Optional scaffold (minimal API usage in current frontend flow)
```

## Component Systems
- **Narrative sections:** Hero, Featured Case Studies, Medallion Architecture, Experience, Projects, Skills, About, Contact.
- **Card systems:** Project and case-study cards with category accents, impact snippets, and progressive disclosure.
- **Editorial systems:** PageHero, animated back button, terminal simulation, architecture renderer.
- **Information systems:** social/contact cards, certification rails, skeleton loading states.

## Performance Strategy (Static Analysis)
- Route-level lazy loading in app router composition.
- Query prefetch for top-level content tables.
- Image lazy loading on project cards.
- Mobile performance guard in hero canvas hook.
- Caching via TanStack Query query keys and stale-time configuration.

## Accessibility Considerations
- Semantic form wiring through `FormField`, `FormControl`, and validation messaging.
- Aria labels in key actions (e.g., chat trigger, scroll-to-top).
- Keyboard escape handling in certificate modal.
- Focus-visible styles available in utility layers and shadcn primitives.

## SEO Architecture
- Centralized SEO component injects title, description, canonical, robots, OG/Twitter.
- JSON-LD schemas for person, website, project creative work, blog posting, and breadcrumbs.
- Sitemap generation script includes static routes and dynamic Supabase slugs.

## Project Showcase Structure
- **Home:** capability framing + selected engineering stories.
- **Projects catalog:** searchable/filtered exploration.
- **Project detail:** cinematic technical deep-dive with methods, results, tools, and optional embed.
- **Case studies:** archive + deep-dive narrative with architecture render support.
- **Blog:** editorial technical repository with list/detail rendering modes.

## Engineering Highlights
- Strong section modularization and reusable UI composition.
- Cohesive visual/motion language with centralized presets.
- Mature route and content segmentation.
- Typed Supabase entities and table-driven rendering patterns.

## Documentation Truthfulness Notes
- Current `useSupabaseTable` implementation provides typed fetch + query caching; it does not currently implement realtime subscription wiring.
- Server files are present, but current portfolio behavior is primarily frontend + Supabase + Formspree-driven.
- This README intentionally describes implemented architecture and avoids planned/non-implemented runtime claims.

## Scalability Considerations
- Current architecture scales well for additional routes/sections and table-driven content.
- Main growth risk is **style governance drift** from heavy inline styling across premium card layouts.
- Unified token/CVA expansion would improve long-term consistency and reduce duplication.

## Future Improvements
- Add formal design-token governance and variant abstraction for inline-heavy components.
- Consolidate duplicated card/hero style patterns into reusable variants.
- Introduce structured error boundaries per route surface.
- Expand motion-reduction handling for accessibility-first animation policies.
- Align all docs with actual implementation details as features evolve.

## Documentation Links
- [Frontend Architecture](docs/frontend-architecture.md)
- [Design System](docs/design-system.md)
- [UI/UX Engineering](docs/ui-ux-engineering.md)
- [Performance Engineering](docs/performance.md)
- [Engineering Decisions](docs/engineering-decisions.md)
- [Case Study](docs/case-study.md)
- [Architecture Diagrams](diagrams/)
