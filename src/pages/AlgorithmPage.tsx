import { Outlet, useLocation } from "react-router-dom";
import AlgorithmsComponents from "@/components/AlgorithmsComponents/AlgorithmsComponents";
import SubSidbar from "@/components/SubSidbar";
import { algorithmsRoutes } from "@/routes/algorithmsRoutes";
import { Footer } from "@/components/Footer";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useSearchBar } from "@/hooks/useSearchBar";
const AlgorithmPage = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/algorithms";

  const { query } = useSelector((state: RootState) => state.searchQuery);

  const filterAlgorithmsRoutes = useSearchBar(
    algorithmsRoutes.slice(1),
    query,
    ["name"],
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <main className="min-h-[calc(100vh-4rem)] flex-1 animate-in slide-in-from-bottom-2 overflow-auto">
        <>
          {isParentPath ? (
            <div className="h-[calc(100vh-4rem)] overflow-auto">
              <AlgorithmsComponents
                algorithmsComponent={filterAlgorithmsRoutes}
              />
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
        <SubSidbar subSidbarRoutes={algorithmsRoutes} />
      </div>
    </div>
  );
};

export default AlgorithmPage;
