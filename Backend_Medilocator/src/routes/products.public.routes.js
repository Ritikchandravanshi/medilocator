// Filename: src/routes/products.public.routes.js
import { Router } from "express";
import {
  searchProducts,
  getAllProducts,
  getProductById
} from "../controllers/productCatalog.controller.js"; // Re-using your existing controller

const router = Router();

// PUBLIC routes, no auth required
router.route("/search").get(searchProducts);
router.route("/").get(getAllProducts);
router.route("/:productId").get(getProductById);

export default router;