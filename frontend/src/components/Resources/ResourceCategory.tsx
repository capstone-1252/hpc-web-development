import { type Resource } from "@/loaders/loadResources";
import { ResourceButton } from "./ResourceButton";

interface ResourceCategoryProps {
  title: string;
  resources: Resource[];
}

export function ResourceCategory({ title, resources }: ResourceCategoryProps) {
  if (resources.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-[var(--dark-blue)] text-2xl text-gray-700 mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4">
        {resources.map((resource, index) => (
          <ResourceButton key={index} resource={resource} />
        ))}
      </div>
    </div>
  );
}
