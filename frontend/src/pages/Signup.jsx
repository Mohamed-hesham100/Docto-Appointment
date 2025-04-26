import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary.js";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HashLoader, ClipLoader } from "react-spinners";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [URL, setURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "patient",
  });

  const handelInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoding(true);
    try {
      const data = await uploadImageToCloudinary(file);
      setURL(data.secure_url);
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
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
      setLoding(false);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoding(false);
    }
  };

  return (
    <section className="!px-5 xl:!px-0">
      <div className="!max-w-[1170px] !mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ========== img box ========= */}
          <div className="hidden lg:block bg-blue-500 rounded-l-lg !mt-10">
            <figure className="rounded-l-lg">
              <img src="/images/signup.gif" alt="" className="" />
            </figure>
          </div>

          {/* ======= signup form ======== */}
          <div className="rounded-l-lg lg:!pl-16 !py-10 !mt-5">
            <h3 className="text-black text-[22px] leading-9 font-bold !mb-10">
              Creat a new <span className="text-blue-500">account</span>
            </h3>

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
                  className="!w-full !pr-4 !py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500  cursor-pointer"
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

              <div className="!mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-black font-bold text-[16px] leading-7"
                >
                  Are You a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handelInputChange}
                    id=""
                    className="text-gray-500 font-semibold text-[15px]  leading-7 !px-4 !py-3 focus:outline-none cursor-pointer"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

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
                  URL && (
                    <figure className="!w-[60px] !h-[60px] rounded-full border-2 border-solid border-blue-500 flex items-center justify-center">
                      <img
                        src={URL}
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
                  disabled={loading && true}
                  className="!w-full bg-blue-500 text-white text-[18px] leading-[30px] rounded-lg !px-3 !py-2 cursor-pointer hover:bg-blue-600"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <p className="!mt-5 text-gray-500 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 font-medium !ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
