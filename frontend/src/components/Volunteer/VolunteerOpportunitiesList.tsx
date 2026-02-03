import { loadVolunteerOpportunities, type VolunteerOpportunity } from "@/loaders/loadVolunteers";
import { useEffect, useState } from "react";

export function VolunteerOpportunitiesList() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadVolunteerOpportunities();
        setOpportunities(data);
      } catch (error) {
        console.error("Failed to load volunteer opportunities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="max-w-sm mx-auto">Loading volunteer opportunities...</p>;
  }

  if (opportunities.length === 0) {
    return <p>No volunteer opportunities available at this time.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {opportunities.map((opportunity) => (
        <div key={opportunity._id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#e25002] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#e25002]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#485a61] mb-2">{opportunity.title}</h3>
              <p className="text-[#485a61] opacity-80 mb-3">{opportunity.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#e8f4f7] text-[#485a61] text-sm rounded-full">
                  {opportunity.schedule}
                </span>
                <span className="px-3 py-1 bg-[#e8f4f7] text-[#485a61] text-sm rounded-full">
                  {opportunity.time_commitment}
                </span>
                {opportunity.training_required && (
                  <span className="px-3 py-1 bg-[#e8f4f7] text-[#485a61] text-sm rounded-full">
                    Training required
                  </span>
                )}
              </div>
              {opportunity.skills_required && (
                <p className="text-sm text-[#485a61] opacity-80 mb-3">
                  <strong>Skills:</strong> {opportunity.skills_required}
                </p>
              )}
              <button className="text-[#e25002] font-semibold hover:text-[#c44301] transition-colors text-sm">
                Apply for this position →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}