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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ui-problems" element={<UIProblems />}>
            <Route path="explorer-one" element={<FolderFileExplorerOne />} />
            <Route path="explorer-two" element={<FolderFileExplorerTwo />} />
            <Route path="mc-quiz-app" element={<MCQuizApp />} />
            <Route path="otp-input" element={<OtpInput />} />
            <Route path="tic-tac-toe" element={<TicTacToe />} />
            <Route path="tic-tac-toe-ii" element={<TicTacToeII />} />
            <Route path="tic-tac-toe-iii" element={<TicTacToeIII />} />
            <Route path="dice-roller-i" element={<DiceRollerOne />} />
            <Route path="dice-roller-ii" element={<DiceRollerTwo />} />
            <Route path="dice-roller-iii" element={<DiceRollerThree />} />
            <Route path="dice-roller-iv" element={<DiceRollerFour />} />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
