import PageHeader from "../PageHeader";
import PageComponents from "../PageComponents";

const ReactHooksComponent = ({hooksComponents}: any) => {
  return (
     <div className="p-4 overflow-auto min-h-[calc(100vh-4rem)] flex flex-col gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader
          title="React Hooks"
          description="React built in and custom hooks"
        />
      </div>
      <PageComponents pageData={hooksComponents} />
    </div>
  );
}

export default ReactHooksComponent;
