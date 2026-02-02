import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Paginations = () => {
  const [photos, setPhotos] = useState([]);
  const [limit] = useState(100);
  const [page, setPage] = useState(1);
  const [totalPage] = useState(5000 / limit);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoadingData(true);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`,
        );
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchPhotos();
  }, [page, limit]);

  return (
    <div className="space-y-2">
      {!loadingData ? (
        <div className="h-[calc(100vh-14.5rem)] overflow-auto space-y-4">
          {photos.length > 0 &&
            photos.map((photo: any) => (
              <div
                key={photo.id}
                className="flex items-center gap-6 p-4 border border-gray-100 rounded-sm"
              >
                <img
                  className="w-16 h-16 rounded-sm"
                  src={"https://dummyimage.com/150x150/92c952/ffffff"}
                />
                <h3 className="text-sm text-gray-500">{photo.title}</h3>
              </div>
            ))}
        </div>
      ) : (
        <div className="h-[calc(100vh-14.5rem)] flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      )}

      <div className="flex items-center justify-center gap-x-6">
        <Button
          className="h-8 rounded disabled:bg-primary/90"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <span>
          {page}/{totalPage}
        </span>
        <Button
          className="h-8 rounded disabled:bg-primary/90"
          disabled={page === totalPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Paginations;
