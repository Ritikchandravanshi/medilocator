import { StoreInventory } from "../models/inventory.models.js";
import { ProductCatalog } from "../models/productCatalog.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProductToInventory = asyncHandler(async (req, res) => {
  const { productId, price, stockQuantity, expiryDate, batchNumber, minStockAlert } = req.body;

  if (!productId || !price || !stockQuantity || !expiryDate) {
    throw new ApiError(400, "Product ID, price, stock quantity, and expiry date are required");
  }

  // Check if product exists in catalog
  const product = await ProductCatalog.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found in catalog");
  }

  // Check if product already exists in store inventory
  const existingInventory = await StoreInventory.findOne({
    store: req.store._id,
    product: productId
  });

  if (existingInventory) {
    throw new ApiError(409, "Product already exists in your inventory. Use update endpoint to modify.");
  }

  // Create inventory item
  const inventory = await StoreInventory.create({
    store: req.store._id,
    product: productId,
    price,
    stockQuantity,
    expiryDate,
    batchNumber: batchNumber || "",
    minStockAlert: minStockAlert || 10
  });

  const populatedInventory = await StoreInventory.findById(inventory._id).populate("product");

  return res
    .status(201)
    .json(new ApiResponse(201, populatedInventory, "Product added to inventory successfully"));
});

const getStoreInventory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, category, search, sortBy = "createdAt", order = "desc" } = req.query;

  const matchStage = { store: req.store._id };

  // Build aggregation pipeline
  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "productcatalogs",
        localField: "product",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" }
  ];

  // Add category filter
  if (category) {
    pipeline.push({
      $match: { "product.category": category }
    });
  }

  // Add search filter
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { "product.name": { $regex: search, $options: "i" } },
          { "product.brand": { $regex: search, $options: "i" } },
          { "product.genericName": { $regex: search, $options: "i" } }
        ]
      }
    });
  }

  // Add sorting
  const sortOrder = order === "desc" ? -1 : 1;
  pipeline.push({ $sort: { [sortBy]: sortOrder } });

  // Count total documents
  const countPipeline = [...pipeline, { $count: "total" }];
  const countResult = await StoreInventory.aggregate(countPipeline);
  const total = countResult.length > 0 ? countResult[0].total : 0;

  // Add pagination
  pipeline.push(
    { $skip: (parseInt(page) - 1) * parseInt(limit) },
    { $limit: parseInt(limit) }
  );

  const inventory = await StoreInventory.aggregate(pipeline);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        inventory,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      },
      "Inventory fetched successfully"
    )
  );
});

const updateInventoryItem = asyncHandler(async (req, res) => {
  const { inventoryId } = req.params;
  const { price, stockQuantity, expiryDate, batchNumber, minStockAlert, isAvailable } = req.body;

  const inventory = await StoreInventory.findOne({
    _id: inventoryId,
    store: req.store._id
  });

  if (!inventory) {
    throw new ApiError(404, "Inventory item not found");
  }

  // Update fields
  if (price !== undefined) inventory.price = price;
  if (stockQuantity !== undefined) inventory.stockQuantity = stockQuantity;
  if (expiryDate !== undefined) inventory.expiryDate = expiryDate;
  if (batchNumber !== undefined) inventory.batchNumber = batchNumber;
  if (minStockAlert !== undefined) inventory.minStockAlert = minStockAlert;
  if (isAvailable !== undefined) inventory.isAvailable = isAvailable;

  await inventory.save();

  const updatedInventory = await StoreInventory.findById(inventoryId).populate("product");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedInventory, "Inventory updated successfully"));
});

const deleteInventoryItem = asyncHandler(async (req, res) => {
  const { inventoryId } = req.params;

  const inventory = await StoreInventory.findOneAndDelete({
    _id: inventoryId,
    store: req.store._id
  });

  if (!inventory) {
    throw new ApiError(404, "Inventory item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product removed from inventory successfully"));
});

const getInventoryStats = asyncHandler(async (req, res) => {
  const storeId = req.store._id;

  const stats = await StoreInventory.aggregate([
    { $match: { store: storeId } },
    {
      $facet: {
        totalProducts: [{ $count: "count" }],
        outOfStock: [
          { $match: { stockQuantity: 0 } },
          { $count: "count" }
        ],
        lowStock: [
          {
            $match: {
              $expr: { $lte: ["$stockQuantity", "$minStockAlert"] },
              stockQuantity: { $gt: 0 }
            }
          },
          { $count: "count" }
        ],
        expired: [
          { $match: { expiryDate: { $lt: new Date() } } },
          { $count: "count" }
        ],
        expiringSoon: [
          {
            $match: {
              expiryDate: {
                $gte: new Date(),
                $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              }
            }
          },
          { $count: "count" }
        ]
      }
    }
  ]);

  const result = {
    totalProducts: stats[0].totalProducts[0]?.count || 0,
    outOfStock: stats[0].outOfStock[0]?.count || 0,
    lowStock: stats[0].lowStock[0]?.count || 0,
    expired: stats[0].expired[0]?.count || 0,
    expiringSoon: stats[0].expiringSoon[0]?.count || 0
  };

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Inventory stats fetched successfully"));
});

const getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await StoreInventory.find({
    store: req.store._id,
    $expr: { $lte: ["$stockQuantity", "$minStockAlert"] },
    stockQuantity: { $gt: 0 }
  })
    .populate("product")
    .sort({ stockQuantity: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Low stock products fetched successfully"));
});

const getExpiredProducts = asyncHandler(async (req, res) => {
  const products = await StoreInventory.find({
    store: req.store._id,
    expiryDate: { $lt: new Date() }
  })
    .populate("product")
    .sort({ expiryDate: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Expired products fetched successfully"));
});

const getExpiringSoonProducts = asyncHandler(async (req, res) => {
  const products = await StoreInventory.find({
    store: req.store._id,
    expiryDate: {
      $gte: new Date(),
      $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  })
    .populate("product")
    .sort({ expiryDate: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Expiring soon products fetched successfully"));
});

export {
  addProductToInventory,
  getStoreInventory,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryStats,
  getLowStockProducts,
  getExpiredProducts,
  getExpiringSoonProducts
};
