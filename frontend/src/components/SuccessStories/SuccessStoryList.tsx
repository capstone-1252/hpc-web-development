import { loadSuccessStories, type SuccessStory } from "@/loaders/loadSuccessStories";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/loaders/loadBoardMembers";

interface StoryCardProps {
	story: SuccessStory
}

function SuccessStoryCard({ story }: StoryCardProps) {
	const imageUrl = story.image ? getImageUrl(story.image, 248, 248) : "";

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
			<div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 border border-gray-200 h-full flex flex-col">
				<div className="flex flex-col items-start gap-3 lg:gap-4">
					{story.image && (
						<div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
							<img
								src={imageUrl}
								className="w-full h-full object-cover"
							/>
						</div>
					)}
					<div className="flex-1">
						<p className="text-sm lg:text-base text-[#485a61] opacity-80 mb-3">{story.description}</p>
					</div>
				</div>
			</div>
		</div>

	)
};


export function SuccessStoryList() {
	const [stories, setStories] = useState<SuccessStory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loadSuccessStories();
				setStories(data);
			} catch (error) {
				console.error("Failed to load stories:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);


	if (stories.length === 0) {
		return <p>No stories available.</p>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
			{stories.map((story) => (
				<SuccessStoryCard key={story._id} story={story} />
			))}
		</div>
	);
}

