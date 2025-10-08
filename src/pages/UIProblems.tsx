import { Outlet, useLocation } from "react-router-dom";
import UIProblemsComponents from "@/components/UIProblemsComponents";
import SubSidbar from "@/components/SubSidbar";
import { uiProblemRoutes } from "@/routes/uiProblemRoutes";

const UIProblems = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/ui-problems";

  return (
    <div className="flex">
      <div>
        <SubSidbar subSidbarRoutes={uiProblemRoutes} title="UI Problems" />
      </div>
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2">
        {isParentPath ? <UIProblemsComponents /> : <Outlet />}
      </main>
    </div>
  );
};

export default UIProblems;
