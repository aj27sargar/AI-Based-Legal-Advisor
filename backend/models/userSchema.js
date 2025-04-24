import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minlength: [3, "Name must contain at least 3 characters!"],
    maxlength: [30, "Name cannot exceed 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: String, // Changed to String for proper validation
    required: [true, "Please enter your Phone Number!"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number!"], // Ensures exactly 10 digits
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minlength: [4, "Password must contain at least 4 characters!"],
    maxlength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["User", "Lawyer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypting the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Fixed condition
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparing passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);






 
 
 
 
 
 
 
 
 
 
 
 
 // import mongoose from "mongoose";
  // import validator from "validator";
  // import bcrypt from "bcrypt";
  // import jwt from "jsonwebtoken";
  // const userSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: [true, "Please enter your Name!"],
  //     minLength: [3, "Name must contain at least 3 Characters!"],
  //     maxLength: [30, "Name cannot exceed 30 Characters!"],
  //   },
  //   email: {
  //     type: String,
  //     required: [true, "Please enter your Email!"],
  //     validate: [validator.isEmail, "Please provide a valid Email!"],
  //   },
  //   phone: {
  //     type: Number,
  //     required: [true, "Please enter your Phone Number!"],
  //     minLength: [10, "Please enter Correct Phone Number!"],
  //     maxLength: [30, "Name cannot exceed 30 Characters!"],
  //   },
  //   password: {
  //     type: String,
  //     required: [true, "Please provide a Password!"],
  //     minLength: [4, "Password must contain at least 4 characters!"],
  //     maxLength: [32, "Password cannot exceed 32 characters!"],
  //     select: false,
  //   },
  //   role: {
  //     type: String,
  //     required: [true, "Please select a role"],
  //     enum: ["User", "Lawyer"],
  //   },
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  // });


  // //ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
  // userSchema.pre("save", async function (next) {
  //   if (!this.isModified("password")) {
  //     next();
  //   }
  //   this.password = await bcrypt.hash(this.password, 10);
  // });

  // //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
  // userSchema.methods.comparePassword = async function (enteredPassword) {
  //   return await bcrypt.compare(enteredPassword, this.password);
  // };

  // //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
  // userSchema.methods.getJWTToken = function () {
  //   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
  //     expiresIn: process.env.JWT_EXPIRES,
  //   });
  // };

  // export const User = mongoose.model("User", userSchema);
