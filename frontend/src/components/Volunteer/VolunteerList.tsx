import { loadVolunteers, type Volunteer } from "@/loaders/loadVolunteers";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../Skeleton/CardSkeleton";
import { VolunteerCard } from "./VolunteerCard";

export const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadVolunteers();
      setVolunteers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <CardSkeleton showAvatar={true} />
        <CardSkeleton showAvatar={true} />
        <CardSkeleton showAvatar={true} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {volunteers.map((volunteer) => (
        <VolunteerCard volunteer={volunteer} />
      ))}
    </div>
  );
};
