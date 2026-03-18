## Project Structure (UI-Problems-New)

This repository is a **React + TypeScript + Vite** app that acts as a learning/playground for:
- UI component problems (pages + supporting components)
- React hooks examples
- Algorithms visualizations/pages
- Git learning pages
- System design notes + diagrams (Markdown, Mermaid, Excalidraw)

It uses:
- **Vite** for dev/build
- **React Router** for navigation (nested routes)
- **Redux Toolkit** for shared UI state
- **Tailwind CSS** for styling
- **shadcn/ui**-style component primitives under `src/components/ui/` (Radix-based)
- Path alias **`@` → `src/`** (configured in `vite.config.ts`)

---

## Top-level layout

```
/
├─ docs/
│  └─ PROJECT_STRUCTURE.md        # (this document)
├─ public/                        # static assets served as-is
├─ src/                           # application code
├─ index.html                     # Vite entry HTML
├─ package.json                   # scripts + deps
├─ vite.config.ts                 # Vite config + path alias (@ → src)
├─ tailwind.config.js             # Tailwind config
├─ postcss.config.js              # PostCSS config
├─ tsconfig*.json                 # TS configs (app/node)
└─ eslint.config.js               # ESLint config
```

---

## Source (`src/`) structure

High-level mental model:
- `main.tsx` boots the app (Redux Provider + Router)
- `App.tsx` defines **routing** and **code-splitting**
- `layouts/` defines app shell (header/sidebar/outlet)
- `pages/` holds route pages
- `components/` holds shared and feature components (incl. `components/ui/` primitives)
- `routes/` holds nav metadata (sidebar route lists) used by the UI
- `store/` holds Redux setup, action types, actions, and reducers
- `systemDesign/` is documentation content (not runtime React pages)

```
src/
├─ main.tsx
├─ App.tsx
├─ index.css
├─ assets/
├─ CallApplyBind/                 # JS fundamentals practice (non-app)
├─ Objects/                       # JS fundamentals practice (non-app)
├─ Promises/                      # JS fundamentals practice (non-app)
├─ arrayPolyfill/                 # polyfills practice (non-app)
├─ components/
│  ├─ ui/                         # reusable UI primitives (shadcn/ui style)
│  ├─ Header.tsx
│  ├─ Sidebar.tsx
│  ├─ SearchBar.tsx
│  ├─ CodeBlock.tsx
│  ├─ CodeViewModal.tsx
│  └─ ...feature component folders
├─ data/                          # app/demo data (varies by problem)
├─ hooks/                         # reusable hooks (shared across pages)
├─ layouts/
│  └─ MainLayout.tsx
├─ lib/
│  └─ utils.ts                    # small shared utilities (cn, sleep, generateArray)
├─ pages/
│  ├─ HomePage.tsx
│  ├─ UIProblems.tsx
│  ├─ ReactHooks.tsx
│  ├─ AlgorithmPage.tsx
│  ├─ GitPage.tsx
│  ├─ UIProblems/                 # UI problems: route-level pages
│  ├─ ReactHooks/                 # hooks demo pages
│  ├─ AlgorithmPage/              # algorithm sub-pages/visualizations
│  └─ GitPage/                    # git sub-pages
├─ routes/                        # sidebar/nav route metadata lists
│  ├─ mainRoutes.tsx
│  ├─ uiProblemRoutes.tsx
│  ├─ reactHooksRoutes.tsx
│  ├─ algorithmsRoutes.tsx
│  └─ gitPageRoutes.tsx
├─ store/
│  ├─ store.ts                    # Redux Toolkit configureStore (reducer registry)
│  ├─ actionTypes.ts              # string constants for async thunk action types
│  ├─ actions/                    # async thunk action creators (theme/search/common)
│  └─ reducers/                   # reducers (theme/search/common)
├─ systemDesign/                  # Markdown notes + diagrams (non-app content)
├─ types/                         # shared TS types (if/when needed)
├─ questions/                     # JS utilities/DSA practice snippets (non-app)
├─ leetCode/                      # LeetCode JS solutions + html index (non-app)
├─ greatfrontend/                 # GreatFrontend practice snippets (non-app)
└─ vite-env.d.ts
```

