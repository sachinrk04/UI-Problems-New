import { Outlet, useLocation } from "react-router-dom";
import GitPageComponents from "@/components/GitPageComponents/GitPageComponents";
import SubSidbar from "@/components/SubSidbar";
import { gitPageRoutes } from "@/routes/gitPageRoutes";
import { Footer } from "@/components/Footer";

const GitPage = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/git";

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        <>
          {isParentPath ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              <GitPageComponents />
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
      <div className="calc(100vh-4rem) overflow-auto shadow-inner">
        <SubSidbar subSidbarRoutes={gitPageRoutes} />
      </div>
    </div>
  );
};

export default GitPage;
