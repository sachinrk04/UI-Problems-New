import GitCommandsAndDetails from "@/components/GitPageComponents/GitCommandsAndDetails";
import PageHeader from "@/components/PageHeader";
import gitData from "@/data/gitData.json";

const BranchingCommands = () => {
  const basicGitData = gitData["BRANCHING_GIT"] || [];
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <PageHeader
        title="Branching"
        description="Branching Commands (Managing branches)"
      />

      <div className="h-[calc(100vh-10.5rem)] p-4 overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md">
        {basicGitData && basicGitData.length > 0 && (
          <GitCommandsAndDetails dataLists={basicGitData} />
        )}
      </div>
    </div>
  );
}

export default BranchingCommands;
