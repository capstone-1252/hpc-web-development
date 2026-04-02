import { type Resource } from "@/loaders/loadResources";
import { ResourceCategory } from "./ResourceCategory";

const RESOURCE_TYPE_LABELS: Record<string, string> = {
  "Learning Module": "Learning Modules",
  "Video": "Learning Videos",
  "App": "Apps",
  "Article": "Articles",
  "Web Page": "Web Pages",
  "Study": "Studies",
};

function getResourceLabel(type: string): string {
  return RESOURCE_TYPE_LABELS[type] || type;
}

export function ResourceSection({ title, resources }: { title: string; resources: Resource[] }) {
  const grouped = resources.reduce((acc, resource) => {
    const type = resource.resourceType || "Other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  const sortedTypes = Object.keys(grouped).sort((a, b) => {
    const order = Object.keys(RESOURCE_TYPE_LABELS);
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <section className="py-12 sm:py-16 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-[var(--dark-blue)] font-semibold text-gray-800 mb-6">
          {title}
        </h2>
        
        {sortedTypes.map((type) => (
          <ResourceCategory 
            key={type} 
            title={`${title} ${getResourceLabel(type)}`} 
            resources={grouped[type]} 
          />
        ))}
      </div>
    </section>
  );
}
