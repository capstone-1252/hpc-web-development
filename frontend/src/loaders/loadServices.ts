import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}

export type ServiceInfo = {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  image?: CockpitImage;
  details?: string[];
};

export async function loadServiceInfo(): Promise<ServiceInfo[]> {
  const data = await cockpit.getItems("services", {
    sort: { title: 1 }
  });
  return data as ServiceInfo[];
}

export type EligibilityInfo = {
  _id: string;
  title: string;
  content: string;
  income_cutoffs: {
    one_person: number;
    two_people: number;
    three_people: number;
    four_people: number;
  };
};

export async function loadEligibilityInfo(): Promise<EligibilityInfo | null> {
  try {
    const data = await cockpit.getSingleton("eligibility_info");
    return data as EligibilityInfo;
  } catch {
    return null;
  }
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}
