import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/about";
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial"
const Home = () => {
  return (
    <>
      {/*===== hero section ====== */}
      <section className="hero__section pt-[60px] 2xl:h-[800px] bg-gradient-to-b from-blue-50 via-cyan-100 to-blue-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-start justify-between md:!ml-[100px] !ml-10">
            {/* ====== hero content ====== */}
            <div className="w-full lg:w-[570px] ml-[10px] md:ml-[30px] !mt-10">
              <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                We help patients live a healthy, longer life.
              </h1>

              <p className="text-[18px] leading-[30px] font-[400] text-textColor !mt-[18px]">
                Our platform connects you with expert doctors and healthcare
                providers to give you the best care possible — anytime,
                anywhere.
              </p>

              <button className="bg-blue-500 hover:bg-blue-700 !py-[6px] !px-[15px] !rounded-[50px] !text-white !font-[600] !mt-[20px] cursor-pointer">
                Request an Appointment
              </button>
              <div className=" lg:mt-[70px] flex flex-row lg:flex-row lg:items-center gap-5 lg:gap-[30px] !mt-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] font-[700] text-black">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellow-300 rounded-full block !mt-[-14px]"></span>
                  <p className="text-[18px] leading-[30px] font-[400] text-textColor !mt-[10px]">
                    Years of Experience
                  </p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] font-[700] text-black">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purple-500 rounded-full block !mt-[-14px]"></span>
                  <p className="text-[18px] leading-[30px] font-[400] text-textColor !mt-[10px]">
                    Clinic Location
                  </p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] font-[700] text-black">
                    100+
                  </h2>
                  <span className="w-[100px] h-2 bg-green-500 rounded-full block !mt-[-14px]"></span>
                  <p className="text-[18px] leading-[30px] font-[400] text-textColor !mt-[10px]">
                    Years of Experience
                  </p>
                </div>
              </div>
            </div>

            {/* ====== hero image ====== */}
            <div className="w-full lg:w-[50%] flex justify-start items-center !mt-20">
              <div className="flex flex-row gap-4  ">
                {/* صورة واحدة كبيرة في الجهة اليمنى */}
                <div className="w-full lg:w-[300px] lg:h-[410px] rounded-xl shadow-xl overflow-hidden !mt-[-30px]">
                  <img
                    className="w-full h-full object-cover"
                    src="images/doctor-img01.png"
                    alt="doctor"
                  />
                </div>

                {/* صورتين صغيرتين بجانب بعض في الجهة اليسرى */}
                <div className="flex flex-col gap-4">
                  <div className="w-full sm:w-[200px] h-[200px] rounded-xl shadow-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="images/doctor-img02.png"
                      alt="doctor"
                    />
                  </div>
                  <div className="w-full sm:w-[200px] h-[200px] rounded-xl shadow-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="images/doctor-img03.png"
                      alt="doctor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="!py-40">
        <div className="container">
          <div className="max-w-[470px] w-full !mx-auto !mt-5 !text-center !px-4">
            <h2 className="text-[30px] md:text-[45px] leading-[40px] md:leading-[54px] font-[700] text-black">
              Providing the best medical services
            </h2>
            <p className="text-[16px] md:text-[18px] font-[400] leading-[28px] md:leading-[30px] !mt-[18px]">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>

          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] !mt-[30px] lg:!mt-[55px] ">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDfZj2gYNmhL3KKq8K8XmW-pG_0YXbKb3qVg&s"
                  alt=""
                />
              </div>
              <div className="!mt-[30px]">
                <h2 className="text-[26px] leading-9 text-black !ml-40">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-gray-500 font-[400] !mt-4 text-center">
                  world-classfor everyone. Our health System offers urmatched,
                  expert health care. Fromlap to the clinic
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] !mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-600 hover:border-none !ml-50 "
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src="images/icon02.png" alt="" />
              </div>
              <div className="!mt-[30px]">
                <h2 className="text-[26px] leading-9 text-black !ml-40">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-gray-500 font-[400] !mt-4 text-center">
                  world-classfor everyone. Our health System offers urmatched,
                  expert health care. Fromlap to the clinic
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] !mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-600 hover:border-none !ml-50 "
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src="images/icon03.png" alt="" />
              </div>
              <div className="!mt-[30px]">
                <h2 className="text-[26px] leading-9 text-black !ml-40">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-gray-500 font-[400] !mt-4 text-center">
                  world-classfor everyone. Our health System offers urmatched,
                  expert health care. Fromlap to the clinic
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] !mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-600 hover:border-none !ml-50 "
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== about section star =======*/}
      <About />

      {/* ===== services section ===== */}
      <section>
        <div className="xl:w-[470px] md:!mx-auto !mt-40 ">
          <h2 className="heading text-[44px] leading-[54px] font-[700] ">
            Our medical services
          </h2>
          <p className="text-[18px] leading-[30px] font-[400] !mt-[18px] !text-center">
            World-class care for everyone. Our health System offers unmatched
            export health care
          </p>
        </div>
        <ServiceList />
      </section>

      {/* ====== Feature Section ====== */}
      <section className="!py-12 lg:!py-20">
        <div className="!max-w-7xl !mx-auto !px-6">
          <div className="!flex !flex-col lg:!flex-row !items-center !justify-center !gap-12 lg:!gap-16">
            {/* ====== Text Content ====== */}
            <div className="!w-full lg:!w-1/2 !text-center lg:!text-left">
              <h2 className="!text-[28px] sm:!text-[36px] lg:!text-[44px] !leading-[38px] sm:!leading-[46px] lg:!leading-[54px] !font-[700] !mb-6">
                Get virtual treatment <br /> anytime, anywhere.
              </h2>

              <ul className="!pl-5 !text-[16px] sm:!text-[18px] !leading-[28px] sm:!leading-[30px] !font-[400] !space-y-4 !mb-8 !text-left">
                <li>1. Schedule your appointment directly online.</li>
                <li>2. Choose between video or audio consultation.</li>
                <li>3. Connect with certified doctors from your home.</li>
                <li>4. Receive prescriptions and follow-ups digitally.</li>
              </ul>

              <Link to="#">
                <button className="!bg-blue-500 hover:!bg-blue-700 !py-2 !px-6 !rounded-full !text-white !font-[600] !transition">
                  Learn More
                </button>
              </Link>
            </div>

            {/* ====== Feature Image Section ====== */}
            <div className="!w-full lg:!w-1/2 !relative !flex !justify-center">
              <img
                src="/images/feature-img.png"
                alt="feature"
                className="!w-full !max-w-[500px] sm:!max-w-[600px]"
              />

              {/* ====== Floating Video Icon Box ====== */}
              <div className="!absolute !bottom-6 !left-0 sm:!bottom-12 sm:!left-0 !bg-white !w-[200px] sm:!w-[220px] lg:!w-[248px] !p-4 !z-20">
                <div className="!flex !items-center !justify-between !mb-3">
                  {/* Text */}
                  <div className="!text-left">
                    <p className="!text-sm !text-gray-700 !font-medium">
                      Tue, 24
                    </p>
                    <p className="!text-sm !text-gray-500">10:00 AM</p>
                  </div>

                  {/* Icon */}
                  <div className="!w-8 !h-8 !bg-yellow-300 !flex !items-center !justify-center !rounded">
                    <img
                      src="/images/video-icon.png"
                      alt="video-icon"
                      className="!w-4 !h-4"
                    />
                  </div>
                </div>

                {/* Consultation Tag */}
                <div className="!bg-[#ccf0f3] !text-teal-500 !font-semibold !text-sm !px-4 !py-1 !rounded-full !w-fit !mb-3">
                  Consultation
                </div>

                {/* Doctor Info */}
                <div className="!flex !items-center !gap-3">
                  <img
                    src="/images/avatar-icon.png"
                    alt="avatar-icon"
                    className="!w-8 !h-8 !rounded-full"
                  />
                  <h4 className="!text-sm !font-bold !text-black">
                    Wayne Collines
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== our great doctors */}

      <sections>
        <div className="container">
          <div className="xl:!w-[470px] !mx-auto ">
            <h2 className="heading text-[44px] leading-[54px] font-[700] text-center ">
              Our great doctors
            </h2>
            <p className="text-[18px] leading-[30px] font-[400] !mt-[18px] text-center">
              World-class care for everyone. Our health System offers unmatched,
              expoert health care.
            </p>
          </div>

          <DoctorList />
        </div>
      </sections>

      <section className="!py-10">
        <div className="container !mx-auto !px-20 !mt-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* ! Left Image */}
            <div className="md:w-1/2 flex justify-center ">
              <img src="/images/faq-img.png" alt="faq-img" className="" />
            </div>

            {/* ! Right FAQs */}
            <div className="md:w-1/2">
              <h2 className="heading text-[32px] md:text-[44px] leading-[42px] md:leading-[54px] font-[700] !mb-8 md:text-center  lg:!ml-10">
                Most asked questions by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/* ======= testimonial ======= */}

      <section className="!py-10">
        <div className="container">
          <div className="xl:w-[470px] !mx-auto">
            <h2 className="heading text-[44px] leading-[54px] font-[700] text-center">
              What our patient say
            </h2>
            <p className="text-[18px] leading-[30px] font-[400] text-textColor !mt-[18px] text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care
            </p>
          </div>
          <Testimonial/>
        </div>
      </section>
    </>
  );
};

export default Home;
