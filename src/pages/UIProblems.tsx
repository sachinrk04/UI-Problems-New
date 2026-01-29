import { Outlet, useLocation } from "react-router-dom";
import UIProblemsComponents from "@/components/UIProblemsComponents/UIProblemsComponents";
import SubSidbar from "@/components/SubSidbar";
import { uiProblemRoutes } from "@/routes/uiProblemRoutes";
import { Footer } from "@/components/Footer";

const UIProblems = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/ui-problems";

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        <>
          {isParentPath ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              <UIProblemsComponents uiComponents={uiProblemRoutes} />
              <Footer />
            </div>
          ) : (
            <div className="h-[calc(100vh-4rem)] overflow-hidden">
              {" "}
              <Outlet />{" "}
            </div>
          )}
        </>
      </main>
      <div className="calc(100vh-4rem) overflow-auto">
        <SubSidbar subSidbarRoutes={uiProblemRoutes} title="Ui Probems" />
      </div>
    </div>
  );
};

export default UIProblems;
