# BeatPersonalLeader — Specification

## 1. Overview

**BeatPersonalLeader** is a single-page web application that displays a Beat Saber player's stats and scores from the [BeatLeader](https://beatleader.com) platform. Unlike the official BeatLeader website, it focuses on showing **all scores** — including unranked songs and attempts — in a clean, filterable, and sortable interface.

Any BeatLeader user can use it by entering their profile URL or player ID.

---

## 2. Goals

- Display **all** player scores (ranked + unranked + attempts), not only ranked ones.
- Provide global player statistics with visual charts.
- Allow any user to view their profile — no authentication required.
- Deploy as a static site on **GitHub Pages**.
- Clean, maintainable codebase following **clean code** principles.

---

## 3. Tech Stack

| Layer              | Technology                        |
| ------------------ | --------------------------------- |
| Framework          | React 18+ with TypeScript         |
| Build tool         | Vite                              |
| Routing            | React Router v6                   |
| State management   | Redux Toolkit + RTK Query         |
| Styling            | Styled Components                 |
| Charts             | Recharts                          |
| Testing            | Vitest + React Testing Library    |
| Linting/Formatting | ESLint + Prettier                 |
| Deployment         | GitHub Pages (via GitHub Actions) |

---

## 4. Data Source — BeatLeader API

**Base URL:** `https://api.beatleader.com`

### 4.1 Key Endpoints

| Endpoint                              | Purpose                                  |
| ------------------------------------- | ---------------------------------------- |
| `GET /player/{id}`                    | Player profile & aggregate stats         |
| `GET /player/{id}/scores`             | Player scores (paginated)                |
| `GET /player/{id}/scores/compact`     | Compact score list (lighter payload)     |
| `GET /player/{id}/accgraph`           | Accuracy graph data                      |
| `GET /player/{id}/history`            | Statistical history over time            |
| `GET /player/{id}/pinnedScores`       | Pinned scores                            |

### 4.2 Scores Endpoint — Key Parameters

| Parameter  | Type   | Description                                                      |
| ---------- | ------ | ---------------------------------------------------------------- |
| `page`     | int    | Page number (1-based)                                            |
| `count`    | int    | Items per page (default 8, max 100)                              |
| `sortBy`   | string | `date`, `pp`, `acc`, `rank`, `stars`, `maxStreak`, etc.          |
| `order`    | string | `desc` or `asc`                                                  |
| `search`   | string | Song name search                                                 |
| `diff`     | string | Difficulty filter (`easy`, `normal`, `hard`, `expert`, `expertplus`) |
| `type`     | string | Score type filter                                                |

### 4.3 Player ID Extraction

Users will input one of the following formats:
- Full URL: `https://beatleader.com/u/340247` or `https://beatleader.com/u/340247/scores`
- Just the ID: `340247`

The app must parse the player ID from any of these formats.

---

## 5. Pages & Routes

### 5.1 Home Page — `/`

- Welcome message explaining the app.
- **Player search input** — text field accepting a BeatLeader profile URL or player ID.
- "View Profile" button that navigates to the player page.
- Quick links to recently viewed profiles (stored in `localStorage`).

### 5.2 Player Profile Page — `/player/:id`

Two tabs/sections:

#### 5.2.1 Stats Overview

Displays the player's global statistics:

- **Header:** Avatar, username, country flag, global rank, country rank.
- **Stat cards:**
  - Total play count
  - Ranked play count
  - Unranked play count
  - Average accuracy (all / ranked / unranked)
  - Top accuracy
  - Total score
  - Total playtime
  - Max streak
  - Level & experience
- **Charts (Recharts):**
  - Accuracy distribution histogram (buckets: <60%, 60-70%, 70-80%, 80-90%, 90-95%, 95-100%)
  - Scores over time (date on X axis, accuracy on Y axis)
  - Difficulty breakdown (pie/donut chart showing count per difficulty level)

#### 5.2.2 Scores List

A paginated, filterable, sortable table/list of all player scores.

**Columns displayed per score:**

| Column         | Source field                          |
| -------------- | ------------------------------------- |
| Cover          | `leaderboard.song.coverImage`         |
| Song name      | `leaderboard.song.name`               |
| Difficulty     | `leaderboard.difficulty.difficultyName` |
| Mode           | `leaderboard.difficulty.modeName`     |
| Accuracy       | `accuracy` (formatted as %)           |
| Score          | `modifiedScore` or `baseScore`        |
| Rank           | `rank`                                |
| Full Combo     | `fullCombo` (icon/badge)              |
| Modifiers      | `modifiers`                           |
| Misses         | `missedNotes`                         |
| Bad Cuts       | `badCuts`                             |
| Date           | `timeset` (formatted)                 |

**Sorting options:**
- By date (default, descending)
- By accuracy

**Filters:**
- Difficulty: All / Easy / Normal / Hard / Expert / Expert+
- Search by song name (debounced text input)

**Pagination:**
- Server-side pagination via API `page` and `count` parameters.
- Page size: configurable (default 20).
- Page navigation controls (prev/next + page numbers).

### 5.3 Not Found Page — `/404`

Simple 404 page for invalid routes.

---

## 6. Component Architecture

