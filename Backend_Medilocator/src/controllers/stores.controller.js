import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Store } from "../models/store.models.js";

const generateAccessAndRefreshTokens = async(storeId) => {
   try {
      const store = await Store.findById(storeId)        //find the user in db
      const accessToken = store.generateAccessToken()  //generate accessToken the method is written in models
      const refreshToken = store.generateRefreshToken() //generate refreshToken used to get new access token after expired
      
      store.refreshToken = refreshToken
      await store.save({ validateBeforeSave: false })     //stores refreshToken in db without validation

      return {accessToken, refreshToken}      //return acccess and refreshTokens

   } catch (error) {
      throw new ApiError(500, "Something went wrong while generating access and refresh token")
   }
}

const registerStore = asyncHandler(async(req, res) => {
    const{ storeName,address, email, contactNo, licenseNumber, password} = req.body

    if(!storeName || !address || !email || !contactNo || !licenseNumber || !password){
        throw new ApiError(400, "All fields are required")
    }

    const existedStore = await Store.findOne({
        $or: [{ email }, { contactNo }]
    })

    if(existedStore){
        throw new ApiError(400, "Store is already registered")
    }

    const store = await Store.create({
        storeName,
        address,
        email,
        contactNo,
        licenseNumber,
        password
    })

    const createdStore = await Store.findById(store._id).select(
        "-password -refreshToken"
    )

    if(!createdStore){
        throw new ApiError(500, "Something went wrong while registering Store")
    }

    return res.status(200).json(
        new ApiResponse(200, createdStore, "Store registered successfully")
    )
})

const loginStore = asyncHandler(async (req, res) => {
  const { email, contactNo, password } = req.body;

  if (!(email || contactNo)) {
    throw new ApiError(400, "Email or Contact No. is required field");
  }

  const store = await Store.findOne({
    $or: [{ email }, { contactNo }]
  });

  if (!store) {
    throw new ApiError(404, "Store doesn't exist");
  }

  const isPasswordValid = await store.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Store credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(store._id);

  const loggedInStore = await Store.findById(store._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { store: loggedInStore, accessToken, refreshToken },
        "Store logged in successfully"
      )
    );
});


export {registerStore ,loginStore}