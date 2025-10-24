import { Router } from "express";
import { getUser, loginUser, logout, signIn } from "../controllers/user-controller";
import { authontick}  from "../middilwer/authontication";
const router = Router();

// routes
router.post("/userCreate", signIn);
router.post("/loginUser", loginUser);
router.get("/get", authontick, getUser);
router.post("/logout", logout);

export default router;
