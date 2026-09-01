# Karthik Portfolio

A production-grade editorial portfolio site for **Yemula Karthikeya** — AI/ML Engineer and Design Technologist.

## Stack

- **React 19** + **TypeScript 5** + **Vite 6**
- **Tailwind CSS v4** (editorial design system, full dark/cream theme)
- **GSAP 3** + **ScrollTrigger** for scroll-driven animation
- **Lenis** for smooth scroll
- **Web Audio API** for low-volume tactile acoustic feedback
- **Framer Motion / Motion** for layout & exit transitions
- **Lucide React** for line-art icons

## Local development

```bash
npm install   # or: bun install
npm run dev   # vite on http://localhost:3000
```

## Production build

```bash
npm run build
npm run preview
```

## Project layout

```
src/
├── App.tsx               # router, providers, route layout
├── main.tsx              # entrypoint
├── index.css             # tailwind + theme variables
├── pages/                # Home, About, Work, Contact, ProjectPage
├── components/           # hero, nav, work cards, custom cursor, etc.
├── data/                 # typed content (resumé + project catalog)
├── lib/                  # gsap singleton, audio engine
├── utils/                # UI sound synthesis
├── context/              # theme provider
├── types.ts              # shared types
└── assets/images/        # raster portrait
public/
└── images/projects/      # case-study covers
```

## Customisation

All resumée / project content lives in `src/data/`. Edit the typed
`content.ts` and `portfolioData.ts` files; the UI follows.

## License

Code: MIT
