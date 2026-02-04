import type { BoardMember } from "@/loaders/loadBoardMembers"
import { getImageUrl } from "@/loaders/loadBoardMembers"

interface BoardMemberCardProps {
	member: BoardMember
}
export const BoardMemberCard = ({ member }: BoardMemberCardProps) => {
	console.log(getImageUrl(member.photo));

	return (

		<div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center">
			<div className="w-16 h-16 bg-[#e25002] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
				{member.photo ? (
					<img 
						src={getImageUrl(member.photo)} 
						alt={member.photo| member.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full bg-[#e25002] bg-opacity-20 rounded-full flex items-center justify-center">
						<span className="text-[#e25002] text-xl font-bold">
							{member.name.charAt(0).toUpperCase()}
						</span>
					</div>
				)}
			</div>
			<h3 className="text-lg font-bold text-[#485a61] mb-2">{ member.name }</h3>
			<p className="text-[#19b8d7] font-medium">{ member.position }</p>
		</div>
	)
}
