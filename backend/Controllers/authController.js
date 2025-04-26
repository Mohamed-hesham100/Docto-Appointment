import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../Middleware/generateToken.js";

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    photo,
    gender,
    phone,
    ticketPrice,
    specialization,
    qualifications,
    experiences,
    bio,
    about,
    timeSlots,
    isApproved,
    averageRating,
    totalRating,
    appointments,
    bloodType
  } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    let user = null;

    if (role !== "patient" && role !== "doctor") {
      return res.status(400).json({
        success: false,
        message: "Role must be either 'patient' or 'doctor'",
      });
    }

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
        bloodType,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        phone,
        ticketPrice,
        specialization,
        qualifications,
        experiences,
        bio,
        about,
        timeSlots,
        role,
        isApproved: isApproved || "pending",
        averageRating,
        totalRating,
        appointments,

      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user exists in either User or Doctor collection
    const user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));

    // If user not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT access token
    const access_token = generateAccessToken(user);

    // Exclude sensitive data before sending the response
    const { password: userPassword, appointments, ...rest } = user._doc; // Here we rename the password field to avoid issues
    // Send successful login response
    return res.status(200).json({
      status: true,
      message: "Success fully logged in",
      data: rest,
      access_token,
    });
    

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to login. Try again later.",
      error: err.message,
    });
  }
};
