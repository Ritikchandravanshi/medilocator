import { Router } from "express";
import {
  searchProducts,
  getAllProducts,
  getProductById,
  addMedicine
} from "../controllers/productCatalog.controller.js";
import { verifyStoreJWT } from "../middlewares/storeAuth.middleware.js";

const router = Router();

// All routes are protected
router.use(verifyStoreJWT);

router.route("/search").get(searchProducts);
router.route("/").get(getAllProducts).post(addMedicine);
router.route("/:productId").get(getProductById);

export default router;