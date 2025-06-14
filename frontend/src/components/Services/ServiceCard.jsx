import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const ServiceCard = ({ name, desc, bgColor, textColor, index }) => {
  return (
    <div className="!py-[30px] !px-3 lg:!px-5">
      <h2 className="text-[26px] leading-9 font-[700]">{name}</h2>
      <p className="text-[16px] leading-7 font-[400] !mt-4 text-black/70">
        {desc}
      </p>

      <div className="flex items-center justify-between !mt-[30px]">
        {/* السهم في الجنب الشمال */}
        <Link
          to="/doctors"
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-blue-600 hover:border-none !mr-50"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
        {/* الرقم في الجنب اليمين */}
        <span
          className="w-[44px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600]"
          style={{
            background: `${bgColor}`,
            color: `${textColor}`,
            borderRadius: "6px 0 0 6px",
          }}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
