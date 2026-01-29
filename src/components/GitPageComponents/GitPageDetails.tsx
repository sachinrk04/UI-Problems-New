import PageHeader from "../PageHeader";
import GitCommandsAndDetails from "./GitCommandsAndDetails";

interface GitPageDetailsProps {
  title: string;
  description?: string;
  dataLists: any;
}

const GitPageDetails = ({
  title,
  description,
  dataLists,
}: GitPageDetailsProps) => {
  return (
    <>
      <PageHeader title={title} description={description} />

      <div className="flex gap-x-4">
        <div className="h-[calc(100vh-10.5rem)] p-4 overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full">
          {dataLists && dataLists.length > 0 && (
            <GitCommandsAndDetails dataLists={dataLists} />
          )}
        </div>
        <div className="h-[calc(100vh-10.5rem)] p-4 overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full"></div>
      </div>
    </>
  );
};

export default GitPageDetails;
