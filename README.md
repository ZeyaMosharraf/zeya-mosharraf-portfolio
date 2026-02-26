# Zeya Mosharraf — Portfolio

A modern, full-stack personal portfolio website for **Zeya Mosharraf** — Data Analyst, Power BI Developer, and Business Analyst. Built with React, TypeScript, and Express, it showcases projects, case studies, certifications, experience, and interactive data visualizations.

---

## Live Preview

> Deploy the project and replace this line with your live URL.

---

## Features

- **Animated Hero** — Typed.js role animation (Data Analyst / Power BI Developer / Business Analyst)
- **Featured Case Studies** — In-depth project breakdowns with data storytelling
- **Analytics Dashboard** — Interactive data flow and visualization components
- **Projects Section** — Filterable project cards with category pages and detail views
- **Experience Timeline** — Carousel-based work history
- **Skills Section** — Animated skill bars for Programming, BI Tools, and more
- **Certificates** — Auto-scrolling certificate showcase
- **Blog** — Articles and write-ups page
- **Portfolio Assistant** — AI-powered assistant component
- **Contact Form** — Server-side form handling via Express
- **Dark / Light Mode** — Theme toggle with persistent preference
- **SEO** — Per-page meta tags via a dedicated SEO component
- **Sitemap Generation** — Auto-generated `sitemap.xml` on build
- **Responsive Design** — Mobile-first layout using Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Animations | Framer Motion, AOS |
| State / Data | TanStack React Query |
| Backend | Node.js, Express |
| Database | PostgreSQL (Neon), Drizzle ORM |
| Forms | React Hook Form, Zod |
| Charts | Recharts, Embla Carousel |

---

## Project Structure

```
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   ├── layout/      # Navbar, Footer
│       │   ├── sections/    # Hero, About, Projects, Skills, etc.
│       │   └── ui/          # shadcn/ui + custom UI components
│       ├── data/            # Static data files (projects, skills, certs)
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Query client, utilities
│       └── pages/           # Route-level page components
├── server/                  # Express backend
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Database access layer
│   └── vite.ts              # Vite dev-server integration
├── drizzle.config.ts        # Drizzle ORM config
├── generate-sitemap.ts      # Sitemap generation script
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- A **PostgreSQL** database (e.g. [Neon](https://neon.tech))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ZeyaMosharraf/zeya-mosharraf-portfolio.git
cd zeya-mosharraf-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
#    Create a .env file in the root directory and add:
DATABASE_URL=your_postgresql_connection_string

# 4. Push the database schema
npm run db:push

# 5. Start the development server
npm run dev
```

The app will be available at `http://localhost:5000`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server (client + server) |
| `npm run build` | Build for production (client bundle + server bundle + sitemap) |
| `npm start` | Run the production build |
| `npm run check` | TypeScript type-checking |
| `npm run db:push` | Push Drizzle schema changes to the database |

---

## Skills Highlighted

**Programming & Data**
- Python (Pandas, NumPy, Scikit-learn)
- SQL, Excel (Advanced), Google Sheets

**Business Intelligence & Visualization**
- Power BI, Tableau, Looker Studio
- Matplotlib / Seaborn

**Other**
- Power BI Dashboard Development · Data Storytelling  
- Statistical Analysis · Machine Learning · Google Data Studio Reporting

---

## Contact

| Platform | Link |
|---|---|
| LinkedIn | [linkedin.com/in/zeya-mosharraf](https://www.linkedin.com/in/zeya-mosharraf/) |
| GitHub | [github.com/ZeyaMosharraf](https://github.com/ZeyaMosharraf) |

---

## License

This project is licensed under the **MIT License**.
