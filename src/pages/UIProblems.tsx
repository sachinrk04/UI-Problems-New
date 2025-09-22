import { Outlet, useLocation } from "react-router-dom";
import UIProblemsComponents from "@/components/UIProblemsComponents";

const UIProblems = () => {
  const location = useLocation();
  const isParentPath = location.pathname === "/ui-problems";

  return <>{isParentPath ? <UIProblemsComponents /> : <Outlet />}</>;
};

export default UIProblems;
