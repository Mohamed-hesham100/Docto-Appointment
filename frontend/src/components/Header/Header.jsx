import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useRef, useEffect, useState, useContext } from "react";
import { authContext } from "../../context/AuthContext.jsx";
import useGetProfile from "../../hooks/useFetchData.jsx";

const navLinks = [
  { path: "/", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headRef = useRef(null);
  const menuRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, access_token } = useContext(authContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);

      // ✅ اغلاق القائمة في الموبايل لما المستخدم يسحب
      if (window.scrollY > 50) {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  return (
    <header
      className={`bg-gradient-to-b from-blue-50 via-cyan-100 to-blue-50 backdrop-blur-sm z-50 h-[90px] transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 w-full shadow-lg" : ""
      }`}
      ref={headRef}
    >
      <div className="container !mx-auto !px-6 sm:!px-15 !h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo (1).png" alt="logo" className="h-[40px]" />
          </Link>

          <nav className="hidden md:flex flex-1 justify-center" ref={menuRef}>
            <ul className="flex items-center gap-10">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-black border-b-2 border-black pb-[2px] text-lg font-semibold"
                        : "text-blue-500 hover:text-blue-700 text-lg font-medium"
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ✅ زر تسجيل الدخول أو صورة المستخدم */}
          <div className="flex items-center gap-4 md:flex !ml-4 md:!mr-5">
            {access_token && user ? (
              <Link
                to={`/${
                  user.role === "doctor"
                    ? "doctors/profile/me"
                    : "users/profile/me"
                }`}
                className="flex items-center gap-3"
              >
                <figure className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-sky-500 shadow-sm">
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                      N/A
                    </div>
                  )}
                </figure>

                <h2 className="text-[15px] leading-[30px] font-[500] text-black mt-[18px]">
                  <span className="font-bold text-[20px] text-blue-500">
                    Welcom :
                  </span>{" "}
                  {user?.name}
                </h2>
              </Link>
            ) : (
              <Link to="/login" className="!mr-3">
                <button className="bg-blue-500 text-white font-semibold w-[80px] h-[44px] flex items-center justify-center rounded-full shadow hover:bg-blue-700 transition cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* ✅ أيقونة القائمة في الموبايل */}
          <div className="md:hidden !ml-4">
            <BiMenu
              className="w-7 h-7 text-sky-600 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
        </div>

        {/* ✅ قائمة الموبايل */}
        <div
          ref={menuRef}
          className={`${
            showMenu ? "block" : "hidden"
          } md:hidden absolute top-[90px] left-0 w-full !h-50  bg-white shadow-md rounded-b-2xl py-6 px-8 transition-all duration-300`}
        >
          <ul onClick={closeMenu} className="flex flex-col gap-6 !ml-5">
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1 text-lg"
                      : "text-gray-700 hover:text-blue-600 font-medium text-lg"
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
            {!access_token && (
              <li>
                <Link
                  to="/login"
                  className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white rounded-full py-3 text-lg font-semibold mt-4 shadow-md transition"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
