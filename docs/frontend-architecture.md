# Frontend Architecture

## System Overview
This implementation is a **scalable frontend product surface** built around a persistent app shell, route-level boundaries, and data-driven content rendering from Supabase.

## App Shell
- `App.tsx` defines a fixed shell: `Navbar` → route body → `Footer` + assistant + toasts.
- This ensures cross-route continuity for navigation, brand framing, and utility interactions.

## Route Structure
- Routing is handled with `wouter` in `App.tsx`.
- Registered boundaries:
  - `/`
  - `/projects`, `/projects/:category`
  - `/project/:slug`
  - `/case-studies`, `/case-study/:slug`
  - `/blog`, `/blog/:slug`
  - fallback not-found

### Why this structure
- Separates catalog, detail, and editorial surfaces cleanly.
- Supports deep links for project and case-study narratives.

## Rendering Flow
1. `main.tsx` boots providers (`HelmetProvider`, `QueryClientProvider`, `ThemeProvider`).
2. Critical data tables are prefetched before initial render.
3. `App.tsx` mounts shell + `Switch` route selection.
4. Lazy pages load inside `Suspense` with fallback spinner.
5. Page/section components fetch table data and render typed UI trees.

## Lazy Loading Strategy
- Home page is eagerly imported.
- Secondary routes are lazily imported via `React.lazy`.
- This improves entry-route focus while keeping broader platform surfaces modular.

## Component Hierarchy
- `pages/*`: route-level composition.
- `components/sections/*`: domain sections (hero, projects, skills, contact, etc.).
- `components/ui/*`: reusable primitives/composites.
- `components/layout/*`: shell components.

### Boundary value
- Section components retain narrative ownership.
- UI components centralize patterns and reduce route clutter.

## Data & State Boundaries
- Supabase client in `lib/supabase.ts`.
- Query abstraction in `hooks/useSupabaseTable.ts`.
- Server state managed by TanStack Query.
- Local state used per route/section for UI concerns (search, active tabs, index state, modal state).

## Styling & Visual Layer Boundaries
- Token and utility foundation in `tailwind.config.ts` and `index.css`.
- Component-specific inline styles are used heavily for premium visual tuning (cards, atmospheric gradients, cinematic overlays).

## Responsive Architecture
- Tailwind breakpoint strategy across all major routes.
- Mixed responsive models:
  - grids for desktop density,
  - horizontal rails/carousels for mobile scanability,
  - adaptive hero and section spacing.

## Interaction Architecture
- Navigation combines route navigation and section scrolling.
- Card systems rely on “preview → deep-dive” click flow.
- Editorial pages emphasize progressive disclosure and motion-led hierarchy.

## Frontend Boundaries and Scalability
### Strong signals
- Clear route/page/section/component boundaries.
- Reusable motion and header systems.
- Typed content rendering from centralized interfaces.

### Risk surface
- Inline style duplication can reduce long-term consistency.
- Some route-level visual systems are bespoke and expensive to maintain without variant abstraction.

## Alternative Architecture Paths
1. Move to file-based routing framework for stronger route metadata conventions.
2. Extract visual variants into CVA/token variants for stricter design governance.
3. Introduce feature folders (`features/projects`, `features/case-studies`) for domain-driven scaling.

## Engineering Maturity Signal
This architecture demonstrates product-level frontend planning: route segmentation, reusable systems, typed content contracts, and experience-oriented composition rather than page-by-page ad hoc implementation.