```
src/
├── app/
│   ├── store.ts              # Redux store configuration
│   └── App.tsx               # Root component with Router
├── features/
│   ├── player/
│   │   ├── api/
│   │   │   └── playerApi.ts  # RTK Query API slice for player data
│   │   ├── components/
│   │   │   ├── PlayerHeader.tsx
│   │   │   ├── StatCards.tsx
│   │   │   ├── AccuracyChart.tsx
│   │   │   ├── DifficultyChart.tsx
│   │   │   ├── ScoresOverTimeChart.tsx
│   │   │   └── ScoresList.tsx
│   │   ├── hooks/
│   │   │   └── usePlayerScores.ts
│   │   ├── types/
│   │   │   └── player.types.ts
│   │   └── PlayerPage.tsx
│   └── home/
│       ├── components/
│       │   ├── PlayerSearchInput.tsx
│       │   └── RecentProfiles.tsx
│       └── HomePage.tsx
├── shared/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── styles/
│   │   ├── GlobalStyle.ts
│   │   └── theme.ts
│   ├── utils/
│   │   ├── parsePlayerId.ts
│   │   ├── formatAccuracy.ts
│   │   ├── formatDate.ts
│   │   └── formatScore.ts
│   └── constants.ts
├── main.tsx
└── vite-env.d.ts
```

---

## 7. State Management — Redux Toolkit + RTK Query

### 7.1 RTK Query API Slice

```
playerApi:
  - getPlayer(id)          → GET /player/{id}
  - getPlayerScores(id, params) → GET /player/{id}/scores
  - getPlayerAccGraph(id)  → GET /player/{id}/accgraph
  - getPlayerHistory(id)   → GET /player/{id}/history
```

RTK Query handles:
- Caching (avoid re-fetching when switching tabs).
- Pagination state.
- Loading / error states.

### 7.2 UI State Slice

Managed with a Redux slice:
- Current sort column & order
- Active difficulty filter
- Search query
- Page size preference

---

## 8. Styling — Dark Theme

The UI follows a **dark theme** inspired by BeatLeader:

| Token              | Value     |
| ------------------ | --------- |
| Background primary | `#1a1a2e` |
| Background card    | `#16213e` |
| Accent color       | `#e94560` |
| Text primary       | `#eaeaea` |
| Text secondary     | `#a0a0b0` |
| Border             | `#2a2a4a` |
| Success (FC)       | `#4ade80` |
| Difficulty Expert+  | `#8f48db` |
| Difficulty Expert   | `#bf2a42` |
| Difficulty Hard     | `#ff6347` |
| Difficulty Normal   | `#59b0f4` |
| Difficulty Easy     | `#3cb371` |

---

## 9. Performance Considerations

- **Lazy loading:** Pages loaded with `React.lazy()` + `Suspense`.
- **Debounced search:** 300ms debounce on the song name search input.
- **Image optimization:** Song cover images are small thumbnails; use `loading="lazy"` on `<img>`.
- **Pagination:** Server-side via API — never load all scores at once.
- **Memoization:** Use `React.memo` and `useMemo` where appropriate for chart data.

---

## 10. Deployment — GitHub Pages

- **Build command:** `vite build`
- **Output directory:** `dist/`
- **Base path:** configured in `vite.config.ts` as `base: '/BeatPersonalLeader/'`
- **GitHub Actions workflow:** On push to `main`, build and deploy to `gh-pages` branch.
- **SPA routing:** Use a `404.html` redirect hack for client-side routing on GitHub Pages.

---

## 11. Testing Strategy

- **Unit tests:** Utility functions (`parsePlayerId`, `formatAccuracy`, etc.).
- **Component tests:** Key components with React Testing Library.
- **API mocking:** MSW (Mock Service Worker) to mock BeatLeader API responses in tests.
- **CI:** Run tests in GitHub Actions before deployment.

---

## 12. Future Enhancements (Out of Scope for v1)

- Score comparison between two players.
- Score improvement tracking over time.
- Playlist generation from scores.
- PWA support for offline access.
- Internationalization (i18n) support.

---

## 13. API Response Examples

### Player Profile (abbreviated)

```json
{
  "id": "340247",
  "name": "monnierant",
  "avatar": "https://cdn.assets.beatleader.com/340247R37.png",
  "country": "FR",
  "rank": 0,
  "countryRank": 7747,
  "pp": 0,
  "level": 51,
  "scoreStats": {
    "totalPlayCount": 29,
    "rankedPlayCount": 0,
    "unrankedPlayCount": 29,
    "averageAccuracy": 0.6976837,
    "averageUnrankedAccuracy": 0.6978706,
    "topAccuracy": 0.8026046,
    "totalScore": 4510276,
    "maxStreak": 1
  }
}
```

### Score Entry (abbreviated)

```json
{
  "id": 31085091,
  "leaderboard": {
    "song": {
      "name": "Brave Shine",
      "author": "Aimer",
      "mapper": "Joetastic & OneSpookyBoi",
      "coverImage": "https://eu.cdn.beatsaver.com/...",
      "bpm": 170.985,
      "duration": 231
    },
    "difficulty": {
      "difficultyName": "Expert",
      "modeName": "Standard",
      "stars": null
    }
  },
  "accuracy": 0.6840764,
  "baseScore": 616541,
  "modifiedScore": 38270,
  "rank": 623,
  "fullCombo": false,
  "modifiers": "NA,NB,BE",
  "missedNotes": 3,
  "badCuts": 0,
  "timeset": "1775243785"
}
```
