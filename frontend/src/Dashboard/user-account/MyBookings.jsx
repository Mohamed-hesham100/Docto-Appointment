import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading"; // تأكد أنك مستدعيه
import Error from "../../components/Error/Error"; // تأكد أنك مستدعيه
import DoctorCard from "../../components/Doctors/DoctorCard"; // تأكد أنك مستدعيه

const MyBookings = () => {
  const {
    data: appointments,
    error,
    loading,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMessage={error} />;
  }

  return (
    <div>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments
            .filter((appointment) => appointment.doctor)
            .map((appointment) => (
              <DoctorCard doctor={appointment.doctor} key={appointment.doctor._id} />
            ))}
        </div>
      ) : (
        <h2 className="!mt-10 !mr-90 text-center leading-7 text-[20px] font-semibold text-blue-500">
          You did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
