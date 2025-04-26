import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, access_token } from "../../config";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Rating & Review fields are required");
        return; // مهم توقف هنا
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setLoading(false);
      toast.success(result.message || "Review submitted successfully");

      // ممكن تنظف الحقول بعد النجاح
      setRating(0);
      setHover(0);
      setReviewText("");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <form action="">
      <div>
        <h3 className="text-black text-[16px] leading-6 font-semibold !mb-4">
          How would you you rate the overall expirence?*
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={` ${
                  index <= ((rating && hover) || hover)
                    ? "text-yellow-400"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[20px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="!mt-[30px]">
        <h3 className="text-black text-[16px] leading-6 font-semibold !mb-0">
          Share your feedback or suggestions*
        </h3>

        <textarea
          name=""
          id=""
          rows="5"
          placeholder="Write your message"
          className="border border-solid border-[#0066ff34] focus:outline outline-blue-500 !w-full !px-4 !py-3 rounded-md !mt-4"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 !py-[10px] !px-[30px] rounded-[50px] text-white font-[600] !mt-[38px] cursor-pointer hover:bg-blue-600"
        onClick={handleSubmitReview}
      >
        {loading ? <HashLoader size={25} color="#fff" /> : "Submit feedback"}
      </button>
    </form>
  );
};
export default FeedbackForm;
