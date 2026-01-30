import CopyCode from "./CopyCode";

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3">
        <CopyCode code={code} />
      </div>
      <pre className="bg-primary/5 text-gray-700 font-medium text-sm rounded overflow-auto p-4">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
