import PageHeader from "@/components/PageHeader";
import NestBox from "@/components/NestedBoxComponents/NestBox";
import CodeBlock from "@/components/CodeBlock";
import { NestedBoxCode } from "@/components/NestedBoxComponents/NestedBoxCode";

const NestedBox = () => {
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader
          title="Star Rating"
          description="Star Rating usually refers to a UI pattern/component that lets users view or give ratings using stars"
        />
      </div>

      <div className="flex gap-4">
        <div className="h-[calc(100vh-11rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
          <NestBox />
        </div>
        <div className="h-[calc(100vh-11rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex gap-4 flex-col p-4">
          <CodeBlock code={NestedBoxCode} />
        </div>
      </div>
    </div>
  );
};

export default NestedBox;
