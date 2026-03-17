import { loadResources, type Resource } from "@/loaders/loadResources";
import { useEffect, useState } from "react";

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

  return (
    <div className="space-y-12">
      {resources.map((resource) => {
        return <>{resource}</>;
      })}
    </div>
  );
}
