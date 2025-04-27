import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Document } from "../models/documentSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }

  const {
    name,
    email,
    documentPurpose,
    phone,
    address,
    documentId,
    aadharNumber,
    panNumber,
    gender,
    birthDate,
    drivingLicense
  } = req.body;

  console.log("Received documentId:", documentId);

  const applicantID = {
    user: req.user._id,
    role: "Document Seeker",
  };

  if (!documentId) {
    console.log("Document ID is missing in request body");
    return next(new ErrorHandler("Document not found!", 404));
  }

  const documentDetails = await Document.findById(documentId);
  if (!documentDetails) {
    console.log("Document not found in database with ID:", documentId);
    return next(new ErrorHandler("Document not found!", 404));
  }

  const employerID = {
    user: documentDetails.postedBy,
    role: "Employer",
  };

  if (
    !name ||
    !email ||
    !documentPurpose ||
    !phone ||
    !address ||
    !aadharNumber ||
    !panNumber ||
    !gender ||
    !birthDate ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all required fields.", 400));
  }

  const application = await Application.create({
    name,
    email,
    documentPurpose,
    phone,
    address,
    aadharNumber,
    panNumber,
    gender,
    birthDate,
    drivingLicense,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    status: "Pending",
  });

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

export const lawyerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Document Seeker") {
      return next(
        new ErrorHandler("Document Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const userGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const userDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);

// ✅ Lawyer Updates Application Status (Changes status to "Completed" or "Rejected")
export const approveApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // ✅ Allow only Lawyers to update application status
  if (role === "Employer") {
    return next(new ErrorHandler("Only Lawyers can update application status.", 403));
  }

  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Completed", "Rejected"].includes(status)) {
    return next(new ErrorHandler("Invalid status. Must be either 'Completed' or 'Rejected'.", 400));
  }

  const application = await Application.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  // Check if the application belongs to the current lawyer
  if (application.employerID.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You can only update applications for your documents.", 403));
  }

  // ✅ Update status
  application.status = status;
  await application.save();

  res.status(200).json({
    success: true,
    message: `Application ${status.toLowerCase()} successfully`,
    application,
  });
});

export const updateApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Lawyer") {
    return next(
      new ErrorHandler("Lawyer not allowed to update applications.", 400)
    );
  }

  const { id } = req.params;
  const {
    name,
    email,
    phone,
    address,
    documentPurpose,
    aadharNumber,
    panNumber,
    gender,
    birthDate,
    drivingLicense
  } = req.body;

  if (!name || !email || !phone || !address || !documentPurpose ||
    !aadharNumber || !panNumber || !gender || !birthDate) {
    return next(new ErrorHandler("Please fill all required fields.", 400));
  }

  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  // Check if the application belongs to the current user
  if (application.applicantID.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You can only update your own applications.", 403));
  }

  // Update the application
  application.name = name;
  application.email = email;
  application.phone = phone;
  application.address = address;
  application.documentPurpose = documentPurpose;
  application.aadharNumber = aadharNumber;
  application.panNumber = panNumber;
  application.gender = gender;
  application.birthDate = birthDate;
  application.drivingLicense = drivingLicense;

  await application.save();

  res.status(200).json({
    success: true,
    message: "Application updated successfully!",
    application,
  });
});