---

## App entrypoints & runtime flow

### `src/main.tsx`
Bootstraps the React tree:
- Redux `<Provider store={store}>`
- React Router `<BrowserRouter>`
- Renders `<App />`

This is where any **global providers** belong (Redux, Router, theme providers, query clients, etc.).

### `src/App.tsx`
Owns:
- **Route table** (React Router `<Routes>`)
- **Nested routing** under `MainLayout`
- **Code splitting** via `lazy()` + `<Suspense>` for most feature pages
- App-level UI like toast `<Toaster />`

Routing pattern in this repo:
- `/` → `HomePage`
- `/ui-problems/*` → UI problems section (nested children)
- `/react-hooks/*` → hooks section
- `/algorithms/*` → algorithms section
- `/git/*` → git section

### `src/layouts/MainLayout.tsx`
The “shell layout”:
- Renders `<Header />` and `<Sidebar />`
- Renders route content via `<Outlet />`

If you need shared chrome (top nav, side nav, footer, background, spacing), it belongs here.

---

## Routing vs navigation metadata (important distinction)

This codebase keeps **two concepts**:

- **Router config**: the real React Router routes live in `src/App.tsx` (the source of truth for what renders).
- **Navigation metadata**: arrays used for sidebars/menus live under `src/routes/`:
  - `mainRoutes.tsx` (top-level sections)
  - `uiProblemRoutes.tsx`, `reactHooksRoutes.tsx`, `algorithmsRoutes.tsx`, `gitPageRoutes.tsx` (section pages)

`src/components/Sidebar.tsx` reads `mainRoutes` and renders nav UI based on the current location.

Practical rule:
- **If you add a new page**, you usually must update:
  - `src/App.tsx` (so it actually renders)
  - the relevant file in `src/routes/` (so it appears in navigation)

---

## Components organization

### `src/components/ui/` (UI primitives)
This folder is the reusable design system layer:
- Buttons, dialogs, tabs, select, popovers, tooltips, etc.
- Typically built with Radix + Tailwind + helper `cn()` from `src/lib/utils.ts`.

Guidelines:
- Prefer composing from `components/ui/*` for consistent UX.
- Keep these components **generic** (no app-specific business logic).

### `src/components/*` (app & feature components)
This is where shared application components live:
- Layout chrome (`Header`, `Sidebar`)
- “Meta” helpers (`CodeBlock`, `CodeViewModal`)
- Feature-specific component folders (e.g., `ChatComponents/`, `AlgorithmsComponents/`, etc.)

Heuristic for placement:
- **Used by multiple routes?** Put it under `src/components/` (possibly with its own folder).
- **Only used inside one route page?** Keep it near the route under `src/pages/<Section>/<Page>/...` *or* in the existing `...Components/` folder for that feature (match current style).

---

## Pages (route-level components)

`src/pages/` is the route layer. It contains:
- Section root pages: `UIProblems.tsx`, `ReactHooks.tsx`, `AlgorithmPage.tsx`, `GitPage.tsx`
- Sub-pages under subfolders (e.g., `src/pages/UIProblems/*`)

Conventions in this repo:
- A “section root” page typically provides the **index / landing** for that section.
- Many sub-pages are **lazy-loaded** in `App.tsx` to keep initial bundle smaller.

---

## State management (`src/store/`)

Redux Toolkit is configured in `src/store/store.ts`:
- `configureStore({ reducer: { themes, searchQuery, commonState } })`
- Serializable check is disabled (common when storing non-serializable UI bits, but keep it minimal).

