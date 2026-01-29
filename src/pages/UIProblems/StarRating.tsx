import PageHeader from "@/components/PageHeader";

const StarRating = () => {
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader
          title="Star Rating"
          description="Star Rating usually refers to a UI pattern/component that lets users view or give ratings using stars"
        />
      </div>

      <div className="flex gap-4">
        <div className="h-[calc(100vh-11rem)] p-4 overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full"></div>
        <div className="h-[calc(100vh-11rem)] p-4 overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full"></div>
      </div>
    </div>
  );
};

export default StarRating;
