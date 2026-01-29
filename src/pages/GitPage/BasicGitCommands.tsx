import GitPageDetails from "@/components/GitPageComponents/GitPageDetails";
import gitData from "@/data/gitData.json";

const BasicGitCommands = () => {
  const basicGitData = gitData["BASIC_GIT"] || [];
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <GitPageDetails
        title="Basic Git Commands"
        description="Basic Git Commands (For managing repositories)"
        dataLists={basicGitData}
      />
    </div>
  );
};

export default BasicGitCommands;
