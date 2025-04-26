import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

// Populate the user details before finding reviews
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-password",
  });
  next();
});


// Calculate average ratings and total reviews for the doctor
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    { $match: { doctor: doctorId } },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(doctorId, {
      averageRating: stats[0].avgRating,
      totalRating: stats[0].numOfRating,
    });
  } else {
    await Doctor.findByIdAndUpdate(doctorId, {
      averageRating: 0,
      totalReviews: 0,
    });
  }
};

export default mongoose.model("Review", reviewSchema);
