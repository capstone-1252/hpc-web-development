import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface BoardMember extends CockpitItemData {
  name: string;
  position: string;
  bio?: string;
  photo?: AssetImage;
};

export async function loadBoardMembers(): Promise<BoardMember[]> {
  const data = await cockpit.getItems("board", {
    sort: { order: 1 }
  });
  return data as BoardMember[];
}

export async function loadBoardMember(id: string): Promise<BoardMember> {
  try {
    const data = await cockpit.getItem("board", id);
    return data as BoardMember;
  } catch {
    return {} as BoardMember
  }
}
