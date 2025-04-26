import convertTime from "../../utils/convertTime";
import { BASE_URL, access_token } from "../../config.js";
import {toast} from "react-toastify"
const SidePanel = ({ doctorId, timeSlots, ticketPrice }) => {
  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-xl !p-3 lg:!p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-[18px] leading-[30px] font-semibold !mt-0">
          Ticket Price
        </p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-gray-900 font-bold">
          {ticketPrice} L.E
        </span>
      </div>

      <div className="!mt-[30px]">
        <p className="text-[18px] leading-[30px] font-semibold !mt-0">
          Available Time Slots
        </p>
        {timeSlots?.map((item, index) => (
          <ul key={index} className="!mt-3">
            <li className="flex items-center justify-between !mb-2">
              <p className="text-[15px] leading-6 text-gray-500 font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-gray-500 font-semibold">
                {convertTime(item.startinTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          </ul>
        ))}
      </div>

      <button
        onClick={bookingHandler}
        className="!w-full bg-blue-500 !py-[10px] !px-[30px] rounded-md text-white font-[600] !mt-[38px] cursor-pointer hover:bg-blue-600"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
