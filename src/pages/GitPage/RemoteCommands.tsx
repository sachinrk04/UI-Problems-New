import GitPageDetails from "@/components/GitPageComponents/GitPageDetails";
import gitData from "@/data/gitData.json";

const RemoteCommands = () => {
  const remoteGitData = gitData["REMOTE_GIT"] || [];
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <GitPageDetails
        title="Remote Commands"
        description="Remote Commands (Managing remotes and syncing with the cloud)"
        dataLists={remoteGitData}
      />
    </div>
  );
};

export default RemoteCommands;
