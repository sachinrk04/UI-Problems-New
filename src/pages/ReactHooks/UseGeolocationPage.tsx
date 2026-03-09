import PageHeader from "@/components/PageHeader";
import { useGeolocation } from "@/components/ReactHooksComponents/useGeolocation";

const UseGeolocationPage = () => {
  const { latitude, longitude, error, loading } = useGeolocation();

  return (
    <div className="flex flex-col p-4 overflow-auto gap-y-4">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader title="useGeolocation" />
      </div>
      <div className="h-[calc(100vh-9.75rem)] overflow-auto shadow-[inset_0_0px_10px_rgba(0,0,0,0.10)] rounded-md w-full flex flex-col p-4">
        {loading ? (
          <div className="flex justify-center h-full pt-10">
            <p>Getting location...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center h-full pt-10">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold text-primary">
              Your Location
            </h2>
            <p className="font-semibold">
              Latitude:{" "}
              <span className="text-sm font-normal text-primary">
                {latitude}
              </span>
            </p>
            <p className="font-semibold">
              Longitude:{" "}
              <span className="text-sm font-normal text-primary ">
                {longitude}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UseGeolocationPage;
