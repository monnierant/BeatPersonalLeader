# BeatPersonalLeader — Copilot Instructions

## Project Overview

This is a React + TypeScript single-page application that displays Beat Saber player stats and scores from the BeatLeader API. It is deployed as a static site on GitHub Pages.

## Tech Stack

- **React 18+** with **TypeScript** (strict mode)
- **Vite** as build tool
- **React Router v6** for client-side routing
- **Redux Toolkit + RTK Query** for state management and API calls
- **Styled Components** for styling (dark theme)
- **Recharts** for charts/graphs
- **Vitest + React Testing Library** for testing
- **ESLint + Prettier** for code quality

## Architecture

The project follows a **feature-based** folder structure:

```
src/
├── app/          # Store config, App root, router
├── features/     # Feature modules (player, home)
│   ├── player/   # Player profile & scores feature
│   └── home/     # Home page with search
├── shared/       # Shared components, utils, styles, constants
├── main.tsx
└── vite-env.d.ts
```

## Clean Code Principles — MANDATORY

1. **Single Responsibility:** Each component, function, and module does ONE thing.
2. **Meaningful names:** Variables, functions, and components have descriptive, intention-revealing names. No abbreviations unless universally understood (e.g., `url`, `id`).
3. **Small functions:** Functions should be short (< 20 lines ideally). Extract helpers when logic grows.
4. **No magic numbers/strings:** Use named constants in `shared/constants.ts`.
5. **DRY:** Don't repeat yourself. Shared logic goes in `shared/`.
6. **Immutability:** Prefer `const`, spread operators, and `.map()/.filter()` over mutation.
7. **Pure functions:** Utility functions must be pure — no side effects.
8. **Type everything:** No `any` type. Use proper TypeScript interfaces/types defined in `types/` folders.
9. **Error handling:** Always handle loading and error states for API calls.
10. **No commented-out code:** Remove dead code, don't comment it.

## Coding Conventions

### TypeScript

- Use `interface` for object shapes, `type` for unions/intersections.
- Export types from dedicated `*.types.ts` files in each feature's `types/` folder.
- Use `readonly` on props interfaces.
- Prefer `const` assertions where appropriate.

### React Components

- Use **functional components** only, with arrow function syntax.
- One component per file. File name matches component name (PascalCase).
- Props interface named `{ComponentName}Props`.
- Destructure props in the function signature.
- Use `React.memo` only when profiling shows a need — don't premature-optimize.

### Styled Components

- Define styled components in the same file if small (< 5 styled components).
- Extract to a `*.styles.ts` file if there are many.
- Use the theme object from `shared/styles/theme.ts` — never hardcode colors.
- Naming: `Styled{Element}` prefix (e.g., `StyledCard`, `StyledButton`).

### Redux / RTK Query

- API slices go in `features/{feature}/api/`.
- RTK Query endpoints handle caching, pagination, loading, and errors.
- UI state (filters, sort, etc.) goes in dedicated Redux slices.
- Use `createSelector` for derived data.

### Testing

- Test files named `*.test.ts` or `*.test.tsx` alongside the source files.
- Use `describe` / `it` blocks with clear descriptions.
- Test behavior, not implementation.
- Mock API calls with MSW.

## BeatLeader API

- **Base URL:** `https://api.beatleader.com`
- **No authentication required** for read endpoints.
- Player ID can be extracted from URLs like `https://beatleader.com/u/{id}` or `https://beatleader.com/u/{id}/scores`.
- Scores endpoint: `GET /player/{id}/scores?page=1&count=20&sortBy=date&order=desc`
- Player profile: `GET /player/{id}`

## Deployment

- GitHub Pages with `base: '/BeatPersonalLeader/'` in `vite.config.ts`.
- Use `HashRouter` from React Router for GitHub Pages SPA compatibility.
- Build output: `dist/`

## Do NOT

- Use `any` type — ever.
- Use CSS-in-JS inline styles — use Styled Components.
- Hardcode API URLs — use constants.
- Fetch all scores at once — use server-side pagination.
- Add features not in the specification (`docs/SPECIFICATION.md`).
- Leave `console.log` in production code.
- Use default exports on non-page components (use named exports).
