import express from "express";
import {
  lawyerGetAllApplications,
  userDeleteApplication,
  userGetAllApplications,
  postApplication,
  approveApplication, // ✅ Added approve function
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/lawyer/getall", isAuthenticated, lawyerGetAllApplications);
router.get("/user/getall", isAuthenticated, userGetAllApplications);
router.delete("/delete/:id", isAuthenticated, userDeleteApplication);

// ✅ New route to approve application (change status to "Completed")
router.put("/approve/:id", isAuthenticated, approveApplication);

export default router;
