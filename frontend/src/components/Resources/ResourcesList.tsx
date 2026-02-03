import { loadResources, type Resource } from "@/loaders/loadResources";
import { useEffect, useState } from "react";

interface ResourceCardProps {
  resource: Resource;
}

function ResourceCard({ resource }: ResourceCardProps) {
  const getIcon = () => {
    if (resource.icon) {
      return <img src={resource.icon} alt="" className="w-6 h-6" />;
    }
    
    const icons = {
      guide: (
        <svg className="w-6 h-6 text-[#e25002]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      community: (
        <svg className="w-6 h-6 text-[#19b8d7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      form: (
        <svg className="w-6 h-6 text-[#fdb52b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      video: (
        <svg className="w-6 h-6 text-[#e25002]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    
    return icons[resource.category as keyof typeof icons] || icons.guide;
  };

  const getAction = () => {
    switch (resource.type) {
      case "download":
        return (
          <button className="text-[#e25002] font-semibold hover:text-[#c44301] transition-colors text-sm">
            Download Form →
          </button>
        );
      case "link":
        return (
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-[#19b8d7] font-semibold hover:text-[#1596af] transition-colors text-sm inline-flex items-center">
            Visit Website
            <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      case "video":
        return (
          <button className="text-[#fdb52b] font-semibold hover:text-[#e6a426] transition-colors text-sm">
            Watch Video →
          </button>
        );
      default:
        return (
          <button className="text-[#e25002] font-semibold hover:text-[#c44301] transition-colors text-sm">
            Learn More
          </button>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          {getIcon()}
        </div>
        {resource.type === "download" && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">PDF</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-[#485a61] mb-3">{resource.title}</h3>
      <p className="text-[#485a61] opacity-80 text-sm mb-4">{resource.description}</p>
      {resource.duration && (
        <p className="text-xs text-[#19b8d7] mb-4">{resource.duration}</p>
      )}
      <div>{getAction()}</div>
    </div>
  );
}

export function ResourcesList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadResources();
        setResources(data);
      } catch (error) {
        console.error("Failed to load resources:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="max-w-sm mx-auto">Loading resources...</p>;
  }

  if (resources.length === 0) {
    return <p>No resources available.</p>;
  }

  // Group resources by category
  const guides = resources.filter(r => r.category === "guide");
  const communityResources = resources.filter(r => r.category === "community");
  const forms = resources.filter(r => r.category === "form");
  const videos = resources.filter(r => r.category === "video");

  return (
    <div className="space-y-12">
      {/* Pet Care Guides */}
      {guides.length > 0 && (
        <section>
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">
              Pet Care Guides
            </h2>
            <p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed">
              Essential information to help you provide the best care for your furry friends.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {guides.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {/* Community Resources */}
      {communityResources.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">
                Community Resources
              </h2>
              <p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed">
                Local organizations, services, and programs available to support pet owners.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {communityResources.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Forms & Documents */}
      {forms.length > 0 && (
        <section>
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">
              Forms & Documents
            </h2>
            <p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed">
              Downloadable forms, applications, and important documents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {/* Educational Videos */}
      {videos.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">
                Educational Videos
              </h2>
              <p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed">
                Watch informative videos about pet care and training.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}