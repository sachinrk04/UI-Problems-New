import { useState } from "react";
import {
  File,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit2,
  FilePlusIcon,
  FolderPlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

const FolderFileExplorerTwo = () => {
  const [structure, setStructure] = useState<{
    appName: string;
    children: FileNode[];
  }>({
    appName: "app",
    children: [
      {
        id: "0",
        name: "public",
        type: "folder",
        children: [
          { id: "1", name: "index.html", type: "file" },
          { id: "2", name: "favicon.ico", type: "file" },
        ],
      },
      {
        id: "1",
        name: "src",
        type: "folder",
        children: [
          { id: "2", name: "index.ts", type: "file" },
          {
            id: "3",
            name: "components",
            type: "folder",
            children: [
              { id: "4", name: "Button.tsx", type: "file" },
              { id: "5", name: "Input.tsx", type: "file" },
            ],
          },
        ],
      },
    ],
  });

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["1"])
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFolders(newExpanded);
  };

  const addItem = (parentId: string | null, type: "file" | "folder") => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newNode: FileNode = {
      id: newId,
      name: `New ${type}`,
      type,
      ...(type === "folder" ? { children: [] } : {}),
    };
    setPlaceholder(`New ${type}`);

    if (!parentId) {
      setStructure({
        ...structure,
        children: [...structure.children, newNode],
      });
    } else {
      const updateChildren = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          }
          if (node.children) {
            return {
              ...node,
              children: updateChildren(node.children),
            };
          }
          return node;
        });
      };
      setStructure({
        ...structure,
        children: updateChildren(structure.children),
      });
    }
    setEditingId(newId);
  };

  const deleteItem = (id: string) => {
    const removeNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter((node) => {
        if (node.id === id) return false;
        if (node.children) {
          node.children = removeNode(node.children);
        }
        return true;
      });
    };
    setStructure({
      ...structure,
      children: removeNode(structure.children),
    });
  };

  const renderItem = (item: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(item.id);

    return (
      <div
        key={item.id}
        style={{ marginLeft: `${depth * 12}px` }}
        className="flex flex-col gap-y-1"
      >
        <div className="flex items-center px-1 py-0 rounded cursor-pointer group hover:bg-gray-100">
          {item.type === "folder" && (
            <button onClick={() => toggleFolder(item.id)} className="mr-1">
              {isExpanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          )}

          {item.type === "file" && (
            <File size={14} className="mr-1 text-gray-500" />
          )}

          {editingId === item.id ? (
            <input
              type="text"
              placeholder={placeholder}
              value={newItemName || item.name}
              onChange={(e) => setNewItemName(e.target.value)}
              onBlur={() => {
                if (newItemName) {
                  const updateName = (nodes: FileNode[]): FileNode[] => {
                    return nodes.map((node) => {
                      if (node.id === item.id) {
                        return { ...node, name: newItemName };
                      }
                      if (node.children) {
                        return { ...node, children: updateName(node.children) };
                      }
                      return node;
                    });
                  };
                  setStructure({
                    ...structure,
                    children: updateName(structure.children),
                  });
                }
                setEditingId(null);
                setNewItemName("");
              }}
              autoFocus
              className="px-1 text-sm bg-white border rounded"
            />
          ) : (
            <span className="flex-1 text-sm">{item.name}</span>
          )}

          <div className="items-center hidden gap-1 group-hover:flex">
            {item.type === "folder" && (
              <>
                <span
                  className="p-1 cursor-pointer"
                  title="New File"
                  onClick={() => addItem(item.id, "file")}
                >
                  <FilePlusIcon size={12} />
                </span>
                <span
                  className="p-1 cursor-pointer"
                  title="New Folder"
                  onClick={() => addItem(item.id, "folder")}
                >
                  <FolderPlusIcon size={12} />
                </span>
              </>
            )}
            <span
              className="p-1 cursor-pointer"
              onClick={() => {
                setEditingId(item.id);
                setNewItemName(item.name);
              }}
              title="Edit"
            >
              <Edit2 size={12} />
            </span>
            <span
              className="p-1 cursor-pointer"
              onClick={() => deleteItem(item.id)}
              title="Delete"
            >
              <Trash2 size={12} />
            </span>
          </div>
        </div>

        {item.type === "folder" && isExpanded && item.children && (
          <div className="flex flex-col gap-y-1">
            {item.children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-full border border-gray-200"
      >
        <ResizablePanel
          defaultSize={25}
          className="min-w-[200px] overflow-auto"
        >
          <div className="flex flex-col h-full p-4 bg-gray-50">
            <div className="flex items-center justify-between h-3 mb-2">
              <h1 className="text-sm font-medium uppercase">
                {structure.appName}
              </h1>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1"
                  onClick={() => addItem(null, "file")}
                  title="New File..."
                >
                  <FilePlusIcon size={12} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1"
                  onClick={() => addItem(null, "folder")}
                  title="New Folder..."
                >
                  <FolderPlusIcon size={12} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col overflow-auto gap-y-1">
              {structure.children.map((item) => renderItem(item))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="h-full bg-gray-200" />
        <ResizablePanel defaultSize={75} className="overflow-auto">
          <div className="w-full h-full p-4 overflow-auto bg-white">
            <pre className="text-sm">
              <code className="font-mono">
                {JSON.stringify(structure, null, 2)}
              </code>
            </pre>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default FolderFileExplorerTwo;
