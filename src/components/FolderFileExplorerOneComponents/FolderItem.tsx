import { useState } from "react";
import { ChevronDown, ChevronRight, FileIcon } from "lucide-react";

const FolderItem = ({ items, depth = 0 }: { items: any; depth?: number }) => {
  const [open, setOpen] = useState(false);

  if (items.type === "file") {
    return (
      <div className={`flex items-center gap-1 ${depth > 0 && "pl-4"} cursor-pointer`}>
        <FileIcon size={14} className="text-gray-500" />
        <span className="text-sm text-gray-500">{items.name}</span>
      </div>
    );
  }
  
  return (
    <div style={{ paddingLeft: `${depth * 14}px` }}>
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? (
          <ChevronDown size={14} className="text-gray-500" />
        ) : (
          <ChevronRight size={14} className="text-gray-500" />
        )}
        <span className="text-sm text-gray-500">{items.name}</span>
      </div>
      {open &&
        items?.children?.map((child: any) => (
          <FolderItem key={child.id} items={child} depth={depth + 1} />
        ))}
    </div>
  );
};

export default FolderItem;
