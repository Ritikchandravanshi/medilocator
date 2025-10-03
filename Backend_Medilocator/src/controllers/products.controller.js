import { ProductCatalog } from "../models/productCatalog.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add a new product to catalog

const addMedicine = asyncHandler(async (req, res) => {
  const { name, brand, category, dosageForm, packSize, description, genericName, manufacturer, requiresPrescription } = req.body;
  const existedMedcine = await ProductCatalog.findOne({name, brand, genericName});

  //check if medicine is already added
  if (existedMedcine) {
    throw new ApiError(409, "The medicine is already added")
  }

  //add medicine if noot exists
  const newMedicine = new ProductCatalog({
    name,
    brand,
    category,
    dosageForm,
    packSize,
    description,
    genericName,
    manufacturer,
    requiresPrescription
  })

  if (!newMedicine) {
    throw new ApiError(400, "Something went wrong while adding medicine")
  }

  await newMedicine.save();
  return res.status(200).json(
    new ApiResponse(200, newMedicine, "Medicine added successfully")
  )
})

export { addMedicine }