import cockpit from "@/lib/cockpit";

export type ServiceInfo = {
  _id: string;
  title: string;
  description: string;
  icon: string;
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
