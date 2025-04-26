import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const DoctorAccount = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );
  const [tab, setTab] = useState("overview");

  return (
    <section>
      <div className="!max-w-[1170px] !px-5 !mx-auto">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error errMessage={error} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex items-center gap-3 !p-4 !mb-4 !mt-10 text-yellow-800 bg-yellow-50 rounded-lg">
                  <AiOutlineExclamationCircle className="!w-5 !h-5" />
                  <p className="text-sm font-medium">
                    Your account is pending approval. You will be notified once
                    it's approved.
                  </p>
                </div>
              )}

              <div className="!mt-8">
                {tab === "overview" && (
                  <>
                    <div className="flex items-center gap-4 !mb-10">
                      <figure className="!max-w-[200px] !max-h-[200px] border-2 border-blue-500 rounded-lg">
                        {data?.photo ? (
                          <img src={data.photo} alt="" className="rounded-md" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                            N/A
                          </div>
                        )}
                      </figure>

                      <div className="!ml-5 !mt-10 !space-y-2">
                        <span className="bg-[#CCF0F3] text-teal-400 !py-1 !px-4 lg:!py-2 lg:!px-6 rounded-md text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data?.specialization}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-gray-900 !mt-3">
                          {data?.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-gray-900 text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src="/images/Star.png" alt="" />
                            {data?.averageRating}
                          </span>
                          <span className="text-gray-500 text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data?.totalRating})
                          </span>
                        </div>

                        <p className="text-[18px] leading-[30px] font-[15px] text-gray-500">
                          {data?.bio}
                        </p>
                      </div>
                    </div>

                    <div>
                      <DoctorAbout
                        name={data.name}
                        about={data.about}
                        qualifications={data.qualifications}
                        experiences={data.experiences}
                      />
                    </div>
                  </>
                )}

                {tab === "appointments" && <Appointments appointments={data.appointments}/>}
                {tab === "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorAccount;
