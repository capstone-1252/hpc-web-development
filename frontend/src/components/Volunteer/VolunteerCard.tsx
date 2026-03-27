import type { Volunteer } from "@/loaders/loadVolunteers";
import { getImageUrl } from "@/loaders/utils";

interface VolunteerMemberProps {
  volunteer: Volunteer;
}
export const VolunteerCard = ({ volunteer }: VolunteerMemberProps) => {
  let imageUrl = "";
  if (volunteer.photo) {
    imageUrl = getImageUrl(volunteer.photo, 64, 64);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 overflow-hidden ring-4 ring-primary/10">
        {volunteer.photo ? (
          <img
            src={imageUrl}
            alt={"Headshot of" + volunteer.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary text-3xl font-bold">
              {volunteer.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-[#485a61] mb-2">
        {volunteer.name}
      </h3>
      <p className="text-teal-700 font-medium">{volunteer.role}</p>
    </div>
  );
};
