import { formateDate } from "../../utils/formateDate";
const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <>
      <div>
        <div>
          <h3 className="text-[20px] leading-[30px] text-black font-semibold flex items-center gap-2">
            About of
            <span className="text-teal-500 font-bold text-[24px] leading-9">
              {name}
            </span>
          </h3>

          <p className="text-[18px] leading-[30px] font-[400] text-gray-700 !mt-[18px]">
            {about}
          </p>
        </div>

        <div className="!mt-12">
          <h3 className="text-[20px] leading-[30px] text-black font-semibold">
            Education
          </h3>
          <ul className="!pt-4 md:!p-5">
            {qualifications?.map((item, index) => (
              <>
                <li key={index} className="flex flex-col sm:flex-row ">
                  <div>
                    <span className="text-teal-400 text-[15px] leading-6 font-semibold ">
                      {formateDate(item.startingDate)} -{" "}
                      {formateDate(item.endingDate)}
                    </span>
                    <p className="text-[16px] leading-6 font-medium text-gray-500 !mt-2">
                      {item.degree}
                    </p>
                  </div>
                  <p className="text-[14px] leading-5 font-medium text-gray-500 !ml-50 !mt-8">
                    {item.university}
                  </p>
                </li>
              </>
            ))}
          </ul>
        </div>

        <div className="!mt-12">
          <h3 className="text-[20px] leading-[30px] text-black font-semibold">
            Experience
          </h3>

          <ul className="grid sm:grid-cols-2 gap-[30px] !pt-4 md:!p-5">
            {experiences?.map((item, index) => (
              <li key={index} className="!p-4 rounded bg-[#fff9ea]">
                <div className="flex flex-col gap-2">
                  <span className="text-yellow-400 text-[15px] leading-6 font-semibold">
                    {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-gray-800">
                    {item.position}
                  </p>
                  <p className="text-[14px] leading-5 font-medium text-gray-500">
                    {item.hospital}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DoctorAbout;
