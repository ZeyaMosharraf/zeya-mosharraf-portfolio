# Design System Architecture

## Design System Scope
The platform uses a hybrid design system:
- Tailwind utility architecture,
- CSS variable tokens in `index.css`,
- shadcn-compatible primitives,
- custom section/card composites.

## Token Architecture
## 1) Tailwind Extensions (`tailwind.config.ts`)
- Font families (`Inter`, `JetBrains Mono`)
- Extended type scale and spacing tokens
- Semantic color aliases mapped to CSS variables
- Gradient and shadow token aliases
- Animation keyframes for accordion transitions

## 2) CSS Variable Layer (`index.css`)
- Brand, surface, semantic, gradient, and shadow variables
- Light/dark HSL variable layer for shadcn token compatibility
- Utility classes for gradients, cards, button styles, focus states

### Why this exists
- Enables global visual consistency with local composability.
- Supports dark-first product framing with semantic overrides.

## Typography System
- Base typography leverages Inter with feature settings enabled.
- Headings use tighter tracking and stronger weight.
- Monospace accents (JetBrains Mono) used for technical UI contexts (terminal/editor motifs).

### UX impact
- Editorial hierarchy feels intentional and technical.
- Mono accents reinforce engineering storytelling identity.

## Spacing System
- Tailwind spacing plus custom extensions (`18`, `88`).
- Section cadence is generally consistent (`py-12/16`, container max widths).
- Card internal spacing uses repeated custom patterns.

### Tradeoff
- Macro rhythm is consistent, micro rhythm varies where inline styles dominate.

## Reusable Primitive Layer
- `button.tsx`, `card.tsx`, `input.tsx`, `form.tsx`, `label.tsx`, `textarea.tsx`, toast primitives.
- Shared composites: `SectionHeader`, `RevealSection`, `PageHero`, `ProjectCard`, `CaseStudyCard`, `SkillBar`, skeletons.

### Value
- Fast composition with consistent interaction semantics.
- Reduced repeated form/control boilerplate.

## Card System Architecture
- Multiple card families:
  - project cards,
  - case-study cards,
  - experience cards,
  - certificate cards.
- Most share dark elevated surfaces, low-contrast borders, red/orange accent affordances.

### Current governance level
- High visual quality, medium governance.
- Pattern duplication suggests opportunity for a unified `CardVariant` abstraction.

## Theme Architecture
- `ThemeProvider` controls `light | dark | system` class mode with local persistence.
- Global variables and Tailwind semantic color bindings provide theme-level adaptation.

## Interaction Consistency
Consistent motifs:
- border brightening on hover,
- slight lift/translate effects,
- accent underlines/dots,
- subdued glass/backdrop effects.

Inconsistency source:
- many interaction values are hardcoded inline rather than tokenized.

## Maintainability Strategy (Current vs Target)
## Current strengths
- Shared primitives exist.
- Token foundations are present.
- Section headers and reveal wrappers reduce duplication.

## Current risks
- Inline styles create token bypass paths.
- Similar card mechanics repeated across modules.
- Motion/styling policies are not fully centralized.

## Recommended evolution
1. Promote repeated inline visuals into utility classes or CVA variants.
2. Introduce semantic component tokens (`--card-bg-subtle`, `--accent-muted`, etc.).
3. Publish explicit design system usage rules in docs.

## System Value
This design system already supports a premium SaaS-inspired frontend language. With stricter variant governance, it can scale to a significantly larger engineering content platform without visual drift.
