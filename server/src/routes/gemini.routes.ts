import { GenerateDSAQuestions,GenerateCoreSubjectQuestions,GenerateTechStackQuestions } from "../controllers/gemini.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { Router } from "express";
const router = Router();

// Signup route

router.post("/generatedsa",asyncHandler(authMiddleware),asyncHandler(GenerateDSAQuestions));
router.post("/generatecore",asyncHandler(authMiddleware),asyncHandler(GenerateCoreSubjectQuestions));
router.post("/generatetech",asyncHandler(authMiddleware),asyncHandler(GenerateTechStackQuestions));
export default router;