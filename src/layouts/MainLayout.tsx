import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
export function MainLayout() {
  return (
    <div className="min-h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Header />
      <Sidebar />
      <div className="pt-16 pl-12 transition-all duration-300">
        <main className="min-h-[calc(100vh-4rem)] bg-white">
          <div className="duration-500 animate-in slide-in-from-bottom-2">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
