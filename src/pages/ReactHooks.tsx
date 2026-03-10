import { Outlet, useLocation } from "react-router-dom";
import ReactHooksComponent from "@/components/ReactHooksComponents/ReactHooksComponent";
import SubSidbar from "@/components/SubSidbar";
import { reactHooksRoutes } from "@/routes/reactHooksRoutes";
import { Footer } from "@/components/Footer";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useSearchBar } from "@/hooks/useSearchBar";

const ReactHooks = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/react-hooks";

  const { query } = useSelector((state: RootState) => state.searchQuery);

  const filterReactHooksRoutes = useSearchBar(
    reactHooksRoutes.slice(1),
    query,
    ["name"],
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        <>
          {isParentPath ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              <ReactHooksComponent hooksComponents={filterReactHooksRoutes} />
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
        <SubSidbar subSidbarRoutes={reactHooksRoutes} />
      </div>
    </div>
  );
};

export default ReactHooks;
