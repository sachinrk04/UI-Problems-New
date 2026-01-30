import CodeBlock from "@/components/CodeBlock";
import PageHeader from "@/components/PageHeader";
import {
  starRatingJSCode,
  starRatingTSCode,
} from "@/components/StarRatingComponents/StarRatingCode";
import StarRatingOne from "@/components/StarRatingComponents/StarRatingOne";

const StarRating = () => {
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_20px_rgba(0,0,0,0.10)]">
        <PageHeader
          title="Star Rating"
          description="Star Rating usually refers to a UI pattern/component that lets users view or give ratings using stars"
        />
      </div>

      <div className="flex gap-4">
        <div className="h-[calc(100vh-11rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col">
          <div className="px-4 py-2">
            <StarRatingOne limit={5} rated={2} />
          </div>
          <div className="h-[calc(100vh-15rem)] overflow-auto px-4">
            <div className="flex flex-col">
              <h3 className="px-1 py-2 text-base font-semibold text-gray-700">
                JavaScript
              </h3>
              <CodeBlock code={starRatingJSCode} />
            </div>
            <div className="flex flex-col">
              <h3 className="px-1 py-2 text-base font-semibold text-gray-700">
                TypeScript
              </h3>
              <CodeBlock code={starRatingTSCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
