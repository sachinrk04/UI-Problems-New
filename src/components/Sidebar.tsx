import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { mainRoutes } from "@/routes/mainRoutes";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [openChildren, setOpenChildren] = useState<Record<string, boolean>>({});

  const isParentActivePath = location.pathname.split("/")[1] || "";

  const toggleRouteMenu = (lebelName: string) => {
    setOpenChildren((prev: Record<string, boolean>) => ({
      ...prev,
      [lebelName]: !prev[lebelName],
    }));
  };

  const renderRoutes = (routes: typeof mainRoutes, isChild = false) => {
    return routes.map((route, index) => {
      const isActive =
        isParentActivePath === route.href.split("/")[1] ||
        location.pathname === route.href;

      const isOpen = isHovered ? openChildren[route.name] : isActive;
      return (
        <div key={route.name} className={cn(isChild ? "pl-2" : "")}>
          <div
            className="cursor-pointer"
            onClick={() =>
              route.children &&
              route.children.length > 0 &&
              toggleRouteMenu(route.name)
            }
          >
            <div
              className={cn(
                " mb-1",
                !isHovered && isActive && isChild && "hidden"
              )}
            >
              <Link
                key={route.name}
                to={route.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-all duration-200 transform shadow-[0_2px_10px_rgba(0,0,0,0.10)] ${
                  isActive
                    ? "bg-primary/20 text-primary shadow-sm"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                } ${!isHovered ? "justify-center" : ""}`}
                style={{ animationDelay: `${index * 50}ms` }}
                title={!isHovered ? route.name : undefined}
              >
                <route.icon
                  className={`flex-shrink-0 transition-all duration-200 ${
                    isHovered ? "mr-3 h-4 w-4" : "mx-auto h-4 w-4"
                  } ${
                    isActive
                      ? "text-primary scale-110"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                <div className="flex items-center justify-between w-full">
                  {isHovered && (
                    <span className="text-sm transition-all duration-200">
                      {route.name}
                    </span>
                  )}

                  {route.children && route.children.length > 0 && isHovered && (
                    <span className="mr-2">
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
          {route.children && route.children.length > 0 && isOpen && (
            <div
              className={cn(
                "border-l-2 border-gray-300 ml-4",
                isActive && "border-primary"
              )}
            >
              {renderRoutes(route.children, true)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      data-sidebar
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] flex flex-col bg-gray-50 border-r transition-all duration-300 hover:shadow-lg z-40 transform ${
        isHovered ? "w-64" : "w-12"
      } `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Navigation */}
      <div className="flex-1 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <nav className="px-2 space-y-3">{renderRoutes(mainRoutes)}</nav>
      </div>

      {/* Sidebar Footer */}
      <div className="px-2 py-2 border-t bg-white/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 transition-all duration-200 cursor-pointer group hover:scale-105">
          <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-gradient-to-br from-green-400 to-blue-500 group-hover:shadow-lg group-hover:rotate-3">
            <span className="text-xs font-bold text-white">RC</span>
          </div>
          {isHovered && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate transition-colors duration-200">
                React Components
              </p>
              <p className="text-xs text-gray-500 truncate transition-colors duration-200">
                v1.0.0
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
