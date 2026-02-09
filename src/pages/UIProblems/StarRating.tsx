import CodeBlock from "@/components/CodeBlock";
import PageHeader from "@/components/PageHeader";
import HalfStar from "@/components/StarRatingComponents/HalfStar";
import { halfStarRatingCode } from "@/components/StarRatingComponents/halfStarRatingCode";
import { starRatingCode } from "@/components/StarRatingComponents/StarRatingCode";
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
          <div className="flex">
            <div className="p-4 w-1/2">
              <div className="h-full space-y-3">
                <h3 className="font-semibold text-lg text-gray-700 ">
                  Full Star Supported
                </h3>
                <div className="flex justify-center h-[96%]">
                  <StarRatingOne limit={5} rated={2} />
                </div>
              </div>
            </div>
            <div className="p-4 w-1/2">
              <CodeBlock code={starRatingCode} />
            </div>
          </div>
          <div className="w-full border" />
          <div className="flex">
            <div className="p-4 w-1/2">
              <div className="h-full space-y-3">
                <h3 className="font-semibold text-lg text-gray-700 ">
                  Half-Star Supported
                </h3>
                <div className="flex justify-center h-[96%]">
                  <HalfStar limit={5} rated={2.5} />
                </div>
              </div>
            </div>
            <div className="p-4 w-1/2">
              <CodeBlock code={halfStarRatingCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
