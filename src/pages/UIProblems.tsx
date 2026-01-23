import { Outlet, useLocation } from "react-router-dom";
import UIProblemsComponents from "@/components/UIProblemsComponents";
import SubSidbar from "@/components/SubSidbar";
import { uiProblemRoutes } from "@/routes/uiProblemRoutes";

const UIProblems = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/ui-problems";

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="calc(100vh-4rem) overflow-auto">
        <SubSidbar subSidbarRoutes={uiProblemRoutes} title="UI Problems" />
      </div>
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        {isParentPath ? <UIProblemsComponents uiComponents={uiProblemRoutes} /> : <Outlet />}
      </main>
    </div>
  );
};

export default UIProblems;
