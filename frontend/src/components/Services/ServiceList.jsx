import ServiceCard from "./ServiceCard";
import ServicesList from "../../assets/data/services";
const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] !mt-[30px] lg:!mt-[55px] lg:!mx-50">
      {ServicesList.map((item, index) => (
        <ServiceCard
          key={index}
          name={item.name}
          desc={item.desc}
          bgColor={item.bgColor}
          textColor={item.textColor}
          index={index}
        />
      ))}
    </div>
  );
};

export default ServiceList;
