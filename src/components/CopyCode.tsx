import { Copy } from "lucide-react";
import { toast } from "sonner";

const CopyCode = ({ code }: { code: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copy Successfully");
  };

  return (
    <button
      onClick={() => handleCopy()}
      className="bg-white text-primary p-1 rounded hover:bg-primary/20 hover:text-white hover:border hover:border-white"
    >
      <Copy className="w-5 h-5" />
    </button>
  );
};

export default CopyCode;
