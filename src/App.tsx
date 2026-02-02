import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import UIProblems from "./pages/UIProblems";
import MCQuizApp from "./pages/UIProblems/MCQuizApp";
import FolderFileExplorerOne from "./pages/UIProblems/FolderFileExplorerOne";
import FolderFileExplorerTwo from "./pages/UIProblems/FolderFileExplorerTwo";
import OtpInput from "./pages/UIProblems/OtpInput";
import { Toaster } from "./components/ui/sonner";
import TicTacToe from "./pages/UIProblems/TicTacToe";
import TicTacToeII from "./pages/UIProblems/TicTacToeII";
import TicTacToeIII from "./pages/UIProblems/TicTacToeIII";
import DiceRollerOne from "./pages/UIProblems/DiceRollerOne";
import DiceRollerTwo from "./pages/UIProblems/DiceRollerTwo";
import DiceRollerThree from "./pages/UIProblems/DiceRollerThree";
import DiceRollerFour from "./pages/UIProblems/DiceRollerFour";
import MultiSelect from "./pages/UIProblems/MultiSelect";
import UserLists from "./pages/UIProblems/UserLists";
import GridLights from "./pages/UIProblems/GridLights";
import GridLightsII from "./pages/UIProblems/GridLightsII";
import GridLightsIII from "./pages/UIProblems/GridLightsIII";
import TaskManagment from "./pages/UIProblems/TaskManagment";
import TaskManagmentII from "./pages/UIProblems/TaskManagmentII";
import TaskManagmentIII from "./pages/UIProblems/TaskManagmentIII";
import TrafficLight from "./pages/UIProblems/TrafficLight";
import TrafficLightII from "./pages/UIProblems/TrafficLightII";
import GitPage from "./pages/GitPage";
import BasicGitCommands from "./pages/GitPage/BasicGitCommands";
import BranchingCommands from "./pages/GitPage/BranchingCommands";
import RemoteCommands from "./pages/GitPage/RemoteCommands";
import StagingAndCommitting from "./pages/GitPage/StagingAndCommitting";
import StarRating from "./pages/UIProblems/StarRating";
import NestedBox from "./pages/UIProblems/NestedBox";
import PaginationPage from "./pages/UIProblems/PaginationPage";
import InfiniteScrollPage from "./pages/UIProblems/InfiniteScrollPage";
import StopwatchPage from "./pages/UIProblems/StopwatchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ui-problems" element={<UIProblems />}>
            <Route path="explorer-one" element={<FolderFileExplorerOne />} />
            <Route path="explorer-two" element={<FolderFileExplorerTwo />} />
            <Route path="star-rating" element={<StarRating />} />
            <Route path="nested-box" element={<NestedBox />} />
            <Route path="task-managment" element={<TaskManagment />} />
            <Route path="task-managment-ii" element={<TaskManagmentII />} />
            <Route path="task-managment-iii" element={<TaskManagmentIII />} />
            <Route path="pagination" element={<PaginationPage />} />
            <Route path="infinite-scroll" element={<InfiniteScrollPage />} />
            <Route path="stopwatch" element={<StopwatchPage />} />
            <Route path="mc-quiz-app" element={<MCQuizApp />} />
            <Route path="otp-input" element={<OtpInput />} />
            <Route path="tic-tac-toe" element={<TicTacToe />} />
            <Route path="tic-tac-toe-ii" element={<TicTacToeII />} />
            <Route path="tic-tac-toe-iii" element={<TicTacToeIII />} />
            <Route path="dice-roller-i" element={<DiceRollerOne />} />
            <Route path="dice-roller-ii" element={<DiceRollerTwo />} />
            <Route path="dice-roller-iii" element={<DiceRollerThree />} />
            <Route path="dice-roller-iv" element={<DiceRollerFour />} />
            <Route path="multi-select" element={<MultiSelect />} />
            <Route path="user-lists" element={<UserLists />} />
            <Route path="grid-lights" element={<GridLights />} />
            <Route path="grid-lights-ii" element={<GridLightsII />} />
            <Route path="grid-lights-iii" element={<GridLightsIII />} />
            <Route path="traffic-light" element={<TrafficLight />} />
            <Route path="traffic-light-ii" element={<TrafficLightII />} />
          </Route>
          <Route path="git" element={<GitPage />}>
            <Route path="basic-git-commands" element={<BasicGitCommands />} />
            <Route
              path="branching-git-commands"
              element={<BranchingCommands />}
            />
            <Route path="remote-git-commands" element={<RemoteCommands />} />
            <Route
              path="staging-and-committing"
              element={<StagingAndCommitting />}
            />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
