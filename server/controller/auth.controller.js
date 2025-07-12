// import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
const googleAuth = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const { _id, email, fullName } = user;

  const accessToken = generateAccessToken({ _id, fullName, email });
  const refreshToken = generateRefreshToken({ _id, email });
  console.log("accessToken",accessToken);
  

  if (!accessToken || !refreshToken) {
    throw new ApiError(400, "Tokens not generated");
  }

  // Save tokens to DB (optional)
  await User.findByIdAndUpdate(_id, {refreshToken});

  // const cookieOptions = {
  //   httpOnly: true,
  //   secure: false, 
  //   sameSite: "Lax",
  // };
  const cookieOptions = {
     httpOnly: true, 
    secure: process.env.NODE_ENV == "production",
    // sameSite: process.env.NODE_ENV == "production" ? "None" : "Lax", 
    sameSite: "Lax", 
};


  return res
  .cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
  .cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
  .status(200)
  .json({ message: "Login successful" ,token:accessToken});

});


const logOut = asyncHandler(async (req, res) => {
  const { _id } = req.user;

    if (!_id) {
    throw new ApiError(401,"User not Fetched")
  }
  await User.findByIdAndUpdate(_id, { refreshToken: null });

  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .redirect(process.env.CORS_ORIGIN); 
});


const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
   if (!user) {
    throw new ApiError(401,"User not Fetched")
  }

  return res
    .status(200)
    .json(new ApiResponse(200,user,"User Fetched")); 
});





const failure = asyncHandler(async(req, res)=>{
    res.redirect(process.env.CORS_ORIGIN)
})


export { googleAuth ,failure,logOut,getCurrentUser};
