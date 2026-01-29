import GitPageDetails from "@/components/GitPageComponents/GitPageDetails";
import gitData from "@/data/gitData.json"

const StagingAndCommitting = () => {
  const stagingCommittingGitData = gitData["STAGING_AND_COMMITTING"] || [];
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <GitPageDetails
        title="Staging And Committing"
        description="Staging and Committing (Managing changes)"
        dataLists={stagingCommittingGitData}
      />
    </div>
  );
}

export default StagingAndCommitting;
