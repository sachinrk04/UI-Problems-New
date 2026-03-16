import { Footer } from "@/components/Footer";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col p-4 overflow-auto gap-y-4">
        <div className="shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] min-h-[calc(100vh-6rem)] rounded-md">
          <iframe 
            src="https://redux-toolkit.js.org"
            className="w-full h-[calc(100vh-6rem)] rounded-md"
            title="Example Website">
          </iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
