import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import HighLightText from "@/components/HighLightText";
import { useCounterII } from "@/components/ReactHooksComponents/useCounterII";

const UseCounterII = () => {
  const [count, increment, decrement, reset, setValue] = useCounterII(2);
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="useCounter" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
        <div className="space-y-8">
          <div className="text-sm text-gray-700 space-y-4">
            <p>
              <HighLightText>useCounter</HighLightText> is a reusable React
              custom hook used to manage a numeric counter state. It provides
              helper functions to increment, decrement, reset, and set the
              counter value.
            </p>
            <p>
              This hook simplifies counter-related logic and makes it reusable
              across components.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex gap-4 justify-center items-center">
              <Button
                className="rounded-sm h-8"
                size={"sm"}
                onClick={() => decrement(2)}
              >
                <Minus />
              </Button>
              <span className="border w-20 h-8 rounded-sm flex justify-center items-center text-gray-700">
                {count}
              </span>
              <Button
                className="rounded-sm h-8"
                size={"sm"}
                onClick={() => increment(2)}
              >
                <Plus />
              </Button>
            </div>
            <div className="space-x-4">
              <Button
                variant={"destructive"}
                className="rounded-sm h-8"
                size={"sm"}
                onClick={reset}
              >
                Reset
              </Button>
              <Button
                className="rounded-sm h-8"
                size={"sm"}
                onClick={() => setValue(5)}
              >
                Set Value
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCounterII;
