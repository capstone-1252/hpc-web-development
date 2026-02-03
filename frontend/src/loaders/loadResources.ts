import cockpit from "@/lib/cockpit";

export type Resource = {
  _id: string;
  title: string;
  description: string;
  category: "guide" | "community" | "form" | "video";
  type: "download" | "link" | "video";
  url?: string;
  file_name?: string;
  file_path?: string;
  icon?: string;
  duration?: string;
  file_size?: string;
};

export async function loadResources(category?: string): Promise<Resource[]> {
  const filter = category ? { category } : {};
  const data = await cockpit.getItems("resources", { 
    filter,
    sort: { title: 1 }
  });
  return data as Resource[];
}

export async function loadResource(id: string): Promise<Resource | null> {
  try {
    const data = await cockpit.getItem("resources", id);
    return data as Resource;
  } catch {
    return null;
  }
}