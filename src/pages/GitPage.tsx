import { Outlet, useLocation } from "react-router-dom";
import GitPageComponents from "@/components/GitPageComponents/GitPageComponents";
import SubSidbar from "@/components/SubSidbar";
import { gitPageRoutes } from "@/routes/gitPageRoutes";
import { Footer } from "@/components/Footer";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useSearchBar } from "@/hooks/useSearchBar";

const GitPage = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/git";
  const { query } = useSelector((state: RootState) => state.searchQuery);

  const filterGitPageRoutes = useSearchBar(gitPageRoutes.slice(1), query, ["name"]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        <>
          {isParentPath ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              <GitPageComponents gitComponents={filterGitPageRoutes} />
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
