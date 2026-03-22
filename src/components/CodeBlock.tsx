import { useState } from "react";
import CopyCode from "./CopyCode";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import ComingSoon from "./ComingSoon";

const CodeBlock = ({
  code,
  height = "h-full",
}: {
  code: any;
  height?: string;
}) => {
  const [language, setLanguage] = useState<any>("JAVASCRIPT");

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 rounded-t">
        <div className="bg-primary/50 px-4 py-1.5 rounded-t flex justify-between">
          <Select
            defaultValue={language}
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full h-8 rounded-sm max-w-48">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="rounded-sm">
              <SelectGroup>
                <SelectItem value="JAVASCRIPT">JavaScript</SelectItem>
                <SelectItem value="TYPESCRIPT">TypeScript</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {code[language]?.length > 0 && <CopyCode code={code[language]} />}
        </div>
      </div>
      <pre
        className={`${height} p-4 overflow-auto text-xs font-medium text-gray-700 rounded pt-9 bg-primary/10`}
      >
        {code[language]?.length > 0 ? (
          <code>{code[language]}</code>
        ) : (
          <ComingSoon />
        )}
      </pre>
    </div>
  );
};

export default CodeBlock;
