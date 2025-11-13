import { Router } from "express";
import {
  addProductToInventory,
  getStoreInventory,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryStats,
  getLowStockProducts,
  getExpiredProducts,
  getExpiringSoonProducts
} from "../controllers/inventory.controller.js";
import { verifyStoreJWT } from "../middlewares/storeAuth.middleware.js";

const router = Router();

// All routes are protected
router.use(verifyStoreJWT);

router.route("/").post(addProductToInventory).get(getStoreInventory);
router.route("/stats").get(getInventoryStats);
router.route("/low-stock").get(getLowStockProducts);
router.route("/expired").get(getExpiredProducts);
router.route("/expiring-soon").get(getExpiringSoonProducts);
router.route("/:inventoryId").patch(updateInventoryItem).delete(deleteInventoryItem);

export default router;