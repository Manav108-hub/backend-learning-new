import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

/*
    1. get the details from the user 
    2. validations
    3. check if the user exists
    4. check for images and avatar
    5. upload on cloudinary 
    6. create an object -> create entry in db
    7. remove password and refresh token fields from response 
    8. check for user creation , return res
*/

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, username } = req.body;
  // console.log("email : " , email);
  if (
    [fullname, email, password, username].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All the fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already existed");
  }

  // multer provides a files option
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user !"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created succussfully"));
});

//login controller

/*
    1. Take the details from the user
    2. check for empty -> validation
    3. check in the db 
    4. generate tokens
    5. if yes -> return succcess , if no -> return error
    6. return details with token
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (
    [email, password].some((field) => {
      !field?.trim();
    })
  ) {
    throw new ApiError(400, "Fields are empty");
  }

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found or credentials might be wrong");
  }

  const validPass = await existingUser.isPasswordCompare(password);
  if (!validPass) {
    throw new ApiError(401, "credentials are wrong");
  }

  const accessToken = existingUser.generateAccessToken();
  const refreshToken = existingUser.generateRefreshToken();

  existingUser.refreshToken = refreshToken;
  await existingUser.save({ validateBeforeSave: false }); // saving the refreshToken in the mongo DB

  res.status(200).json(
    new ApiResponse(
      200,
      {
        //response 
        user: {
          _id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        },
        accessToken,
      },
      "User logged in succussfully"
    )
  );
});
export { registerUser, loginUser };
