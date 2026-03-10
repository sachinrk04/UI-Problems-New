import PageHeader from "../PageHeader";
import PageComponents from "../PageComponents";

const GitPageComponents = ({gitComponents}: any) => {
  return (
    <div className="p-4 overflow-auto min-h-[calc(100vh-4rem)] flex flex-col gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader
          title="Git Commands"
          description="Git Commands && Git for DevOps"
        />
      </div>
      <PageComponents pageData={gitComponents} />
    </div>
  );
};

export default GitPageComponents;
