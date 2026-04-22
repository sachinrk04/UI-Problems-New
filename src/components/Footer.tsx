import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const sections = [
  { name: "UI Problems", href: "/ui-problems" },
  { name: "React Hooks", href: "/react-hooks" },
  { name: "Algorithms", href: "/algorithms" },
  { name: "Git", href: "/git" },
];

const techStack = ["React", "TypeScript", "Tailwind CSS", "React Router", "Redux Toolkit", "Vite"];

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="p-4 transition-all duration-300 bg-white border-t">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 rounded-md shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] bg-primary/5">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4 space-x-2 group">
                <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-lg bg-gradient-to-br from-primary/40 to-primary/80 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
                  <span className="text-sm font-bold text-white">RC</span>
                </div>
                <span className="text-lg font-semibold transition-colors duration-200 group-hover:text-primary/60">
                  React Components
                </span>
              </div>
              <p className="max-w-md mb-4 text-sm text-gray-600">
                A hands-on practice space for UI challenges, custom hooks,
                algorithm visualizations, and Git references — built to sharpen
                React skills through doing.
              </p>
              <div className="flex space-x-4">
                {socials.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="sm"
                    className="p-0 transition-all duration-200 h-9 w-9 hover:scale-110 hover:bg-primary/10 hover:border-primary/30 hover:text-primary/60"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Sections
              </h3>
              <ul className="space-y-2">
                {sections.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="inline-block text-sm text-gray-600 transition-all duration-200 hover:text-primary hover:translate-x-1"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Built With
              </h3>
              <ul className="space-y-2">
                {techStack.map((tech) => (
                  <li
                    key={tech}
                    className="text-sm text-gray-600"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} React Components. Built for learning.
          </p>
        </div>
      </div>
    </footer>
  );
}
