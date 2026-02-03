import { loadServiceInfo, type ServiceInfo } from "@/loaders/loadServices";
import { useEffect, useState } from "react";

interface ServiceCardProps {
  service: ServiceInfo;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-[#e25002] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
        {service.icon ? (
          <img src={service.icon} alt="" className="w-6 h-6" />
        ) : (
          <svg className="w-6 h-6 text-[#e25002]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-bold text-[#485a61] mb-3">{service.title}</h3>
      <p className="text-[#485a61] opacity-80 text-sm mb-4">{service.description}</p>
      <a href="/services/apply" className="text-[#e25002] font-semibold hover:text-[#c44301] transition-colors text-sm inline-flex items-center">
        Learn more
        <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

export function ServicesList() {
  const [services, setServices] = useState<ServiceInfo[]>([]);
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
    return <p className="max-w-sm mx-auto">Loading services...</p>;
  }

  if (services.length === 0) {
    return <p>No services available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}