import React from "react";

interface ListSkeletonProps {
  className?: string;
  items?: number;
  showAvatar?: boolean;
  lines?: number;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  className = "",
  items = 5,
  showAvatar = false,
  lines = 2,
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse border-b border-gray-200 pb-4 last:border-0"
        >
          <div className="flex items-start space-x-3">
            {showAvatar && (
              <div className="rounded-full bg-gray-300 h-8 w-8 flex-shrink-0 mt-1"></div>
            )}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              {Array.from({ length: lines - 1 }).map((_, j) => (
                <div key={j} className="h-3 bg-gray-300 rounded w-full"></div>
              ))}
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
