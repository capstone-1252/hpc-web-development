import { loadServiceInfo, type Service } from "@/loaders/loadServices";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../Skeleton/CardSkeleton";

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative bg-(--muted-blue) p-4 rounded-md cursor-default min-w-[200px] hover:scale-105 hover:shadow-lg transition-all duration-200">
      <h3 className="text-lg font-bold text-(--dark-blue) text-center">
        {service.name}
      </h3>
      {service.description && (
        <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-(--dark-blue) text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap">
          {service.description}
        </div>
      )}
    </div>
  );
}

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadServiceInfo();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
        <CardSkeleton
          lines={1}
          className="bg-(--muted-blue) p-4 rounded-md min-w-[200px] w-[200px]"
        />
      </div>
    );
  }

  if (services.length === 0) {
    return <p>No services available.</p>;
  }

  const hasDescriptions = services.some((s) => s.description);

  return (
    <div className="flex flex-col gap-6 items-center">
      {hasDescriptions && (
        <p className="text-sm text-gray-500 italic">
          Hover over a service for more details
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}
