import { useState } from "react";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "./../../config.js";
import useFetchData from "./../../hooks/useFetchData.jsx";
import Loader from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const {
    name,
    email,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    qualifications,
    ticketPrice,
    photo,
  } = doctor;

  return (
    <section>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="!max-w-[1170px] !px-5 !mx-auto !mt-10">
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center flex-wrap gap-5">
                <figure className="md:!max-w-[250px] md:!max-h-[250px] ">
                  <img
                    src={photo}
                    alt=""
                    className="!w-full !h-full rounded-md"
                  />
                </figure>

                <div className="md:!mt-10">
                  <span className="bg-[#CCF0F3] text-teal-400 !py-1 !px-6 lg:!py-2 lg:!px-6 text-[12px] leading-4 lg:text-[16px] font-semibold rounded">
                    {specialization}
                  </span>
                  <h3 className="text-black text-[22px] leading-9 !mt-3 font-bold">
                    {name}
                  </h3>

                  <div className="flex items-center gap-[6px] !mt-1">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-black">
                      <img src="/images/Star.png" alt="" />
                      {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-gray-500">
                      ({totalRating})
                    </span>
                  </div>

                  <p className="text-[14px] leading-6 md:text-[15px] lg:!max-w-[390px] !mt-2">
                    {about}
                  </p>
                </div>
              </div>

              <div className="!mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={` ${
                    tab === "about"
                      ? "border-b border-solid border-sky-500"
                      : ""
                  } !py-2 !px-5 !mr-5 text-[16px] leading-7 text-black font-semibold cursor-pointer`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={` ${
                    tab === "feedback"
                      ? "border-b border-solid border-sky-600"
                      : ""
                  } !py-2 !px-5 !mr-5 text-[16px] leading-7 text-black font-semibold cursor-pointer`}
                >
                  Feedback
                </button>
              </div>

              <div className="!mt-[50px]">
                {
                  {
                    about: (
                      <DoctorAbout
                        name={name}
                        about={about}
                        qualifications={qualifications}
                        experiences={experiences}
                      />
                    ),
                    feedback: (
                      <Feedback reviews={reviews} totalRating={totalRating} />
                    ),
                  }[tab]
                }
              </div>
            </div>
            <div>
              <SidePanel
                doctorId={doctor._id}
                timeSlots={timeSlots}
                ticketPrice={ticketPrice}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorDetails;
