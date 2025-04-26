import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "./../../config.js";
import useFetchData from "./../../hooks/useFetchData.jsx";
import Loader from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };
  
  // Debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <>
      {/* Section: Hero + Search */}
      <section className="bg-[#fff9ea] !py-20">
        <div className="container text-center">
          <h2 className="heading text-[44px] leading-[54px] font-[700]">
            Find a Doctor
          </h2>

          <div className="!max-w-[570px] !mt-[30px] !mx-auto bg-[#00066ff2c] rounded-md flex overflow-hidden">
            <input
              type="search"
              placeholder="Search  doctors  by  name  or  specification..."
              className="!py-4 !pl-4 !pr-2 w-full bg-white focus:outline-none placeholder:text-gray-500 text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="!px-5 !py-3 bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Section: Doctor List */}
      <section>
        <div className="container">
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            <>
              <div className="!max-w-7xl !mx-auto !px-4">
                <div className="!grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 !gap-6 !mt-10">
                  {doctors.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section: Testimonials */}
      <section className="!py-10">
        <div className="container">
          <div className="xl:w-[470px] !mx-auto">
            <h2 className="heading text-[44px] leading-[54px] font-[700] text-center">
              What our patients say
            </h2>
            <p className="text-[18px] leading-[30px] font-[400] text-textColor !mt-[18px] text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
