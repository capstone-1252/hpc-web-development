import cockpit, { type CockpitItemData } from "@/lib/cockpit";

// include string for future resource type additions
type ResourceType =
  | "App"
  | "Learning Module"
  | "Video"
  | "Article"
  | "Web Page"
  | "Study"
  | string;

export interface Resource extends CockpitItemData {
  name: string;
  url: string;
  category: string;
  resourceType: ResourceType;
}

export async function loadResources(): Promise<Resource[]> {
  const data = await cockpit.getItems<Resource>("resources");
  return data;
}
