import express from "express";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";

import { isAuthenticated } from "../Middleware/verifyJWT.js";
import { restrict } from "../Middleware/authorization.js";

router.get("/:id", isAuthenticated, restrict(["patient"]), getUserById);
router.get("/", isAuthenticated, restrict(["admin"]), getAllUsers);
router.put("/:id", isAuthenticated, restrict(["patient"]), updateUser);
router.delete("/:id", isAuthenticated, restrict(["patient"]), deleteUser);
router.get(
  "/profile/me",
  isAuthenticated,
  restrict(["patient"]),
  getUserProfile
);
router.get(
  "/appointments/my-appointments",
  isAuthenticated,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
