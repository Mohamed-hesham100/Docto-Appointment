import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import Profile from "./Profile";
import MyBookings from "./MyBookings";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <section>
      <div className="!max-w-[1170px] !px-5 !mx-auto !mt-10">
        {loading ? <Loading /> : <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="!pb-[50px] !px-[30px] rounded-md">
              <div className="flex items-center justify-center !mt-4">
                <figure className="!w-[100px] !h-[100px] rounded-full border-2 border-solid border-blue-500">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center !mt-4">
                <h3 className="text-[18px] leading-[30px] text-black font-bold">
                 {userData.name}
                </h3>
                <p className="text-gray-500 text-15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-gray-500 text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="!ml-2 text-black text-[18px] leading-8 ">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="!mt-12 md:!mt-24 !space-y-4">
                <button
                  onClick={handleLogout}
                  className="!w-full bg-black hover:bg-gray-800 transition duration-200 !p-3 text-[16px] font-semibold rounded-lg text-white shadow-md cursor-pointer"
                >
                  Logout
                </button>

                <button className="!w-full bg-red-600 hover:bg-red-700 transition duration-200 !p-3 text-[16px] font-semibold rounded-lg text-white shadow-md cursor-pointer">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:!px-[30px] !mt-4">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setTab("bookings")}
                  className={`!py-2 !px-5 !mr-5 rounded-md text-[16px] leading-7 font-semibold border border-solid border-blue-500 transition duration-200 cursor-pointer ${
                    tab === "bookings"
                      ? "!bg-blue-500 !text-white"
                      : "!text-black hover:!bg-blue-50"
                  }`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`!py-2 !px-5 !mr-5 rounded-md text-[16px] leading-7 font-semibold border border-solid border-blue-500 transition duration-200 cursor-pointer ${
                    tab === "settings"
                      ? "!bg-blue-500 !text-white"
                      : "!text-black hover:!bg-blue-50"
                  }`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "bookings" ? <MyBookings /> : <Profile user={userData}/>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
