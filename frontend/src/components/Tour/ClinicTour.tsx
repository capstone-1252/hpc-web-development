import { useState, useEffect } from "react";
import { PhotoGallery } from "@/components/PhotoGallery";
import { loadTour, type TourPhotos } from "@/loaders/loadTour";

export const ClinicTour = () => {
  const [photos, setPhotos] = useState<TourPhotos["photos"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadTour();
        setPhotos(data?.photos ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-10 bg-muted-blue/20">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-3xl lg:text-3xl font-normal text-dark-blue mb-8"
            style={{ fontFamily: "'Ubuntu', sans-serif" }}
          >
            Clinic Tour
          </h2>
          <div className="h-[400px] bg-muted rounded-xl animate-pulse" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-10 bg-muted-blue/20">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-3xl lg:text-3xl font-normal text-dark-blue mb-8"
            style={{ fontFamily: "'Ubuntu', sans-serif" }}
          >
            Clinic Tour
          </h2>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-10 bg-muted-blue/20">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl sm:text-3xl lg:text-3xl font-normal text-dark-blue mb-8"
          style={{ fontFamily: "'Ubuntu', sans-serif" }}
        >
          Clinic Tour
        </h2>
        {photos?.length ? (
          <PhotoGallery
            images={photos}
            altPrefix="Clinic photo"
            displayOrder
            showDescription
          />
        ) : (
          <p className="text-muted-foreground">No photos available.</p>
        )}
      </div>
    </section>
  );
};
