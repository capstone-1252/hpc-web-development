import type { BoardMember } from "@/loaders/loadBoardMembers";
import { getImageUrl } from "@/loaders/utils";

interface BoardMemberCardProps {
  member: BoardMember;
}
export const BoardMemberCard = ({ member }: BoardMemberCardProps) => {
  let imageUrl = "";
  if (member.photo) {
    imageUrl = getImageUrl(member.photo, 64, 64);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 overflow-hidden ring-4 ring-primary/10">
        {member.photo ? (
          <img
            src={imageUrl}
            alt={"Headshot of" + member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary text-3xl font-bold">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-dark-blue mb-2">{member.name}</h3>
      <p className="text-primary font-medium">{member.position}</p>
    </div>
  );
};
