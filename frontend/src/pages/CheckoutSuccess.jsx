import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 !h-screen flex items-center justify-center">
      <div className="bg-white !p-6 md:!mx-auto rounded shadow-md">
        <svg
          viewBox="0 0 24 24"
          className="text-green-500 !w-16 !h-16 !mx-auto !my-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12l2 2l4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment done!
          </h3>
          <p className="text-gray-600 !my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="!py-6 text-center">
            <Link
              to="/"
              className="!px-12 !py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 rounded"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
