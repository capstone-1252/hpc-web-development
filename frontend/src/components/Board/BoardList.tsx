import { loadBoardMembers, type BoardMember } from "@/loaders/loadBoardMembers";
import { useEffect, useState } from "react";
import { BoardMemberCard } from "./BoardMemberCard";
import { CardSkeleton } from "../Skeleton/CardSkeleton";

export const BoardList = () => {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await loadBoardMembers();
      setMembers(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <CardSkeleton showAvatar={true} />
        <CardSkeleton showAvatar={true} />
        <CardSkeleton showAvatar={true} />
        <CardSkeleton showAvatar={true} />
        <CardSkeleton showAvatar={true} />
        <CardSkeleton showAvatar={true} />
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {members.map((member) => (
        <BoardMemberCard member={member} />
      ))}
    </div>
  );
};
