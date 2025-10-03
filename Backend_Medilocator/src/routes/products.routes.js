import express from "express";
import { addMedicine } from "../controllers/products.controller.js";

const router = express.Router();

router.post("/add", addMedicine);


export default router;
