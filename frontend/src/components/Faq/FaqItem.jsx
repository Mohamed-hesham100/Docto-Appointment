import { useState } from "react";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false); // ! Toggle open/close

  return (
    <li
      onClick={() => setIsOpen(!isOpen)}
      className="!p-3 lg:!p-5 rounded-[12px] border border-solid border-[#D9DCE2] !mb-5 cursor-pointer transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-5">
        {/* ! السؤال */}
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-medium">
          {item.question}
        </h4>

        {/* ! الأيقونة + أو - */}
        <span className="text-[24px] font-bold !text-red-500">
          {isOpen ? "-" : "+"}
        </span>
      </div>

      {/* ! الإجابة */}
      {isOpen && (
        <p className="!mt-3 text-[14px] lg:text-[16px] text-gray-600">
          {item.answer}
        </p>
      )}
    </li>
  );
};

export default FaqItem;
