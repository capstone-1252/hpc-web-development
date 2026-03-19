import {
  loadSuccessStories,
  type SuccessStory,
} from "@/loaders/loadSuccessStories";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/loaders/utils";

interface StoryCardProps {
  story: SuccessStory;
}

function SuccessStoryCard({ story }: StoryCardProps) {
  const imageUrl = story.image ? getImageUrl(story.image, 600, 400) : "";

  return (
    <div className="group bg-white rounded-2xl shadow-md border border-border/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all h-full">
      {story.image && (
        <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
          <img
            src={imageUrl}
            alt={story.name || "Success story"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-dark-blue mb-2 group-hover:text-primary transition-colors">
          {story.name || "Our Success Story"}
        </h3>
        <p className="text-sm lg:text-base text-foreground/80 leading-relaxed line-clamp-3">
          {story.description}
        </p>
      </div>
    </div>
  );
}

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl h-[300px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {stories.slice(0, 4).map((story) => (
        <SuccessStoryCard key={story._id} story={story} />
      ))}
    </div>
  );
}
