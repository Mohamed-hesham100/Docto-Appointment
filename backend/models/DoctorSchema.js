import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  // Basic login info
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Personal info
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: { type: String },

  // Doctor-specific fields
  specialization: { type: String },
  qualifications: {
    type: Array,
  },
  experiences: {
    type: Array,
  },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: {
    type: Array,
  },

  // Reviews & Ratings
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },

  // Approval status
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "approved",
  },

  // Appointments
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", DoctorSchema);
