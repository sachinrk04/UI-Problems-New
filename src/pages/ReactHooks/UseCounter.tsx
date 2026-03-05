import { Minus, Plus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useCounter } from "@/components/ReactHooksComponents/useCounter";
import HighLightText from "@/components/HighLightText";

const UseCounter = () => {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="useCounter" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
        <div className="space-y-8">
          <HighLightText>useCounter</HighLightText> is a reusable custom React
          <div className="text-sm text-gray-700">
            hook that manages a numeric counter state. It provides utility
            functions to increment, decrement, and reset the counter value. This
            hook simplifies counter logic and can be reused across multiple
            components.
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex gap-4 justify-center items-center">
              <Button
                className="rounded-sm h-8"
                size={"sm"}
                onClick={decrement}
              >
                <Minus />
              </Button>
              <span className="border w-20 h-8 rounded-sm flex justify-center items-center text-gray-700">
                {count}
              </span>
              <Button
                className="rounded-sm h-8"
                size={"sm"}
                onClick={increment}
              >
                <Plus />
              </Button>
            </div>
            <Button
              variant={"destructive"}
              className="rounded-sm h-8"
              size={"sm"}
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCounter;
