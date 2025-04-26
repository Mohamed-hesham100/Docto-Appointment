import express from "express";
const router = express.Router();
import { isAuthenticated } from "../Middleware/verifyJWT.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

router.post("/checkout-session/:doctorId", isAuthenticated, getCheckoutSession);

export default router;
