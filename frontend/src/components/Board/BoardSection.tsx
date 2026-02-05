import { loadBoardMembers, type BoardMember } from "@/loaders/loadBoardMembers";
import { useEffect, useState } from "react";
import { BoardMemberCard } from "./BoardMemberCard";
import { CardSkeleton } from "../Skeleton/Card";

export const BoardSection = () => {
	const [members, setMembers] = useState<BoardMember[]>([])
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const res = await loadBoardMembers();
			setMembers(res)
			setLoading(false)
		}
		fetchData();
	}, [])


	if (loading) return (
		<section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-8 lg:mb-12">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">Our Board of Directors</h2>
					<p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed mb-8">
						The Alberta Helping Animals Society (AHAS) Board of Directors consists of non-remunerated volunteers. The Board is responsible for the management of affairs and policies, and provides an overall strategic direction for AHAS to ensure its continuing success.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					<CardSkeleton showAvatar={true} />
					<CardSkeleton showAvatar={true} />
					<CardSkeleton showAvatar={true} />
					<CardSkeleton showAvatar={true} />
					<CardSkeleton showAvatar={true} />
					<CardSkeleton showAvatar={true} />
				</div>
			</div>
		</section>
	)
	return (
		<section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-8 lg:mb-12">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">Our Board of Directors</h2>
					<p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed mb-8">
						The Alberta Helping Animals Society (AHAS) Board of Directors consists of non-remunerated volunteers. The Board is responsible for the management of affairs and policies, and provides an overall strategic direction for AHAS to ensure its continuing success.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{ members.map((member) => <BoardMemberCard member={member} />) }
				</div>
			</div>
		</section>
	)
}
