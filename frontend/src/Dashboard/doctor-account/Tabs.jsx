import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
  const {dispatch} = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () =>{
    dispatch({ type: 'LOGOUT'})
    navigate('/login')
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "appointments", label: "Appointments" },
    { id: "settings", label: "Profile" },
  ];

  return (
    <div className="!mt-10">
      {/* Menu icon for small screens */}
      <span className="lg:hidden">
        <BiMenu className="!w-6 !h-6 cursor-pointer" />
      </span>

      {/* Tabs for large screens */}
      <div className="hidden lg:flex flex-col !p-[30px] bg-white shadow-2xl items-center !h-max rounded-md">
        {tabs.map((item, index) => (
          <button
            key={index}
            onClick={() => setTab(item.id)}
            className={`!w-full rounded-md !py-[10px] !px-[30px] !mt-[10px] font-[600] transition-all duration-200
            ${
              tab === item.id
                ? "bg-indigo-100 text-blue-500 hover:bg-indigo-200 cursor-pointer"
                : "bg-transparent text-gray-800 hover:bg-gray-100 cursor-pointer"
            }`}
          >
            {item.label}
          </button>
        ))}
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
    </div>
  );
};

export default Tabs;
