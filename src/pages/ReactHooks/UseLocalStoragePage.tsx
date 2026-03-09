import PageHeader from "@/components/PageHeader";
import { useLocalStorage } from "@/components/ReactHooksComponents/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const UseLocalStoragePage = () => {
    const [count, setCount] = useLocalStorage("count", 0)
  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="useLocalStorage" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                className="h-8 rounded-sm"
                size={"sm"}
                onClick={() => setCount(count - 1)}
              >
                <Minus />
              </Button>
              <span className="flex items-center justify-center w-20 h-8 text-gray-700 border rounded-sm">
                {count}
              </span>
              <Button
                className="h-8 rounded-sm"
                size={"sm"}
                onClick={() => setCount(count + 1)}
              >
                <Plus />
              </Button>
            </div>            
        </div>
      </div>
    </div>
  );
}

export default UseLocalStoragePage;
