import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-200"
      }`}
    >
      <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div
            className={`h-8 w-8 rounded-lg bg-gradient-to-br from-primary/50 to-primary/90 flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(0,0,0,0.10)] ${
              isScrolled ? "shadow-lg" : ""
            }`}
          >
            <span className="text-sm font-bold text-white">RC</span>
          </div>
          <span
            className={`font-semibold text-lg hidden sm:inline-block transition-all duration-300 ${
              isScrolled ? "text-primary/70" : "text-primary"
            }`}
          >
            Frontend
          </span>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Right side actions */}
        <div className="flex items-center ml-auto space-x-4">
          <Avatar
            className={`h-8 w-8 transition-all duration-200 hover:scale-110 cursor-pointer ${
              isScrolled ? "ring-2 ring-gray-200" : ""
            }`}
          >
            <AvatarImage src="/avatars/01.png" alt="User" />
            <AvatarFallback className="font-semibold text-white bg-gradient-to-br from-primary/50 to-primary/90 ">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
