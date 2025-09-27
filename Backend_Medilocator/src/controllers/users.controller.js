import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req, res, next) => {
    res.status(200).json({
        message: "ok"
    })
})

export {registerUser};