import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface SubSidbarRoute {
  name: string;
  href: string;
  sideDescription?: string;
  icon?: React.ElementType;
}

const SubSidbar = ({
  subSidbarRoutes,
  title,
}: {
  subSidbarRoutes: SubSidbarRoute[];
  title?: string;
}) => {
  const location = useLocation();
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth", // change to "auto" if you don't want animation
        block: "center",
      });
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-72 min-h-[calc(100vh-4rem)] h-full border-l bg-gray-50">
      {title && title.length > 0 && (
        <div className="p-3 border-b border-gray-200 shadow-sm">
          <h2 className="font-semibold text-gray-700 text-md">{title}</h2>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-3 overflow-auto">
        {subSidbarRoutes &&
          subSidbarRoutes.length > 0 &&
          subSidbarRoutes.map((route, index) => {
            const isLast = index === subSidbarRoutes.length - 1;
            const isActive =
              location.pathname.split("/")[2] === route.href.split("/")[1] ||
              location.pathname === route.href;

            return (
              <NavLink
                key={route.name}
                to={route.href}
                ref={isActive ? activeRef : null}
                className={`flex flex-col gap-y-1 px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.10)] ${
                    isActive
                      ? "bg-primary/30 text-primary"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-700"
                  } ${isLast ? "mb-2" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center">
                      {route.icon && (
                        <route.icon
                          className={`mr-2 h-5 w-5 ${
                            isActive ? "text-primary" : "text-gray-400"
                          }`}
                        />
                      )}
                      <div className="font-medium">{route?.name}</div>
                    </div>

                    {route.sideDescription && (
                      <div
                        className={`text-xs ${
                          isActive ? "text-primary/70" : "text-gray-400"
                        }`}
                      >
                        {route.sideDescription}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
};

export default SubSidbar;
