import FolderItem from "@/components/FolderFileExplorerOneComponents/FolderItem";

const structures = [
  {
    id: "public",
    name: "public",
    type: "folder",
    children: [
      { id: "public-index", name: "index.html", type: "file" },
      { id: "public-favicon", name: "favicon.ico", type: "file" },
    ],
  },
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "src-components",
        name: "components",
        type: "folder",
        children: [
          { id: "header", name: "Header.tsx", type: "file" },
          { id: "sidebar", name: "Sidebar.tsx", type: "file" },
        ],
      },
      { id: "app", name: "App.tsx", type: "file" },
    ],
  },
  {
    id: "package-json",
    name: "package.json",
    type: "file",
  },
];

const FolderFileExplorerOne = () => {
  return (
    <div className="h-full p-4">
      <div className="flex h-full bg-gray-100 border border-gray-200">
        <div className="p-2 border-r border-gray-200 min-w-[200px] overflow-auto">
          {structures.map((stucture) => (
            <FolderItem key={stucture.id} items={stucture} />
          ))}
        </div>
        <div className="w-full p-4 overflow-auto bg-white">
          <pre className="text-sm">
            <code className="font-mono">
              {JSON.stringify(structures, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FolderFileExplorerOne;
