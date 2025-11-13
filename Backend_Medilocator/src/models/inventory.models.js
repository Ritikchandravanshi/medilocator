import mongoose, { Schema } from "mongoose";

const storeInventorySchema = new Schema(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "ProductCatalog",
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      default: 0,
      min: [0, "Stock quantity cannot be negative"]
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
      index: true
    },
    batchNumber: {
      type: String,
      trim: true,
      default: ""
    },
    minStockAlert: {
      type: Number,
      default: 10,
      min: [0, "Minimum stock alert cannot be negative"]
    }
  },
  { 
    timestamps: true 
  }
);

// Compound index for unique product per store
storeInventorySchema.index({ store: 1, product: 1 }, { unique: true });

// Index for searching available products with stock
storeInventorySchema.index({ 
  isAvailable: 1, 
  stockQuantity: 1,
  expiryDate: 1 
});

// Virtual for checking if stock is low
storeInventorySchema.virtual('isLowStock').get(function() {
  return this.stockQuantity <= this.minStockAlert;
});

// Virtual for checking if product is expired
storeInventorySchema.virtual('isExpired').get(function() {
  return this.expiryDate < new Date();
});

// Virtual for checking if product is expiring soon (within 30 days)
storeInventorySchema.virtual('isExpiringSoon').get(function() {
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  return this.expiryDate <= thirtyDaysFromNow && !this.isExpired;
});

// Ensure virtuals are included when converting to JSON
storeInventorySchema.set('toJSON', { virtuals: true });
storeInventorySchema.set('toObject', { virtuals: true });

// Pre-save middleware to automatically update availability
storeInventorySchema.pre('save', function(next) {
  // Set isAvailable to false if out of stock or expired
  if (this.stockQuantity === 0 || this.expiryDate < new Date()) {
    this.isAvailable = false;
  }
  next();
});

export const StoreInventory = mongoose.model("StoreInventory", storeInventorySchema);