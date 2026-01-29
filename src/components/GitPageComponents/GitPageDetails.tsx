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
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title={title} description={description} />
      </div>

      <div className="flex gap-4">
        <div className="h-[calc(100vh-11rem)] p-4 overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full">
          {dataLists && dataLists.length > 0 && (
            <GitCommandsAndDetails dataLists={dataLists} />
          )}
        </div>
        <div className="h-[calc(100vh-11rem)] p-4 overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full">
          
        </div>
      </div>
    </>
  );
};

export default GitPageDetails;
