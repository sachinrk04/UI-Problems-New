import { Outlet, useLocation } from "react-router-dom";
import ReactHooksComponent from "@/components/ReactHooksComponents/ReactHooksComponent";
import SubSidbar from "@/components/SubSidbar";
import { reactHooksRoutes } from "@/routes/reactHooksRoutes";
import { Footer } from "@/components/Footer";

const ReactHooks = () => {

    const location = useLocation();
  const isParentPath = location.pathname === "/react-hooks";
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        <>
          {isParentPath ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              <ReactHooksComponent hooksComponents={reactHooksRoutes.slice(1)} />
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
}

export default ReactHooks;
