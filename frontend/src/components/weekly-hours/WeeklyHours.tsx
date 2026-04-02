import { loadWeeklyHours, type WeeklyHours } from "@/loaders/loadHours";
import { useEffect, useState } from "react";

export function WeeklyHoursList() {
  const [hours, setHours] = useState<WeeklyHours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const data = await loadWeeklyHours();
        setHours(data);
      } catch (error) {
        console.error("Failed to load hours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, []);

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sortedHours = [...hours].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
  );

  const formatTime = (time: string) => {
    if (!time) return "Closed";

    const [hour, minute] = time.split(":");
    const h = Number(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;

    return `${formattedHour}:${minute} ${ampm}`;
  };

  if (loading) {
    return <p>Loading hours...</p>;
  }

  if (hours.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-5 text-white">
      {sortedHours.map((item) => (
        <li key={item._id} className="leading-relaxed">
          <span className="font-semibold">{item.day}:</span>{" "}
          {item.open && item.close
            ? `${formatTime(item.open)} - ${formatTime(item.close)}`
            : "Closed"}
        </li>
      ))}
    </ul>
  );
}
