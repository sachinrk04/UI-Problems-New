import GitPageDetails from "@/components/GitPageComponents/GitPageDetails";
import gitData from "@/data/gitData.json";

const BranchingCommands = () => {
  const branchingGitData = gitData["BRANCHING_GIT"] || [];
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <GitPageDetails
        title="Branching"
        description="Branching Commands (Managing branches)"
        dataLists={branchingGitData}
      />
    </div>
  );
};

export default BranchingCommands;
