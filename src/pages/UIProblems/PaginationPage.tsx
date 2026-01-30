import PageHeader from "@/components/PageHeader";
import Paginations from "@/components/PaginationComponents/Paginations";

const PaginationPage = () => {
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="Pagination" />
      </div>

      <div className="flex gap-4">
        <div className="h-[calc(100vh-10rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
          <Paginations />
        </div>
      </div>
    </div>
  );
};

export default PaginationPage;
