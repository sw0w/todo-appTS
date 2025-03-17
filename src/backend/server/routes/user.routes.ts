import express from "express";
import authMW from "../middlewares/authmw";
import {
  loginUser,
  registerUser,
  getUser,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/:id", authMW, getUser);

export default router;
