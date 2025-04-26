import express from "express"; 
const router = express.Router({ mergeParams: true});

import { getAllReviews, createReview } from "../Controllers/reviewController.js"; 

import { isAuthenticated } from "../Middleware/verifyJWT.js";
import { restrict } from "../Middleware/authorization.js"; 

router.get("/", getAllReviews);

router.post("/", isAuthenticated, restrict(["patient", "doctor"]), createReview);

export default router;
