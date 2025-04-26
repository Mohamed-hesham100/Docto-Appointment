import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null; 
  const { name, avgRating, totalRating, photo, specialization, experiences } = doctor


  return (
    <div className="!p-4 rounded-lg transition-transform transform ">
      <div className="!w-full !h-65 overflow-hidden rounded-xl">
        <img
          src={photo || "/images/default-doctor.jpg"}
          alt={name}
          className="!w-full !h-full object-cover cursor-pointer "
        />
      </div>

      <h2 className="text-xl lg:text-2xl font-bold text-black !mt-4">{name}</h2>

      <div className="!mt-2 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-teal-600 !py-1 !px-3 text-sm lg:text-base font-semibold rounded">
          {specialization}
        </span>

        <div className="flex items-center !gap-1 text-sm lg:text-base text-gray-700 font-medium">
          <img src="/images/Star.png" alt="star" className="w-4 h-4" />
          <span>{totalRating}</span>
          <span>({avgRating})</span>
        </div>
      </div>

      <div className="!mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          At {experiences && experiences[0]?.hospital}
        </p>

        <Link
          to={`/doctors/${doctor._id}`}
          className="!w-10 !h-10 !ml-3 rounded-full border border-black mt-2 flex items-center justify-center group hover:bg-blue-600 hover:border-transparent transition"
        >
          <BsArrowRight className="text-black group-hover:text-white !w-10 !h-5" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
