import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unqiue: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
      lowercase: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { Timestamps: true }
);

// now using pre middleware so the passowrd first goes to the middleware for encrypting and then saving

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10); // 10 -> no. of rounds
  next();
});

// now injecting a method for checking the password

userSchema.methods.isPasswordCompare = async function (password) {
    return await bcrypt.compare(password , this.password)
}

//generating access tokens and refresh tokens , why two because refresh tokens is stored in the db whereas access token is not 

// sign -> payload , token , expire

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        fullname : this.fullname,
        username : this.username
    },
    
    process.env.JWT_ACCESS_TOKEN,
    {
        expiresIn : process.env.JWT_ACCESS_EXPIRY
    }
    )
}


userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this._id
    },
    process.env.JWT_REFRESH_TOKEN,
    {
        expiresIn: process.env.JWT_REFRESH_EXPIRY
    }
)
}

const User = mongoose.model("User", userSchema);
export default User