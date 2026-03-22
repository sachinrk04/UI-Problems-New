import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./layouts/MainLayout";

// ─── Eagerly loaded (shell pages, always needed) ──────────────────────────────
import HomePage from "./pages/HomePage";
import UIProblems from "./pages/UIProblems";
import ReactHooks from "./pages/ReactHooks";
import AlgorithmPage from "./pages/AlgorithmPage";
import GitPage from "./pages/GitPage";
import HeapSortPage from "./pages/AlgorithmPage/HeapSortPage";

// ─── Lazy loaded ──────────────────────────────────────────────────────────────
// UI Problems
const AutocompletePage = lazy(
  () => import("./pages/UIProblems/AutocompletePage"),
);
const FolderFileExplorerOne = lazy(
  () => import("./pages/UIProblems/FolderFileExplorerOne"),
);
const FolderFileExplorerTwo = lazy(
  () => import("./pages/UIProblems/FolderFileExplorerTwo"),
);
const StarRating = lazy(() => import("./pages/UIProblems/StarRating"));
const NestedBox = lazy(() => import("./pages/UIProblems/NestedBox"));
const TaskManagment = lazy(() => import("./pages/UIProblems/TaskManagment"));
const TaskManagmentII = lazy(
  () => import("./pages/UIProblems/TaskManagmentII"),
);
const TaskManagmentIII = lazy(
  () => import("./pages/UIProblems/TaskManagmentIII"),
);
const PaginationPage = lazy(() => import("./pages/UIProblems/PaginationPage"));
const InfiniteScrollPage = lazy(
  () => import("./pages/UIProblems/InfiniteScrollPage"),
);
const StopwatchPage = lazy(() => import("./pages/UIProblems/StopwatchPage"));
const ChatPage = lazy(() => import("./pages/UIProblems/ChatPage"));
const MCQuizApp = lazy(() => import("./pages/UIProblems/MCQuizApp"));
const OtpInput = lazy(() => import("./pages/UIProblems/OtpInput"));
const DebounceInput = lazy(() => import("./pages/UIProblems/DebounceInput"));
const TicTacToe = lazy(() => import("./pages/UIProblems/TicTacToe"));
const TicTacToeII = lazy(() => import("./pages/UIProblems/TicTacToeII"));
const TicTacToeIII = lazy(() => import("./pages/UIProblems/TicTacToeIII"));
const DiceRollerOne = lazy(() => import("./pages/UIProblems/DiceRollerOne"));
const DiceRollerTwo = lazy(() => import("./pages/UIProblems/DiceRollerTwo"));
const DiceRollerThree = lazy(
  () => import("./pages/UIProblems/DiceRollerThree"),
);
const DiceRollerFour = lazy(() => import("./pages/UIProblems/DiceRollerFour"));
const MultiSelect = lazy(() => import("./pages/UIProblems/MultiSelect"));
const UserLists = lazy(() => import("./pages/UIProblems/UserLists"));
const GridLights = lazy(() => import("./pages/UIProblems/GridLights"));
const GridLightsII = lazy(() => import("./pages/UIProblems/GridLightsII"));
const GridLightsIII = lazy(() => import("./pages/UIProblems/GridLightsIII"));
const TrafficLight = lazy(() => import("./pages/UIProblems/TrafficLight"));
const TrafficLightII = lazy(() => import("./pages/UIProblems/TrafficLightII"));
const BirthYearHistogramPage = lazy(
  () => import("./pages/UIProblems/BirthYearHistogramPage"),
);
const NestedCheckboxesPage = lazy(
  () => import("./pages/UIProblems/NestedCheckboxesPage"),
);
const TowerOfHanoiPage = lazy(
  () => import("./pages/UIProblems/TowerOfHanoiPage"),
);
const TowerOfHanoiDnDII = lazy(
  () => import("./pages/UIProblems/TowerOfHanoiDnDII"),
);
const TransferListPage = lazy(
  () => import("./pages/UIProblems/TransferListPage"),
);
const TransferListIIPage = lazy(
  () => import("./pages/UIProblems/TransferListIIPage"),
);
const SelectableCellsPage = lazy(
  () => import("./pages/UIProblems/SelectableCellsPage"),
);
const LiftingStateUpPage = lazy(
  () => import("./pages/UIProblems/LiftingStateUpPage"),
);
const GenerateTablePage = lazy(
  () => import("./pages/UIProblems/GenerateTablePage"),
);
const ReactVirtualizedPage = lazy(
  () => import("./pages/UIProblems/ReactVirtualizedPage"),
);

// React Hooks
const UseCounterPage = lazy(() => import("./pages/ReactHooks/UseCounterPage"));
const UseCounterPageII = lazy(
  () => import("./pages/ReactHooks/UseCounterPageII"),
);
const UseDebouncePage = lazy(
  () => import("./pages/ReactHooks/UseDebouncePage"),
);
const UseLocalStoragePage = lazy(
  () => import("./pages/ReactHooks/UseLocalStoragePage"),
);
const UseFetchPage = lazy(() => import("./pages/ReactHooks/UseFetchPage"));
const UseGeolocationPage = lazy(
  () => import("./pages/ReactHooks/UseGeolocationPage"),
);
const UseWindowSizePage = lazy(
  () => import("./pages/ReactHooks/UseWindowSizePage"),
);
const UseVirtualListPage = lazy(
  () => import("./pages/ReactHooks/UseVirtualListPage"),
);
const UseStatePage = lazy(() => import("./pages/ReactHooks/UseStatePage"));

