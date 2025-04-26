import { AiFillStar } from "react-icons/ai";
import { formateDate } from "../../utils/formateDate";
import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className="!mb-[50px]">
      <h4 className="text-[20px] leading-[30px] font-bold text-black !mb-[30px]">
        All reviews ({totalRating})
      </h4>

      {reviews?.map((review, index) => (
        <div key={index} className="flex justify-between gap-10 !mb-[30px]">
          <div className="flex gap-3">
            <figure className="!w-10 !h-10 ">
              <img src={review?.user?.photo} alt=" user" className="!w-full rounded-full" />
            </figure>

            <div>
              <h5 className="text-[16px] leading-6 text-sky-500 font-bold">
                {review?.user?.name}
              </h5>
              <p className="text-[14px] leading-6 text-gray-500">
                {formateDate(review?.createdAt)}
              </p>
              <p className="text-[18px] leading-[30px] text-textColor !mt-3 font-medium">
                {review?.reviewText}
              </p>
              <div className="flex gap-1 !mt-3">
                {[...Array(review?.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {showFeedbackForm ? (
        <FeedbackForm />
      ) : (
        <div className="text-center">
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="bg-blue-500 !py-[10px] !px-[30px] !rounded-[50px] text-white font-[600] !mt-[38px] cursor-pointer hover:bg-blue-600 transition-all duration-200"
          >
            Give Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default Feedback;




