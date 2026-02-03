import { loadFoodBanks, type FoodBank } from "@/loaders/loadFoodBanks";
import { useEffect, useState } from "react";

export function FoodBanksList() {
  const [foodBanks, setFoodBanks] = useState<FoodBank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadFoodBanks();
        setFoodBanks(data);
      } catch (error) {
        console.error("Failed to load food banks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="max-w-sm mx-auto">Loading food bank information...</p>;
  }

  if (foodBanks.length === 0) {
    return <p>No food bank information available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {foodBanks.map((foodBank) => (
        <div key={foodBank._id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-[#19b8d7] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#19b8d7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#485a61] mb-3">{foodBank.name}</h3>
          <p className="text-[#485a61] opacity-80 mb-4">{foodBank.description}</p>
          <div className="space-y-2 text-sm text-[#485a61]">
            <p>
              <strong>Location:</strong> {foodBank.address}
            </p>
            <p>
              <strong>Hours:</strong> {foodBank.hours}
            </p>
            {foodBank.contact && (
              <p>
                <strong>Contact:</strong> {foodBank.contact}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}