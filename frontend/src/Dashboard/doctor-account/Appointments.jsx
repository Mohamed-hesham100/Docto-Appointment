import { formateDate } from "../../utils/formateDate";

const Appointments = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No appointments found.
      </div>
    );
  }
  return (
    <table className="!w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="!px-6 !py-3">Name</th>
          <th className="!px-6 !py-3">Gender</th>
          <th className="!px-6 !py-3">Payment</th>
          <th className="!px-6 !py-3">Price</th>
          <th className="!px-6 !py-3">Booked On</th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th
              scope="row"
              className="flex items-center !px-6 !py-4 text-gray-900 whitespace-nowrap"
            >
              <img
                src={item.user.photo}
                alt=""
                className="!w-10 !h-10 rounded-full"
              />
              <div className="!pl-3">
                <div className="text-base font-semibold">{item.user.email}</div>
              </div>
            </th>

            <td className="!px-6 !py-4">{item.user.gender}</td>

            <td className="!px-6 !py-4">
              <div className="flex items-center">
                <div
                  className={`!h-2.5 !w-2.5 rounded-full ${
                    item.isPaid ? "bg-green-500" : "bg-red-500"
                  } !mr-2`}
                />
                <span>{item.isPaid ? "Paid" : "UnPaid"}</span>
              </div>
            </td>

            <td className="!px-6 !py-4">{item.ticketPrice}</td>
            <td className="!px-6 !py-4">{formateDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