// Algorithms
const CocktailShakerSortPage = lazy(
  () => import("./pages/AlgorithmPage/CocktailShakerSortPage"),
);

// Git
const BasicGitCommands = lazy(() => import("./pages/GitPage/BasicGitCommands"));
const BranchingCommands = lazy(
  () => import("./pages/GitPage/BranchingCommands"),
);
const RemoteCommands = lazy(() => import("./pages/GitPage/RemoteCommands"));
const StagingAndCommitting = lazy(
  () => import("./pages/GitPage/StagingAndCommitting"),
);

// ─── Route config ─────────────────────────────────────────────────────────────
type RouteConfig = { path: string; element: React.ReactNode };

const uiRoutes: RouteConfig[] = [
  { path: "autocomplete", element: <AutocompletePage /> },
  { path: "explorer-one", element: <FolderFileExplorerOne /> },
  { path: "explorer-two", element: <FolderFileExplorerTwo /> },
  { path: "star-rating", element: <StarRating /> },
  { path: "nested-box", element: <NestedBox /> },
  { path: "task-managment", element: <TaskManagment /> },
  { path: "task-managment-ii", element: <TaskManagmentII /> },
  { path: "task-managment-iii", element: <TaskManagmentIII /> },
  { path: "pagination", element: <PaginationPage /> },
  { path: "infinite-scroll", element: <InfiniteScrollPage /> },
  { path: "stopwatch", element: <StopwatchPage /> },
  { path: "chat", element: <ChatPage /> },
  { path: "mc-quiz-app", element: <MCQuizApp /> },
  { path: "otp-input", element: <OtpInput /> },
  { path: "debounce-input", element: <DebounceInput /> },
  { path: "tic-tac-toe", element: <TicTacToe /> },
  { path: "tic-tac-toe-ii", element: <TicTacToeII /> },
  { path: "tic-tac-toe-iii", element: <TicTacToeIII /> },
  { path: "dice-roller-i", element: <DiceRollerOne /> },
  { path: "dice-roller-ii", element: <DiceRollerTwo /> },
  { path: "dice-roller-iii", element: <DiceRollerThree /> },
  { path: "dice-roller-iv", element: <DiceRollerFour /> },
  { path: "multi-select", element: <MultiSelect /> },
  { path: "user-lists", element: <UserLists /> },
  { path: "grid-lights", element: <GridLights /> },
  { path: "grid-lights-ii", element: <GridLightsII /> },
  { path: "grid-lights-iii", element: <GridLightsIII /> },
  { path: "traffic-light", element: <TrafficLight /> },
  { path: "traffic-light-ii", element: <TrafficLightII /> },
  { path: "birth-year-histogram", element: <BirthYearHistogramPage /> },
  { path: "nested-checkboxes", element: <NestedCheckboxesPage /> },
  { path: "tower-of-hanoi", element: <TowerOfHanoiPage /> },
  { path: "tower-of-hanoi-ii", element: <TowerOfHanoiDnDII /> },
  { path: "transfer-list", element: <TransferListPage /> },
  { path: "transfer-list-ii", element: <TransferListIIPage /> },
  { path: "selectable-cells", element: <SelectableCellsPage /> },
  { path: "lifting-state-up", element: <LiftingStateUpPage /> },
  { path: "generate-table", element: <GenerateTablePage /> },
  { path: "react-virtualized", element: <ReactVirtualizedPage /> },
];

const hookRoutes: RouteConfig[] = [
  { path: "use-counter", element: <UseCounterPage /> },
  { path: "use-counter-ii", element: <UseCounterPageII /> },
  { path: "use-debounce", element: <UseDebouncePage /> },
  { path: "use-local-storage", element: <UseLocalStoragePage /> },
  { path: "use-fetch", element: <UseFetchPage /> },
  { path: "use-geolocation", element: <UseGeolocationPage /> },
  { path: "use-window-size", element: <UseWindowSizePage /> },
  { path: "use-virtual-list", element: <UseVirtualListPage /> },
  { path: "use-state-custom", element: <UseStatePage /> },
];

const algorithmRoutes: RouteConfig[] = [
  { path: "cocktail-shaker-sort", element: <CocktailShakerSortPage /> },
  { path: "heap-sort", element: <HeapSortPage /> },
];

const gitRoutes: RouteConfig[] = [
  { path: "basic-git-commands", element: <BasicGitCommands /> },
  { path: "branching-git-commands", element: <BranchingCommands /> },
  { path: "remote-git-commands", element: <RemoteCommands /> },
  { path: "staging-and-committing", element: <StagingAndCommitting /> },
];

// ─── Loading fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full py-20 text-sm text-muted-foreground">
      Loading...
    </div>
  );
}

// ─── Helper to wrap a lazy element with Suspense ─────────────────────────────
function Lazy({ element }: { element: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="ui-problems" element={<UIProblems />}>
            {uiRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<Lazy element={element} />}
              />
            ))}
          </Route>

          <Route path="react-hooks" element={<ReactHooks />}>
            {hookRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<Lazy element={element} />}
              />
            ))}
          </Route>

          <Route path="algorithms" element={<AlgorithmPage />}>
            {algorithmRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<Lazy element={element} />}
              />
            ))}
          </Route>

          <Route path="git" element={<GitPage />}>
            {gitRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<Lazy element={element} />}
              />
            ))}
          </Route>
        </Route>
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
