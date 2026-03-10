import { Link } from "react-router-dom";

const PageComponents = ({ pageData }: { pageData: any }) => {
  return (
    <div className="rounded-md shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] p-4 min-h-[calc(100vh-11rem)]">
      <div className="grid grid-cols-3 gap-4">
        {pageData &&
          pageData.length > 0 &&
          pageData.map((route: any) => (
            <Link
              key={route.name}
              to={route.href}
              className={`flex justify-center flex-col gap-y-1 bg-gray-100 p-4 text-sm font-medium rounded-sm transition-all duration-200 text-gray-700 hover:bg-primary/20 hover:text-primary shadow-[0px_0px_10px_rgba(0,0,0,0.20)]`}
            >
              <div className="flex items-center">
                {route?.icon && (
                  <route.icon className={`mr-3 h-5 w-5 text-primary`} />
                )}
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

export default PageComponents;
