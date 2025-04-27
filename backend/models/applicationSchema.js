import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  documentPurpose: {
    type: String,
    required: [true, "Please provide document purpose!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  aadharNumber: {
    type: String,
    required: [true, "Please enter your Aadhar Number!"],
    minLength: [12, "Aadhar number must be 12 digits!"],
    maxLength: [12, "Aadhar number must be 12 digits!"],
  },
  panNumber: {
    type: String,
    required: [true, "Please enter your PAN Number!"],
    minLength: [10, "PAN number must be 10 characters!"],
    maxLength: [10, "PAN number must be 10 characters!"],
  },
  gender: {
    type: String,
    required: [true, "Please select your Gender!"],
    enum: ["Male", "Female", "Other"],
  },
  birthDate: {
    type: Date,
    required: [true, "Please enter your Birth Date!"],
  },
  drivingLicense: {
    type: String,
    required: false,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Document Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Rejected"],
    default: "Pending",
  },
});

export const Application = mongoose.model("Application", applicationSchema);
