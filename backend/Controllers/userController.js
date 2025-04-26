import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import Booking from "../models/BookingSchema.js";
import Doctors from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, phone, photo, gender,bloodType } = req.body;

  try {
    const updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (role) updatedData.role = role;
    if (phone) updatedData.phone = phone;
    if (photo) updatedData.photo = photo;
    if (gender) updatedData.gender = gender;
    if (bloodType) updatedData.bloodType = bloodType;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password -__v");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User successfully found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({}).select("-password -__v");

    if (!Users) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({
      success: true,
      message: "Users found",
      data: Users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: err.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get",
    });
  }
};

// export const getMyAppointments = async (req, res) => {
//   try {
//     const userId = req.user;
//     // الخطوة 1: استرجاع المواعيد الخاصة بالمستخدم
//     const bookings = await Booking.find({ user: userId });

//     // الخطوة 2: استخراج معرّفات الأطباء من الحجوزات
//     const doctorsId = bookings.map((el) => el.doctor.id);

//     // الخطوة 3: استرجاع بيانات الأطباء باستخدام معرّفاتهم
//     const doctors = await Doctors.find({ _id: { $in: doctorsId } }).select(
//       "-password"
//     );

//     res.status(200).json({
//       success: true,
//       message: "Appointments are getting",
//       data: doctors,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ succes: false, message: "Something went wrong, cannot get" });
//   }
// };

export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user;
    const bookings = await Booking.find({ user: userId }).populate({
      path: "doctor",
      select: "-password",
    });

    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: bookings,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
