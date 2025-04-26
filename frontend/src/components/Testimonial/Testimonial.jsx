import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { HiStar } from "react-icons/hi";

import "swiper/css";
import "swiper/css/pagination";

const Testimonial = () => {
  return (
    <div className="!mt-[30px] lg:!mt-[55px] !flex !justify-center">
      <div className="!max-w-6xl !w-full !px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            780: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {[1, 2, 3, 4].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="!py-6 ">
                <div className="!flex !items-center !gap-4">
                  <img
                    src="/images/patient-avatar.png"
                    alt="patient-avatar"
                    className="!w-12 !h-12 !rounded-full"
                  />
                  <div>
                    <h2 className="!text-lg !font-semibold !text-black">
                      Muhibur Rahman
                    </h2>
                    <div className="!flex !items-center !gap-1 !text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className="!w-[18px] !h-5" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="des !text-gray-600 !text-base !leading-7 !mt-4">
                  "I have taken medical services from them. They treat very well
                  and provide the best medical care."
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
