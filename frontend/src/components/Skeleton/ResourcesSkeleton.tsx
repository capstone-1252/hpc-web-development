import React from "react";

interface ResourcesSkeletonProps {
  sections?: number;
  itemsPerSection?: number;
}

export const ResourcesSkeleton: React.FC<ResourcesSkeletonProps> = ({
  sections = 2,
  itemsPerSection = 3,
}) => {
  return (
    <div className="space-y-0">
      {Array.from({ length: sections }).map((_, sectionIndex) => (
        <section key={sectionIndex} className="py-12 sm:py-16 lg:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-9 bg-gray-300 rounded w-48 mb-6 animate-pulse"></div>
            
            {Array.from({ length: 2 }).map((_, categoryIndex) => (
              <div key={categoryIndex} className="mb-10">
                <div className="h-7 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
                <div className="flex flex-wrap gap-4">
                  {Array.from({ length: itemsPerSection }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-300 h-10 rounded-full w-40 animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
