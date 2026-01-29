import {
  GitBranch,
  GitPullRequestDraft,
  LucideGitFork,
} from "lucide-react";

export const gitPageRoutes = [
  {
    name: "Get Started",
    href: "/git",
    icon: LucideGitFork,
    sideDescription: "",
    pageDescription: "",
  },
  {
    name: "Basic Git",
    href: "/git/basic-git-commands",
    icon: GitPullRequestDraft,
    sideDescription: "Basic Git Commands (For managing repositories)",
    pageDescription: "",
  },
  {
    name: "Branching",
    href: "/git/branching-git-commands",
    icon: GitBranch,
    sideDescription: "Branching Commands (Managing branches)",
    pageDescription: "",
  },
  {
    name: "Remote",
    href: "/git/remote-git-commands",
    icon: GitBranch,
    sideDescription: "Remote Commands (Managing remotes and syncing with the cloud)",
    pageDescription: "",
  },
  {
    name: "Staging And Committing",
    href: "/git/staging-and-committing",
    icon: GitBranch,
    sideDescription: "Staging and Committing (Managing changes)",
    pageDescription: "",
  },
];
