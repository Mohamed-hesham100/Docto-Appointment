import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { access_token, BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HashLoader, ClipLoader } from "react-spinners";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handelInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoding(true);
    try {
        const data = await uploadImageToCloudinary(file);

      setSelectedFile(data.secure_url);
      setFormData({ ...formData, photo: data.secure_url });
      setLoding(false);
    } catch (err) {
      toast.error("Failed to upload image");
      setLoding(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoding(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token} `,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
      setLoding(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoding(false);
    }
  };

  return (
    <div className="!mt-5">
      <form action="" className="" onSubmit={submitHandler}>
        <div className="!mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handelInputChange}
            className="!w-full !pr-4 !py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500  cursor-pointer"
          />
        </div>
        <div className="!mb-5">
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
            onChange={handelInputChange}
            className="!w-full !pr-4 !py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7 text-gray-500 placeholder:text-gray-500  cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>
        <div className="!mb-5">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handelInputChange}
            className="!w-full !pr-4 !py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500  cursor-pointer"
          />
        </div>
        <div className="!mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handelInputChange}
            className="!w-full !pr-4 !py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500  cursor-pointer"
          />
        </div>

        <div className="!mb-5 flex items-center justify-between">
          <label
            htmlFor=""
            className="text-black font-bold text-[16px] leading-7"
          >
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handelInputChange}
              id=""
              className="text-gray-500 font-semibold text-[15px]  leading-7 !px-4 !py-3 focus:outline-none cursor-pointer"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="!mb-5 flex items-center gap-3">
          {loading ? (
            <ClipLoader size={50} color="#ff6347" />
          ) : (
            formData.photo && (
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
              {selectedFile ? (
                selectedFile.name
              ) : (
                <span className="!ml-4">Upload Photo</span>
              )}
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
            disabled={loading && true}
            className="!w-full bg-blue-500 text-white text-[18px] leading-[30px] rounded-lg !px-3 !py-2 cursor-pointer hover:bg-blue-600"
          >
            {loading ? <HashLoader size={35} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
