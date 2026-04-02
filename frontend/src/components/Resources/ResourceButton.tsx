import { type Resource } from "@/loaders/loadResources";

interface ResourceButtonProps {
  resource: Resource;
}

export function ResourceButton({ resource }: ResourceButtonProps) {
  const isExternal = resource.url?.startsWith("http");
  
  return (
    <a
      href={resource.url || "#"}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="bg-[#0C5E6E] text-white text-lg px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
    >
      {resource.name}
    </a>
  );
}