This repo also keeps a classic “actions + actionTypes” layer:
- `src/store/actionTypes.ts`: action type constants used as `createAsyncThunk(type, ...)` identifiers.
- `src/store/actions/*`: async thunk action creators (e.g. theme, search bar, common modal).

Where to put state:
- **Local UI state** (component-specific): use React state (`useState`, `useReducer`).
- **Cross-page UI state** (theme, shared search input, global toggles): use Redux slices under `src/store/reducers/`.

Type helpers:
- `RootState` and `AppDispatch` are exported from `store.ts`.

---

## Hooks (`src/hooks/`)

Custom hooks shared across pages/components live here, e.g.:
- `useSearchBar.ts`
- `useAudioMusic.tsx`
- `use-mobile.tsx`

Guidelines:
- Keep hooks pure and reusable.
- Avoid importing route pages into hooks (hooks should point “down” to utilities and “up” only via callbacks).

---

## Utilities (`src/lib/`)

`src/lib/utils.ts` currently provides:
- `cn()` Tailwind class merging helper (clsx + tailwind-merge)
- Small utilities like `sleep(ms)` and `generateArray(size)`

Guidelines:
- Keep `lib/` dependency-light.
- Prefer one-purpose, testable helpers.

---

## Non-runtime content folders (learning material)

These folders are part of the repo but are not necessarily imported into the React app:

- **`src/systemDesign/`**: Markdown system design write-ups + assets (Mermaid `.mmd`, `.svg`, Excalidraw).
- **`src/questions/`**: JS implementation exercises / utilities.
- **`src/leetCode/`**: LeetCode solutions and an HTML index.
- **`src/greatfrontend/`**: GreatFrontend practice snippets and an HTML index.

If you want to render this content inside the app later:
- Create a page under `src/pages/...`
- Add routing in `src/App.tsx`
- Add nav metadata under `src/routes/...`

---

## Styling

- Global styles live in `src/index.css`.
- Component styles are mostly Tailwind utility classes.
- Use `cn()` for conditional class composition.

Practical guidance:
- Keep spacing/layout rules in layout/page components.
- Keep `components/ui/` focused on consistent primitives rather than one-off styling.

---

## How to add a new UI Problem page (recommended workflow)

1. **Create the page component**
   - Add a new file under `src/pages/UIProblems/<YourPage>.tsx`

2. **(Optional) Add supporting components**
   - If the feature has multiple pieces, add a folder under `src/components/<Feature>Components/`
   - Or colocate under `src/pages/UIProblems/<YourPage>/` if it’s truly local (match your preference; repo currently uses `...Components/` a lot)

3. **Register the route**
   - Add a `lazy(() => import(...))` entry in `src/App.tsx`
   - Add it to `uiRoutes` array (path + element)

4. **Add it to navigation**
   - Add an entry in `src/routes/uiProblemRoutes.tsx` with `name`, `href`, and `icon`

5. **If you need shared state**
   - Prefer local state first
   - Add a reducer under `src/store/reducers/` only if multiple screens/components need it

---

## “Rules of thumb” for advanced contributors

- **Single source of truth**: rendering routes live in `App.tsx`; nav arrays are for UI menus only.
- **Keep primitives generic**: `components/ui/` should not depend on page-level code.
- **Colocate by change rate**: keep frequently-changed feature code close together to reduce churn across unrelated folders.
- **Prefer lazy-loading** for heavy demo pages to keep startup fast (this repo already does this).
- **Use `@/` imports** for readability and stable refactors (`@` is `src/`).

---

## Quick pointers (where to look first)

- **App boot**: `src/main.tsx`
- **All routes**: `src/App.tsx`
- **Layout shell**: `src/layouts/MainLayout.tsx`
- **Sidebar behavior**: `src/components/Sidebar.tsx`
- **Nav definitions**: `src/routes/*.tsx`
- **Redux store**: `src/store/store.ts`
- **UI kit primitives**: `src/components/ui/`
