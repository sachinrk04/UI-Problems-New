import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import type { AppDispatch, RootState } from "@/store/store";
import { openCommonModal } from "@/store/actions";
import CodeBlock from "./CodeBlock";

const CodeViewModal = ({title = "Code", viewCode = ""} : any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { commonModal } = useSelector((state: RootState) => state.commonState);
  return (
    <Sheet open={commonModal} onOpenChange={() => dispatch(openCommonModal())}>
      <SheetContent
        className="!min-w-[550px] !max-w-[750px] p-0"
        aria-describedby={undefined}
        // onPointerDownOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="px-4 py-3 border-b-2 border-border-secondary">
          <SheetTitle className="font-bold tracking-wide text-md text-primary">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 max-h-[calc(100vh-4rem)] overflow-auto rounded-sm">
            <CodeBlock code={viewCode} height="max-h-[calc(100vh-5.5rem)]" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CodeViewModal;
