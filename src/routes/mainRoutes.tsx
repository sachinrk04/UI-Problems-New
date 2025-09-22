import { Home, Package } from "lucide-react";

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
    children: [
      {
        name: "Quiz App",
        href: "/ui-problems/mc-quiz-app",
        icon: Home,
        children: [],
      },
    ],
  },
];
