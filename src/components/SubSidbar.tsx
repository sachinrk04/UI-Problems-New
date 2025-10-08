import { Link, useLocation } from "react-router-dom";

interface SubSidbarRoute {
  name: string;
  href: string;
  description?: string;
  icon: React.ElementType;
}

const SubSidbar = ({
  subSidbarRoutes,
  title,
}: {
  subSidbarRoutes: SubSidbarRoute[];
  title?: string;
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 min-h-[calc(100vh-4rem)] h-full border-r bg-gray-50">
      {title && title.length > 0 && (
        <div className="px-2 py-2 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 text-md">{title}</h2>
        </div>
      )}

      <nav className="flex-1 px-2 py-2 space-y-1">
        {subSidbarRoutes &&
          subSidbarRoutes.length > 0 &&
          subSidbarRoutes.map((route, index) => {
            const isLast = index === subSidbarRoutes.length - 1;
            const isActive =
              location.pathname.split("/")[2] === route.href.split("/")[1] ||
              location.pathname === route.href;
            return (
              <Link
                key={route.name}
                to={route.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                } ${isLast ? "mb-2" : ""} ${isActive ? "bg-blue-100" : ""}`}
              >
                <route.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                />
                <div>
                  <div className="font-medium">{route?.name}</div>
                  {route?.description && (
                    <div
                      className={`text-xs ${
                        isActive ? "text-primary/70" : "text-gray-400"
                      }`}
                    >
                      {route?.description}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
      </nav>
    </div>
  );
};

export default SubSidbar;
