import { loadHomeGallery, type HomeGallery } from "@/loaders/loadHomeGallery";
import { useEffect, useState } from "react";
import { PhotoGallery } from "./PhotoGallery";

export const HomeGallerySection = () => {
  const [gallery, setGallery] = useState<HomeGallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadHomeGallery();
      setGallery(data || []);
      setLoading(false);
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
            Photo Gallery
          </h2>
          <div className="h-[400px] bg-muted rounded-xl animate-pulse" />
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
          Photo Gallery
        </h2>
        <PhotoGallery
          images={gallery || []}
          altPrefix="Home Gallery | "
          width={1200}
          height={1200}
          showDescription
        />
      </div>
    </section>
  );
};
