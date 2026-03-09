import PageHeader from "@/components/PageHeader";
import { useFetch } from "@/components/ReactHooksComponents/useFetch";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const UseFetchPage = () => {
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  const renderItem = () => {
    if (loading) {
      return (
        <div className="flex justify-center">
          <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("size-4 animate-spin")}
          />
        </div>
      );
    }
  };


  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="useFetch" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
        {renderItem()}
        <pre className="p-4 overflow-auto text-xs font-medium text-gray-700 rounded pt-9 bg-primary/5">
            {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default UseFetchPage;
