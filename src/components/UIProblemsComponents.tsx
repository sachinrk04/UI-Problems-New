import { Link } from "react-router-dom";
import PageHeader from "./PageHeader";

const UIProblemsComponents = ({uiComponents}: any) => {
  console.log("uiComponents--->", uiComponents)
  return (
    <div className="p-4">
      <PageHeader
        title="UI Problems"
        description="UI Problems are a collection of problems that we have encountered in the past and how we have solved them."
      />
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-4 rounded-md">
          {uiComponents && uiComponents.length > 0 && uiComponents.map((route: any) => (
            <Link
                key={route.name}
                to={route.href}
                className={`flex bg-gray-100 items-center p-4 text-sm font-medium rounded-sm transition-all duration-200 text-gray-700 hover:bg-primary/20 hover:text-primary`}
              >
                <route.icon
                  className={`mr-3 h-5 w-5 text-primary`}
                />
                <div>
                  <div className="font-medium">{route?.name}</div>
                  {route?.description && (
                    <div
                      className={`text-xs text-gray-400`}
                    >
                      {route?.description}
                    </div>
                  )}
                </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UIProblemsComponents;
