import DoctorCard from "../Doctors/DoctorCard";
import { BASE_URL } from "./../../config.js";
import useFetchData from "./../../hooks/useFetchData.jsx";
import Loader from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="!max-w-7xl !mx-auto !px-4">
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 !gap-6 !mt-10">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorList;
