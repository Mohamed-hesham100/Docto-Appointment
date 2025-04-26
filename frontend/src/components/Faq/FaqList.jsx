import faqs from "../../assets/data/faqs";
import FaqItem from "./FaqItem";

const FaqList = () => {
  return (
    <ul className="!max-w-2xl !mx-auto !px-5">
      {faqs.map((item, index) => (
        <FaqItem item={item} key={index} />
      ))}
    </ul>
  );
};

export default FaqList;
