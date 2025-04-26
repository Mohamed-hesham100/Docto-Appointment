import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const createReview = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const userId = req.user;

    const doctor = await Doctor.findById(doctorId).populate({
      path: "reviews",
    });

    if (!doctor) {
      return res
        .status(404)
        .json({ status: false, message: "Doctor not found" });
    }

    const review = new Review({
      doctor: doctorId,
      user: userId,
      rating: req.body.rating,
      reviewText: req.body.reviewText || "",
    });

    const savedReview = await review.save();

    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { reviews: savedReview._id },
    });

    // Calculate average ratings and update doctor details
    await Review.calcAverageRatings(doctorId);

    res.status(201).json({
      status: true,
      message: "Review added successfully",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// Controller for fetching all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ status: true, message: "Successful", data: reviews });
  } catch (err) {
    res
      .status(404)
      .json({ status: false, message: "Not found Reviews", error: err });
  }
};
