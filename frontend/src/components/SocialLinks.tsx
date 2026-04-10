import { loadSocialLinks, type SocialLink } from "@/loaders/loadSocialLinks";
import { getImageUrl } from "@/loaders/utils";
import { useEffect, useState } from "react";

export const SocialLinks = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await loadSocialLinks();
      setLinks(res);
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <a
          key={link._id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={link.name}
        >
          <img src={getImageUrl(link.logo, 68, 68)} alt={link.name + " Link"} />
        </a>
      ))}
    </div>
  );
};
