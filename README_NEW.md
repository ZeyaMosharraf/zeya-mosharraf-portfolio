# Zeya Mosharraf — Analytics Engineer

![Live](https://img.shields.io/badge/Live-zeyamosharraf.vercel.app-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-RealTime-3FCF8E?style=flat-square&logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=flat-square&logo=vercel)

---

## The Difference

Most portfolios are static HTML with hardcoded content. This one operates like a **data system**.

**Supabase powers every content section** — skills, metrics, projects. Change a value in the database, see it live instantly. No redeployment. No CI/CD overhead for content updates.

This portfolio demonstrates the **same architecture principles** I apply to production data engineering: separation of concerns, reusable patterns, real-time data flow, and scalable design.

---

## System Architecture

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                             │
│  (React App + TypeScript + Framer Motion)                   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components (Hero, Skills, Projects)                │  │
│  │  ↓                                                   │  │
│  │  Custom useSupabaseTable<T> Hook                    │  │
│  │  ├─ Fetch data from Supabase                        │  │
│  │  ├─ Subscribe to real-time changes                  │  │
│  │  └─ Handle errors + loading states                  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────────────┘
             │ (WebSocket + REST API)
             ↓
┌─────────────────────────────────────────────────────────────┐
│           Supabase (PostgreSQL + Real-Time)                │
│                                                             │
│  Tables:                                                    │
│  ├─ skills (name, category, proficiency, sort_order)       │
│  ├─ hero_metrics (label, value, icon, sort_order)          │
│  └─ [Extensible for new content types]                     │
│                                                             │
│  Features:                                                  │
│  ├─ Row Level Security (RLS) for access control            │
│  ├─ Realtime subscriptions on INSERT/UPDATE/DELETE         │
│  └─ Built-in REST API + GraphQL                            │
└─────────────────────────────────────────────────────────────┘
```

### Real-Time Data Update Flow

```
1. User updates Supabase database
   ↓
2. Supabase broadcasts change event via WebSocket
   ↓
3. useSupabaseTable hook receives event
   ↓
4. Hook calls fetchData() to refetch updated data
   ↓
5. Component re-renders with latest values
   ↓
6. No browser refresh needed — seamless live update
```

---

## Deployment & CI/CD Pipeline

### GitHub → Vercel Flow

```
┌─────────────────┐
│  Push to main   │
│  on GitHub      │
└────────┬────────┘
         │ (Git webhook)
         ↓
┌──────────────────────────────────────┐
│  Vercel Detects New Commit           │
│                                      │
│  1. Clone repository                 │
│  2. Install dependencies (npm)       │
│  3. Load env vars from Vercel config │
│  4. Run npm run build                │
│  5. Run type checking (TypeScript)   │
│  6. Generate optimized bundle        │
└────────┬─────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│  Build Passes?                       │
└────────┬──────────────────┬──────────┘
         │ YES              │ NO
         ↓                  ↓
   Deploy to CDN      Notify (failure)
   [Edge Network]     [Halt deployment]
         ↓
   Cache cleared
   DNS updated
   Live in ~60s
```

### Environment Variables Strategy

**Local Development (.env file - NOT committed)**
```
VITE_SUPABASE_URL=https://[your-project].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

**Production (Vercel Dashboard)**
- Settings → Environment Variables
- Same keys, production values
- Automatically injected during build
- Never visible in logs or code

**Security Model**
- `VITE_` prefix = public (embedded in frontend bundle)
- Supabase RLS policies protect data access
- Anon key is intentionally public
- Service role key stays server-side (never exposed)

---

## Build & Type Checking

**Development**
```bash
npm run dev       # Vite + hot reload
```

**Production Build**
```bash
npm run build     # TypeScript type check + minify + optimize
npm run preview   # Test production build locally
```

**Build Pipeline**
1. TypeScript compilation (catches 1500+ errors before deployment)
2. Tailwind CSS generation (tree-shaking unused styles)
3. React code splitting (lazy-loaded routes)
4. Asset optimization (images, fonts, bundles)
5. Sitemap generation (for SEO)

---

## Architecture Components

| Layer | Technology | Responsibility |
|-------|-----------|-----------------|
| **Presentation** | React 18 + TypeScript | UI rendering, state management, animations |
| **Data Layer** | `useSupabaseTable` hook | Fetch, subscribe, error handling, caching |
| **Backend** | Supabase PostgreSQL | Data storage, RLS policies, real-time events |
| **API** | Supabase REST/WebSocket | Type-safe queries, real-time subscriptions |
| **CDN/Hosting** | Vercel Edge Network | Global distribution, atomic deploys |

---

## Technology Stack

**Frontend**
- React 18, TypeScript 5.0+, Vite
- Tailwind CSS, Framer Motion, shadcn/ui

**Data & Backend**
- Supabase (PostgreSQL + real-time)
- REST APIs, OAuth2, Google Apps Script

**DevOps & Deployment**
- Git, GitHub, Vercel
- Environment variable management, atomic deploys

**Analytics & Monitoring**
- Python, SQL, ETL pipelines
- Real-time data validation

---

## Project Structure

```
client/src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx          # Real-time metrics from Supabase
│   │   └── SkillsSection.tsx  # Dynamic categories + real-time
│   └── ui/
├── hooks/
│   └── useSupabaseTable.ts    # Generic fetch + subscribe logic
├── lib/
│   ├── supabase.ts           # Supabase client + validation
│   ├── errorLogger.ts        # Step-by-step error diagnostics
│   └── animations.ts         # Framer Motion presets
├── main.tsx                  # Entry point
└── App.tsx                   # Routes + layout
```

---

## How It Works: Detailed Flow

### Scenario: Adding a New Skill

1. **Content Creator** updates Supabase dashboard
   - Adds: `{name: "Apache Spark", category: "Data Engineering Tools", proficiency: 85}`

2. **Database Event** triggered
   - Supabase publishes `INSERT` event to real-time channel

3. **Frontend Hook** receives event
   - `useSupabaseTable` detects change via WebSocket
   - Calls `fetchData()` to refetch full skills table

4. **Component Re-renders**
   - `SkillsSection` receives updated `data` prop
   - Framer Motion animates new skill into view
   - No page reload needed

5. **User sees** new skill instantly
   - Live update with smooth animation
   - Maintained scroll position
   - No flash or jumpiness

### Scenario: Deployment Flow

1. **Developer** pushes code to `main` branch
   - `npm run build` passes locally
   - All TypeScript checks pass
   - Commits with meaningful message

2. **GitHub webhook** notifies Vercel
   - Vercel downloads latest code
   - Loads production env vars (Supabase credentials)
   - Runs build process

3. **Build validates**
   - TypeScript checks for type errors
   - Tests run (if configured)
   - Assets optimized

4. **Deploy succeeds**
   - New build pushed to Vercel CDN
   - Deployed across 300+ edge locations
   - DNS updated, live in ~60s
   - Vercel sends confirmation

5. **Rollback ready**
   - Previous deployment remains active
   - One-click rollback if needed
   - Zero downtime

---

## Local Setup

**Prerequisites:** Node 18+, npm 9+

```bash
# Clone
git clone https://github.com/ZeyaMosharraf/zeya-mosharraf-portfolio.git
cd zeya-mosharraf-portfolio

# Install dependencies
npm install

# Create .env (copy from .env.example or Vercel)
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Run development server
npm run dev
# → http://localhost:5173

# Type checking + build
npm run build

# Test production build locally
npm run preview
```

---

## Monitoring & Debugging

**Console Logs (Development)**
- ✅ Step-by-step error diagnostics
- ✅ Data fetch success/failure
- ✅ Real-time subscription status
- ✅ No credentials exposed

**Vercel Analytics**
- Core Web Vitals tracking
- Performance metrics
- Error reporting

**Error Handling**
- Step 1: Check env vars exist
- Step 2: Validate Supabase connection
- Step 3: Handle fetch errors
- Step 4: Check data retrieval
- All errors console-only, never expose sensitive info

---

## Connect

- **GitHub:** [github.com/ZeyaMosharraf](https://github.com/ZeyaMosharraf)
- **LinkedIn:** [linkedin.com/in/zeya-mosharraf](https://www.linkedin.com/in/zeya-mosharraf)

---

## License

MIT
