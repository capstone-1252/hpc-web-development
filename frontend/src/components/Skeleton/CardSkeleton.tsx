import React from "react";

interface CardSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
  showImage?: boolean;
  height?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className = "",
  lines = 3,
  showAvatar = false,
  showImage = false,
  height = "h-24",
}) => {
  return (
    <div
      className={`animate-pulse rounded-lg border border-gray-200 p-4 ${className}`}
    >
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>
      )}

      {showImage && (
        <div className={`${height} bg-gray-300 rounded-md mb-4`}></div>
      )}

      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-gray-300 rounded ${
              i === lines - 1 ? "w-3/4" : "w-full"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
