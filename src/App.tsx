import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import UIProblems from "./pages/UIProblems";
import MCQuizApp from "./pages/UIProblems/MCQuizApp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ui-problems" element={<UIProblems />}>
            <Route path="mc-quiz-app" element={<MCQuizApp />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
