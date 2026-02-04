import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}

export type VolunteerOpportunity = {
  _id: string;
  title: string;
  description: string;
  time_commitment: string;
  schedule: string;
  skills_required?: string;
  training_required?: boolean;
  category: string;
  image?: CockpitImage;
};

export async function loadVolunteerOpportunities(): Promise<VolunteerOpportunity[]> {
  const data = await cockpit.getItems("volunteer_opportunities", {
    sort: { title: 1 }
  });
  return data as VolunteerOpportunity[];
}

export async function loadVolunteerOpportunity(id: string): Promise<VolunteerOpportunity | null> {
  try {
    const data = await cockpit.getItem("volunteer_opportunities", id);
    return data as VolunteerOpportunity;
  } catch {
    return null;
  }
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}