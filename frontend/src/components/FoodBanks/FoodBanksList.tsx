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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {foodBanks.map((foodBank) => (
        <div
          key={foodBank._id}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl font-bold text-(--dark-blue) ">
              {foodBank.name}
            </h3>
            <div className="space-y-2 text-sm text-(--dark-blue)">
              {foodBank.link && (
                <p className="text-blue-600 text-md font-bold">
                  <a href={foodBank.link}>External Link</a>
                </p>
              )}
              {foodBank.phone && (
                <p>
                  <strong>Primary Phone:</strong> {foodBank.phone}
                </p>
              )}
              {foodBank.address && (
                <p>
                  <strong>Location:</strong> {foodBank.address}
                </p>
              )}
              {foodBank.hours && (
                <p>
                  <strong>Hours:</strong> {foodBank.hours}
                </p>
              )}
              {foodBank.email && (
                <p>
                  <strong>Contact:</strong> {foodBank.email}
                </p>
              )}
              <p className="font-bold">
                {foodBank.appointmentOnly ? <p>Appointment Only</p> : ""}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
