import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ status: false, message: "User ID not found in request" });
    }

    let user = (await User.findById(userId)) || (await Doctor.findById(userId));

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ status: false, message: "You're not authorized" });
    }

    next();
  } catch (err) {
    console.error("Authorization error:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
