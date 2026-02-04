import { loadEvents, type Event, getImageUrl } from "@/loaders/loadEvents";
import { useEffect, useState } from "react";

interface EventCardProps {
  event: Event;
  variant?: "upcoming" | "past";
}

function EventCard({ event, variant = "upcoming" }: EventCardProps) {
  const colors = {
    upcoming: {
      bg: "from-[#e25002] to-[#c44301]",
      text: "text-white"
    },
    past: {
      bg: "from-[#485a61] to-[#3a484f]",
      text: "text-white"
    }
  };

  const currentColor = colors[variant];
  const imageUrl = event.image ? getImageUrl(event.image) : "";

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      {event.image && (
        <div className="w-full h-48 sm:h-64 lg:h-72">
          <img 
            src={imageUrl} 
            alt={event.image.alt || event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`bg-gradient-to-r ${currentColor.bg} p-4 lg:p-6 ${currentColor.text}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <span className="text-lg lg:text-xl font-bold">{event.title}</span>
          {event.featured && (
            <span className="text-sm lg:text-base opacity-90">Featured Event</span>
          )}
        </div>
        <div className="text-sm lg:text-base opacity-80">
          {event.date} • {event.time}
        </div>
      </div>
      <div className="p-4 lg:p-6">
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 lg:w-5 lg:h-5 text-[#485a61] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm lg:text-base text-[#485a61]">{event.location}</span>
        </div>
        <p className="text-[#485a61] opacity-80 leading-relaxed mb-4">
          {event.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg lg:text-xl font-bold text-[#19b8d7]">{event.price}</span>
          <button className="bg-[#e25002] hover:bg-[#c44301] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-colors">
            {variant === "upcoming" ? "Register Now" : "Learn More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EventsList() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upcoming, past] = await Promise.all([
          loadEvents("upcoming"),
          loadEvents("past")
        ]);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="max-w-sm mx-auto">Loading events...</p>;
  }

  return (
    <div className="space-y-12">
      {/* Upcoming Events Section */}
      <section>
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed">
            Mark your calendar and join us for these upcoming events that help support our mission.
          </p>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#485a61] opacity-80">No upcoming events scheduled at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} variant="upcoming" />
            ))}
          </div>
        )}
      </section>

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#485a61] mb-4 lg:mb-6">
                Past Events
              </h2>
              <p className="text-lg lg:text-xl text-[#485a61] opacity-80 max-w-4xl mx-auto leading-relaxed">
                Look back at successful events that have helped us make a difference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event._id} event={event} variant="past" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}