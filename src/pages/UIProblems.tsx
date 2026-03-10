import { Outlet, useLocation } from "react-router-dom";
import UIProblemsComponents from "@/components/UIProblemsComponents/UIProblemsComponents";
import SubSidbar from "@/components/SubSidbar";
import { uiProblemRoutes } from "@/routes/uiProblemRoutes";
import { Footer } from "@/components/Footer";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useSearchBar } from "@/hooks/useSearchBar";

const UIProblems = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/ui-problems";
  const { query } = useSelector((state: RootState) => state.searchQuery);

  const filterUIProblemRoutes = useSearchBar(uiProblemRoutes.slice(1), query, ["name"])

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        <>
          {isParentPath ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              <UIProblemsComponents uiComponents={filterUIProblemRoutes} />
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
        <SubSidbar subSidbarRoutes={uiProblemRoutes} />
      </div>
    </div>
  );
};

export default UIProblems;
