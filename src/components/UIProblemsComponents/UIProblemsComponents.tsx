import { Link } from "react-router-dom";
import PageHeader from "../PageHeader";

const UIProblemsComponents = ({ uiComponents }: any) => {
  return (
    <div className="p-4 overflow-auto min-h-[calc(100vh-4rem)] flex flex-col gap-y-4">
      <PageHeader
        title="UI Problems"
        description="UI Problems are a collection of problems that we have encountered in the past and how we have solved them."
      />
      <div className="grid grid-cols-3 gap-4 rounded-md shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] p-4">
        {uiComponents &&
          uiComponents.length > 0 &&
          uiComponents.map((route: any) => (
            <Link
              key={route.name}
              to={route.href}
              className={`flex justify-center flex-col gap-y-1 bg-gray-100 p-4 text-sm font-medium rounded-sm transition-all duration-200 text-gray-700 hover:bg-primary/20 hover:text-primary`}
            >
              <div className="flex items-center">
                <route.icon className={`mr-3 h-5 w-5 text-primary`} />
                <div className="font-medium">{route?.name}</div>
              </div>
              {route?.pageDescription && (
                <div className={`text-xs text-gray-400`}>
                  {route?.pageDescription}
                </div>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UIProblemsComponents;
