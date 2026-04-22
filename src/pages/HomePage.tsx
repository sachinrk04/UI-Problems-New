import { Link } from "react-router-dom";
import { Compass, FolderGit, Package, Webhook } from "lucide-react";
import { Footer } from "@/components/Footer";

const sections = [
  {
    name: "UI Problems",
    href: "/ui-problems",
    icon: Package,
    description:
      "Interactive UI challenges — autocomplete, drag & drop, virtualized lists, and more.",
    count: "37 problems",
  },
  {
    name: "React Hooks",
    href: "/react-hooks",
    icon: Webhook,
    description:
      "Custom hook implementations — useDebounce, useLocalStorage, useVirtualList, and more.",
    count: "9 hooks",
  },
  {
    name: "Algorithms",
    href: "/algorithms",
    icon: Compass,
    description:
      "Visual algorithm implementations with animations — sorting and more.",
    count: "2 algorithms",
  },
  {
    name: "Git",
    href: "/git",
    icon: FolderGit,
    description:
      "Git command references — branching, staging, remotes, and workflow guides.",
    count: "4 guides",
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex-1 p-4 space-y-4 min-h-[calc(100vh-5rem)]">
        {/* Hero */}
        <div className="rounded-md shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] bg-primary/5 p-4">
            
          <p className="max-w-xl text-sm text-gray-500">
            A hands-on collection of UI problems, custom hooks, algorithm
            visualizations, and Git guides — built to sharpen React skills
            through practice.
          </p>
        </div>

        {/* Section cards */}
        <div className="rounded-md shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] p-4">
          <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Explore
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections.map(({ name, href, icon: Icon, description, count }) => (
              <Link
                key={name}
                to={href}
                className="flex flex-col gap-y-2 bg-gray-100 p-5 rounded-sm shadow-[0px_0px_10px_rgba(0,0,0,0.20)] transition-all duration-200 hover:bg-primary/20 hover:text-primary group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{name}</span>
                  </div>
                  <span className="text-xs text-gray-400 transition-colors duration-200 group-hover:text-primary/70">
                    {count}
                  </span>
                </div>
                <p className="text-xs text-gray-400 transition-colors duration-200 group-hover:text-primary/70">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
