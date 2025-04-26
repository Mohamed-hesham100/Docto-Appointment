import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { BASE_URL, access_token } from "../../config";

const Profile = ({ doctorData }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData.name,
      email: doctorData.email,
      password: "",
      phone: doctorData.phone,
      bio: doctorData.bio,
      gender: doctorData.gender,
      specialization: doctorData.specialization,
      ticketPrice: doctorData.ticketPrice,
      qualifications: doctorData.qualifications,
      experiences: doctorData.experiences,
      timeSlots: doctorData.timeSlots,
      about: doctorData.about,
      photo: doctorData.photo,
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, photo: data?.url }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const deleteItem = (key, index) => {
    setFormData((preventFormdata) => ({
      ...preventFormdata,
      [key]: preventFormdata[key].filter((_, i) => i !== index),
    }));
  };

  const handleResableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handelQualificationChange = (event, index) => {
    handleResableInputChangeFunc("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handelExperienceChange = (event, index) => {
    handleResableInputChangeFunc("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "Sundy",
      startinTime: "10:00",
      endingTime: "04:30",
    });
  };

  const handelTimeSlotChange = (event, index) => {
    handleResableInputChangeFunc("timeSlots", index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-gray-900 font-bold text-[24px] leading-9 !mb-10">
        Profile Information
      </h2>

      <form action="">
        <div className="!mb-5">
          <label
            htmlFor="name"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="!mb-5">
          <label
            htmlFor="email"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
            readOnly
            aria-readonly
            disabled
          />
        </div>

        <div className="!mb-5">
          <label
            htmlFor="phone"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            Phone *
          </label>
          <input
            id="phone"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="!mb-5">
          <label
            htmlFor="bio"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            Bio *
          </label>
          <input
            id="bio"
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
            maxLength={100}
          />
        </div>

        <div className="!mb-5">
          <div className="grid grid-cols-3 gap-5 !mb-[30px]">
            <div>
              <label
                htmlFor="gender"
                className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
              >
                Gender *
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] bg-white focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
              >
                <option value="" disabled>
                  Select
                </option>
                <option
                  value="male"
                  className="text-gray-700 bg-white hover:bg-gray-100 "
                >
                  Male
                </option>
                <option
                  value="female"
                  className="text-gray-700 bg-white hover:bg-gray-100 "
                >
                  Female
                </option>
                <option
                  value="other"
                  className="text-gray-700 bg-white hover:bg-gray-100 "
                >
                  Other
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="specialization"
                className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
              >
                Specialization *
              </label>
              <select
                name="specialization"
                id="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] bg-white focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="pediatrician">Pediatrician</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="ticketPrice"
                className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
              >
                Ticket Price *
              </label>
              <input
                type="number"
                name="ticketPrice"
                id="ticketPrice"
                placeholder="100"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="!w-full !px-4 !py-2 border border-solid rounded-md border-[#0066ff61] bg-white focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="!mb-5">
          <label
            htmlFor="qualifications"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            qualifications *
          </label>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="startingDate"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      id="startingDate"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endingDate"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      id="endingDate"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 !mt-5">
                  <div>
                    <label
                      htmlFor="degree"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Degree *
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      id="degree"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="university"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      University *
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      id="university"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="!p-2 bg-red-600 rounded-full text-white text-[18px] !mt-2 !mb-[30px] cursor-pointer hover:bg-red-700 transition-all duration-200"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQualification}
            className="bg-black text-white !py-2 !px-5 rounded-md cursor-pointer hover:bg-gray-800 transition duration-200 h-fit "
          >
            Add Qualification
          </button>
        </div>

        <div className="!mb-5">
          <label
            htmlFor="qualifications"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            Experinces *
          </label>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="startingDate"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      id="startingDate"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endingDate"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      id="endingDate"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 !mt-5">
                  <div>
                    <label
                      htmlFor="position"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      id="position"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hospital"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Hospital *
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      id="hospital"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(e) => handelExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteExperience(e, index)}
                  className="!p-2 bg-red-600 rounded-full text-white text-[18px] !mt-2 !mb-[30px] cursor-pointer hover:bg-red-700 transition-all duration-200"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addExperience}
            className="bg-black text-white !py-2 !px-5 rounded-md cursor-pointer hover:bg-gray-800 transition duration-200 h-fit "
          >
            Add Experiences
          </button>
        </div>

        <div className="!mb-5">
          <label
            htmlFor="qualifications"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            Time Slots *
          </label>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 !mb-[20px] gap-5">
                  <div>
                    <label
                      htmlFor="day"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Day *
                    </label>
                    <select
                      name="day"
                      id="day"
                      value={item.day}
                      className="!w-full !px-4 !py-3.5 border border-solid rounded-md border-[#0066ff61] bg-white focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(event) => handelTimeSlotChange(event, index)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="startinTime"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Starting Time *
                    </label>
                    <input
                      type="time"
                      name="startinTime"
                      value={item.startinTime}
                      id="startinTime"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(event) => handelTimeSlotChange(event, index)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endingTime"
                      className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
                    >
                      {" "}
                      Ending Time *
                    </label>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      id="endingTime"
                      className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
                      onChange={(event) => handelTimeSlotChange(event, index)}
                    />
                  </div>

                  <div className="flex items-center !mt-9">
                    <button
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="!p-2 bg-red-600 rounded-full text-white text-[18px] !mt-2 !mb-[30px] cursor-pointer hover:bg-red-700 transition-all duration-200"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTimeSlot}
            className="bg-black text-white !py-2 !px-5 rounded-md cursor-pointer hover:bg-gray-800 transition duration-200 h-fit "
          >
            Add Timeslot
          </button>
        </div>

        <div className="!mb-5">
          <label
            htmlFor="about"
            className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
          >
            About *
          </label>
          <textarea
            name="about"
            id="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you..."
            onChange={handleInputChange}
            className="!w-full !px-4 !py-3 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out"
          ></textarea>
        </div>

        <div className="!mb-5 flex items-center !gap-3">
          {loading ? (
            <ClipLoader size={50} color="#ff6347" />
          ) : (
            formData?.photo && (
              <figure className="!w-[60px] !h-[60px] rounded-full border-2 border-solid border-blue-500 flex items-center justify-center">
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="!w-full rounded-full"
                />
              </figure>
            )
          )}

          <div className="relative !w-[130px] !h-[50px]">
            <label
              htmlFor="customFile"
              className="absolute !top-0 !left-0 !w-full !h-full flex items-center !px-[0,75rem] !py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-gray-900 font-semibold rounded-lg truncate cursor-pointer"
            >
              <span className="!ml-4">Upload Photo</span>
            </label>
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handelFileInputChange}
              className="!absolute !top-0 !left-0 !w-full !h-full opacity-0 cursor-pointer"
              accept=".jpg, .png"
            />
          </div>
        </div>

        <div className="!mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-blue-500 text-white text-[18px] leading-[30px] !w-full !px-4 !py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
