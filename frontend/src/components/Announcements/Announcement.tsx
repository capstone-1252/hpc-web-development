import { useState } from "react";
import { RichText } from "../RichTextField";

import "./AnnouncementStyles.css";

import type { Announcement as AnnouncementFields } from "@/loaders/loadAnnouncements";

interface AnnouncementProps {
  announcement: AnnouncementFields;
}

const stripHtml = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export const Announcement = ({ announcement }: AnnouncementProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const plainText = stripHtml(announcement.content);
  const isLongContent = plainText.length > 200;

  return (
    <div className="announcement-card max-w-xl">
      <div className="announcement-header">
        <h3 className="announcement-title">{announcement.title}</h3>
        {announcement.event && (
          <span className="announcement-badge">Event</span>
        )}
      </div>
      <div className="announcement-content">
        {isLongContent && !isExpanded ? (
          <>
            <RichText content={truncateText(announcement.content, 200)} />
            <button
              className="announcement-expand-btn"
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </button>
          </>
        ) : (
          <RichText content={announcement.content} />
        )}
        {isExpanded && isLongContent && (
          <button
            className="announcement-expand-btn"
            onClick={() => setIsExpanded(false)}
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};
