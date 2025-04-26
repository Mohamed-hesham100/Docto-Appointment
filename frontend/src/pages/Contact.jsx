const Contact = () => {
  return (
    <section>
      <div className="!px-4 !mx-auto !max-w-screen-md !mt-10">
        <h2 className="heading text-center text-[44px] leading-[54px] font-[700] text-black">
          Contact <span className="text-blue-500"> Us</span>
        </h2>

        <p className="!mb-8 lg:!mb-16 font-light text-center text-[18px] leading-[30px] text-gray-500 !mt-[18px]">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>

        <form action="#" className="!space-y-8">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full !px-4 !py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer !mt-1 rounded-lg"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full !px-4 !py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer !mt-1 rounded-lg"
              placeholder="Enter your subject"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="text-gray-500 font-semibold text-[16px] leading-7 !mb-2 block"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows="6"
              className="w-full !px-4 !py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-blue-500 text-[16px] leading-7 text-gray-900 placeholder:text-gray-500 cursor-pointer !mt-1 rounded-lg resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-start">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium !px-6 !py-3 rounded-lg text-[18px] leading-[30px] transition-colors duration-300 cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
