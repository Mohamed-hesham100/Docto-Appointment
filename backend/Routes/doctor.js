import express from "express";
const router = express.Router();
import {
  updateDoctor,
  deleteDoctor,
  getDoctorById,
  getAllDoctors,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { isAuthenticated } from "../Middleware/verifyJWT.js";
import { restrict } from "../Middleware/authorization.js";
import reviewRouter from "../Routes/review.js";

// nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getDoctorById);
router.get("/", isAuthenticated, getAllDoctors);
router.put("/:id", isAuthenticated, restrict(["doctor"]), updateDoctor);
router.delete("/:id", isAuthenticated, restrict(["doctor"]), deleteDoctor);
router.get(
  "/profile/me",
  isAuthenticated,
  restrict(["doctor"]),
  getDoctorProfile
);

export default router;
