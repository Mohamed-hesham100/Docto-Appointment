import { Link } from "react-router-dom";

const About = () => {
    return (
      <section>
        <div className="container">
          <div className="flex justify-between flex-col lg:flex-row gap-[50px] lg:gap-[130px] xl:gap-0 lg:!ml-20 !ml-5">
            {/* ==== about image ==== */}
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
              <img src="images/about.png" alt="About" />
              <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[30%] md:right-[-7%] lg:right-[22%]">
                <img src="images/about-card.png" alt="About Card" />
              </div>
            </div>
  
            {/* ==== about content ==== */}
            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 !mr-20">

              <h2 className="heading text-[44px] leading-[54px] font-[700] ">
                Proud to be one of the nation's best
              </h2>
  
              <p className="text-[18px] leading-[30px] font-[400] !mt-[18px]">
                Book your appointment with top doctors in just a few clicks! Our platform makes it easy to find trusted specialists, view their available slots, and confirm your visit — all from the comfort of your home.
              </p>
  
              <p className="text-[18px] leading-[30px] font-[400] !mt-[18px]">
                We are committed to delivering the best healthcare experience through a seamless booking system, helping patients connect with qualified professionals anytime, anywhere.
              </p>

              <Link><button className="btn bg-blue-500 !py-[10px] !px-[30px] !rounded-[50px] text-white font-[600] !mt-[38px] cursor-pointer">Learn More</button></Link>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  