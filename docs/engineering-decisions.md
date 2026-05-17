# Engineering Decisions

## Decision 1: Route-Segmented App Shell
**Context:** The platform contains catalog, detail, and editorial surfaces with shared navigation and utility overlays.  
**Problem:** Avoid route-level duplication and preserve platform continuity.  
**Chosen Solution:** Persistent shell (`Navbar`, `Footer`, assistant, toasts) with route body switch in `App.tsx`.  
**Tradeoffs:** Shell persistence can keep non-route concerns mounted longer.  
**Future Evolution:** Add route-aware shell configuration for context-specific chrome density.

## Decision 2: Wouter for Lightweight Routing
**Context:** Route requirements are clear and focused; dynamic paths are needed.  
**Problem:** Need simple client routing without heavy framework constraints.  
**Chosen Solution:** `wouter` route mapping with dynamic params and lazy page boundaries.  
**Tradeoffs:** Fewer built-in conventions than framework-level routing ecosystems.  
**Future Evolution:** Introduce route metadata registry for stronger SEO and navigation governance.

## Decision 3: TanStack Query + Supabase Table Hook
**Context:** Multiple pages consume table data with similar access patterns.  
**Problem:** Avoid repeated fetch/state/error boilerplate across components.  
**Chosen Solution:** Generic `useSupabaseTable<T>` + query keys + stale time.  
**Tradeoffs:** Current abstraction is table-centric and does not include realtime subscriptions.  
**Future Evolution:** Add optional realtime mode and typed query composables per domain.

## Decision 4: Prefetch Critical Content in Bootstrap
**Context:** Home route is content dense and identity-defining.  
**Problem:** Reduce perceived loading for key sections.  
**Chosen Solution:** Prefetch core tables in `main.tsx` before mounting app tree.  
**Tradeoffs:** Increases initial startup network work; prioritization must remain curated.  
**Future Evolution:** Move to route-intent prefetching with preconnect and adaptive priority.

## Decision 5: Section-Based Composition Architecture
**Context:** Home page contains many independent storytelling blocks.  
**Problem:** Prevent monolithic page complexity.  
**Chosen Solution:** Isolate each narrative block under `components/sections/*` and compose in `Home.tsx`.  
**Tradeoffs:** Cross-section consistency depends on shared patterns being enforced.  
**Future Evolution:** Introduce section contracts (props/schema) for stricter composition guarantees.

## Decision 6: Reusable Header and Reveal Systems
**Context:** Section intro patterns and reveal animations repeat across surfaces.  
**Problem:** Repeated markup/animation definitions produce drift.  
**Chosen Solution:** `SectionHeader` and `RevealSection` abstractions + shared animation constants.  
**Tradeoffs:** Advanced one-off section behavior may bypass shared abstractions.  
**Future Evolution:** Expand reusable section templates with variant maps.

## Decision 7: Hybrid Design System (Tokens + Inline Precision)
**Context:** Premium visual direction required high control.  
**Problem:** Need both global consistency and page-level art direction.  
**Chosen Solution:** Tailwind + CSS variable tokens + reusable primitives, with inline style overrides for cinematic surfaces.  
**Tradeoffs:** Inline-heavy styling can weaken governance and increase maintenance cost.  
**Future Evolution:** Refactor repeated inline patterns into variant-driven token classes.

## Decision 8: Motion-Forward UX Architecture
**Context:** Platform prioritizes editorial pacing and premium interaction cues.  
**Problem:** Static transitions under-communicate hierarchy and state changes.  
**Chosen Solution:** Framer Motion used extensively with centralized presets and section-level choreography.  
**Tradeoffs:** Risk of motion density and repaint overhead without budgets.  
**Future Evolution:** Define motion tiers (ambient, structural, micro) with performance constraints.

## Decision 9: Hero as Interactive Engineering Interface
**Context:** Entry surface needs to communicate technical identity immediately.  
**Problem:** Traditional hero blocks under-express system engineering depth.  
**Chosen Solution:** Modular hero with terminal simulation, ticker, canvas interactions, and adaptive mobile guard.  
**Tradeoffs:** Higher implementation complexity and maintenance overhead.  
**Future Evolution:** Modularize hero effects behind feature flags/variants for simpler experimentation.

## Decision 10: SEO as First-Class Content Layer
**Context:** Deep-link pages and dynamic content require search discoverability.  
**Problem:** Route-specific metadata and structured data need consistent injection.  
**Chosen Solution:** Centralized SEO component + JSON-LD helpers + sitemap generation script using Supabase slugs.  
**Tradeoffs:** Metadata correctness depends on route-level discipline.  
**Future Evolution:** Add SEO test harness and schema validation in docs workflow.

## Decision 11: Mixed Interaction Navigation Model
**Context:** Platform has both long-form home sections and multi-route depth surfaces.  
**Problem:** Users need smooth movement between anchor sections and deep routes.  
**Chosen Solution:** Navbar supports section scrolling (home) and route transitions (catalog/deep-dive).  
**Tradeoffs:** Additional navigation logic complexity, including delayed scroll behavior.  
**Future Evolution:** Unify section navigation through a dedicated route/anchor orchestration utility.

## Decision 12: Documentation Truth Alignment Requirement
**Context:** Existing README narrative overstates some current runtime behavior.  
**Problem:** Mismatch between claims and implementation can reduce credibility.  
**Chosen Solution:** Re-document architecture around verified static implementation details only.  
**Tradeoffs:** Marketing-style narrative becomes more constrained but more accurate.  
**Future Evolution:** Add explicit “implemented vs planned” sections in documentation.
