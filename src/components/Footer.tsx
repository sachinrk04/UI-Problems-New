import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="transition-all duration-300 bg-white border-t hover:shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4 space-x-2 group">
                <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
                  <span className="text-sm font-bold text-white">RC</span>
                </div>
                <span className="text-lg font-semibold transition-colors duration-200 group-hover:text-blue-600">
                  React Components
                </span>
              </div>
              <p className="max-w-md mb-4 text-gray-600 transition-colors duration-200">
                A comprehensive collection of reusable React components built
                with modern design principles and accessibility in mind.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "#", label: "Email" },
                ].map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="sm"
                    className="p-0 transition-all duration-200 h-9 w-9 hover:scale-110 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 transition-colors duration-200">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  "Getting Started",
                  "Components",
                  "Documentation",
                  "Examples",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-block text-gray-600 transition-all duration-200 transform hover:text-blue-600 hover:translate-x-1"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 transition-colors duration-200">
                Support
              </h3>
              <ul className="space-y-2">
                {["Help Center", "Community", "Contact Us", "Bug Report"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-block text-gray-600 transition-all duration-200 transform hover:text-blue-600 hover:translate-x-1"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="transition-all duration-300" />

        <div className="flex flex-col items-center justify-between py-6 sm:flex-row">
          <p className="text-sm text-gray-600 transition-colors duration-200">
            © 2024 React Components. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 sm:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-gray-600 transition-all duration-200 transform hover:text-blue-600 hover:scale-105"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
