import cockpit from "@/lib/cockpit";

export async function loadResources(): Promise<any[]> {
  const data = await cockpit.getItems("Resources")
  return data;
}

export async function loadResource(id: string): Promise<any | null> {
  try {
    const data = await cockpit.getItem("Resources", id);
    return data
  } catch {
    return null;
  }
}
