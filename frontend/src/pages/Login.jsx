import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import { HashLoader, ClipLoader } from "react-spinners";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handelInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          access_token: result.access_token,
        },
      });

      // console.log(result, "login data");
      setLoading(false);
      toast.success(result.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="!px-5 lg:!px-0">
      <div className="!w-full !max-w-[570px] !mx-auto rounded-lg shadow-md md:!p-10 !mt-10">
        <h3 className="text-black text-[22px] leading-9 font-bold !mb-10 text-center">
          Hello! <span className="text-blue-500">Welcom</span> Back
        </h3>

        <form action="" className="!py-4 md:!py-0" onSubmit={submitHandler}>
          <div className="!mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handelInputChange}
              className="!w-full  !py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer"
            />
          </div>
          <div className="!mb-5">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handelInputChange}
              className="!w-full !py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500  cursor-pointer"
            />
          </div>

          <div className="!mt-7">
            <button
              disabled={loading && true}
              className="!w-full bg-blue-500 text-white text-[18px] leading-[30px] rounded-lg !px-3 !py-2 cursor-pointer hover:bg-blue-600"
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Login"}
            </button>
          </div>

          <p className="!mt-5 text-gray-500 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-medium !ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
