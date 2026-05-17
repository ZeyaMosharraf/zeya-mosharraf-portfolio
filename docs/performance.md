# Performance Engineering

## Performance Posture
The current implementation demonstrates selective performance engineering in a motion-rich frontend system. It prioritizes route segmentation, query prefetching, and mobile guards while accepting some stylistic overhead for premium UX.

## Rendering & Loading Strategy
## Route-level loading
- Non-home pages are lazy loaded (`React.lazy` + `Suspense` in `App.tsx`).
- Home route is eagerly loaded for first-entry narrative continuity.

## Data loading
- `main.tsx` prefetches key Supabase tables before render.
- `useSupabaseTable` uses TanStack Query caching and stale windows.

### Performance value
- Reduces first-view loading friction on core content surfaces.
- Prevents repeated network fetches during navigation loops.

## Motion Performance
- Motion is centralized partially (`lib/animations.ts`) and used extensively.
- Hero canvas includes:
  - requestAnimationFrame loop,
  - mouse interaction,
  - DPR cap,
  - mobile disable guard.

### Good decisions
- Mobile bypass for heavy canvas work.
- Shared transition presets reduce random animation variance.

### Cost risks
- High concurrent animation density in some pages.
- Inline style transitions and layered effects may increase repaint workload.

## Image Strategy
- Project cards use `loading="lazy"` for thumbnails.
- Certificate and showcase visuals rely on standard `<img>` with object-fit strategies.

### Opportunity
- Introduce stronger image sizing/hints and structured responsive image strategy across large visual modules.

## Bundle & Styling Considerations
- Vite chunk warning limit increased to 1000kb (from default), indicating tolerance for larger chunks.
- `index.css` includes extensive utility and custom animation rules.

### Implication
- Styling flexibility is high, but CSS growth can become a maintainability and parse-time concern.

## Potential Bottlenecks
1. Visual-heavy pages with multiple animated cards and atmospheric layers.
2. Repeated inline style definitions limiting static optimization opportunities.
3. Architecture visualizations with large SVG/canvas surfaces on constrained devices.

## Current Optimization Quality
- **Strong:** route segmentation, query prefetch, core caching model, mobile canvas guard.
- **Moderate:** style/motion governance and image optimization consistency.

## Scalability Risks
- As content volume grows, current card-level motion and dense visual layers can scale rendering cost non-linearly.
- Without stricter variant/token governance, performance tuning becomes more expensive across duplicated patterns.

## Recommended Evolution Path
1. Define a motion budget by surface type (hero, catalog, detail, background).
2. Convert repeated inline card effects into class/token variants for easier global tuning.
3. Add standardized “heavy visual mode” fallbacks for lower-capability devices.
4. Consolidate CSS utility growth into documented design-system modules.

## Engineering Conclusion
This frontend already balances premium interaction with practical performance controls in key areas. The next performance maturity step is governance: controlling motion/styling complexity as the platform scales.
