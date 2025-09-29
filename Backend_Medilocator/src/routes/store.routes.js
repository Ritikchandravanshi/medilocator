import { Router } from "express";
import { loginStore, registerStore } from "../controllers/stores.controller.js";

const router = Router();

router.route("/register").post(registerStore)
router.route("/login").post(loginStore)

export default router;