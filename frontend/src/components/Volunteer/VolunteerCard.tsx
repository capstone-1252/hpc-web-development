import type { Volunteer } from "@/loaders/loadVolunteers";
import { getImageUrl } from "@/loaders/utils";

interface VolunteerMemberProps {
  volunteer: Volunteer;
}
export const VolunteerCard = ({ volunteer }: VolunteerMemberProps) => {
	let imageUrl = ""
	if (volunteer.photo) {
		imageUrl = getImageUrl(volunteer.photo, 64, 64);
	}

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="w-16 h-16 bg-[#e25002] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
        {volunteer.photo ? (
          <img
            src={imageUrl}
            alt={"Headshot of" + volunteer.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#e25002] bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-[#e25002] text-xl font-bold">
              {volunteer.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-[#485a61] mb-2">{volunteer.name}</h3>
      <p className="text-[#19b8d7] font-medium">{volunteer.role}</p>
    </div>
  );
};
