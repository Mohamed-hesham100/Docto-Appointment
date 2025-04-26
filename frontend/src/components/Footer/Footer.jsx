import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
    icon: (
      <RiLinkedinFill size={24} className="group-hover:!text-white !w-4 !h-5" />
    ),
    url: "https://www.linkedin.com",
  },
  {
    icon: (
      <AiFillYoutube size={24} className="group-hover:!text-white !w-4 !h-5" />
    ),
    url: "https://www.youtube.com",
  },
  {
    icon: (
      <AiFillGithub size={24} className="group-hover:!text-white !w-4 !h-5" />
    ),
    url: "https://www.github.com",
  },
  {
    icon: (
      <AiOutlineInstagram
        size={24}
        className="group-hover:!text-white !w-4 !h-5"
      />
    ),
    url: "https://www.instagram.com",
  },
];

const navLinks = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Find a Doctor",
    path: "/doctors",
  },
  {
    display: "Services",
    path: "/services",
  },
  {
    display: "Contact",
    path: "/contact",
  },

  {
    display: "Find a Location",
    path: "/locations",
  },
];

const Footer = () => {

  return (
    <footer className="!pb-16 !pt-10  !mt-20">
      <div className="!mx-auto !max-w-screen-xl !px-4 md:!px-8">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          {/* Logo & Social */}
          <div>
            <img src="/images/logo (1).png" alt="logo" className="!w-32" />
            <p className="!text-[16px] !leading-7 !font-[400] !text-gray-500 !mt-4">
              Copyright {new Date().getFullYear()} Mohamed hesham hamed.
              All rights reserved.
            </p>
            <div className="flex items-center gap-3 !mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.url}
                  key={index}
                  className="!w-9 !h-9 !border !border-solid !border-[#181A1E] !rounded-full flex items-center justify-center group hover:!bg-blue-500 hover:!border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="!text-[20px] !leading-[30px] !font-[700] !mb-6 !text-black">
              Quick Links
            </h2>
            <ul>
              {navLinks.map((item, index) => (
                <li key={index} className="!mb-4">
                  <Link
                    className="!text-gray-700 hover:!text-blue-600"
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="!mt-8 md:!mt-0">
            <h2 className="!text-[20px] !font-semibold !text-gray-900 !mb-4">
              Contact Us
            </h2>
            <p className="!text-sm !text-gray-600 ">123 Main St, Cairo, Egypt</p>
            <p className="!text-sm !text-gray-600 !mt-5">Phone: +20 123 456 789</p>
            <p className="!text-sm !text-gray-600 !mt-5">
              Email: support@example.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
