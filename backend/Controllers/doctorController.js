import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import bcrypt from "bcryptjs";
export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const updateFields = { ...req.body };

  try {
    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(updateFields.password, salt);
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).select("-password");

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

export const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password -__v");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor successfully found",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Doctor not found",
      error: err.message,
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password -__v");
    } else {
      doctors = await Doctor.find({})
        .populate("reviews")
        .select("-password -__v");
    }

    if (!doctors) {
      return res
        .status(404)
        .json({ success: false, message: "No Doctors found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Doctors not found",
      error: err.message,
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.user;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "doctor Not Found" });
    }

    const { password, ...rest } = doctor._doc;

    const appointments = await Booking.find({ doctor: doctorId }).populate('user', 'photo email gender');

    res.status(200).json({
      success: true,
      message: "Doctor profile retrieved successfully",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get",
    });
  }
};

