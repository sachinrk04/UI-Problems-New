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

const CodeBlock = ({ code }: { code: any }) => {
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
            <SelectTrigger className="w-full h-8 rounded max-w-48">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="rounded">
              <SelectGroup>
                <SelectItem value="JAVASCRIPT">JavaScript</SelectItem>
                <SelectItem value="TYPESCRIPT">TypeScript</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {code[language]?.length > 0 && <CopyCode code={code[language]} />}
        </div>
      </div>
      <pre className="p-4 overflow-auto text-xs font-medium text-gray-700 rounded pt-9 bg-primary/5">
        {code[language]?.length > 0 ? (
          <code>{code[language]}</code>
        ) : (
          <div className="mt-10 text-center h-52">Comming soon!</div>
        )}
      </pre>
    </div>
  );
};

export default CodeBlock;
