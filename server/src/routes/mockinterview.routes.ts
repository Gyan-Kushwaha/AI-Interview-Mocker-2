import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createMockInterview,
  getMockInterviews,
  getMockInterviewById,
  editMockInterview,
  deleteMockInterview,
} from "../controllers/mockinterview.conrollers";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/mockinterviews",
  asyncHandler(authMiddleware),
  asyncHandler(createMockInterview)
);
router.get("/mockinterviews", asyncHandler(authMiddleware), getMockInterviews);
router.get(
  "/mockinterviews/:id",
  asyncHandler(authMiddleware),
  asyncHandler(getMockInterviewById)
);
router.put(
  "/mockinterviews/:id",
  asyncHandler(authMiddleware),
  asyncHandler(editMockInterview)
);
router.delete(
  "/mockinterviews/:id",
  asyncHandler(authMiddleware),
  asyncHandler(deleteMockInterview)
);

export default router;
