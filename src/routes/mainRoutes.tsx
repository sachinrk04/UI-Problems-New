import { Compass, FolderGit, Home, Package, Webhook } from "lucide-react";

export const mainRoutes = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    children: [],
  },
  {
    name: "UI-Problems",
    href: "/ui-problems",
    icon: Package,
    children: [],
  },
  {
    name: "Hooks",
    href: "/react-hooks",
    icon: Webhook,
    children: [],
  },
  {
    name: "Algorithms",
    href: "/algorithms",
    icon: Compass,
    children: [],
  },
  {
    name: "Git",
    href: "/git",
    icon: FolderGit,
    children: [],
  },
];
