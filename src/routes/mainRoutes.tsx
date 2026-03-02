import { FolderGit, Home, Package, Webhook } from "lucide-react";

export const mainRoutes = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    children: [],
  },
  {
    name: "UI-Problems",
    icon: Package,
    href: "/ui-problems",
    children: [],
  },
  {
    name: "Hooks",
    icon: Webhook,
    href: "/react-hooks",
    children: [],
  },
  {
    name: "Git",
    icon: FolderGit,
    href: "/git",
    children: [],
  },
];
