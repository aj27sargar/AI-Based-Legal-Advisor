import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Document } from "../models/documentSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllDocuments = catchAsyncErrors(async (req, res, next) => {
    const documents = await Document.find({ expired: false });
    res.status(200).json({
        success: true,
        documents,
    });
});

export const postDocument = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Document Seeker") {
        return next(
            new ErrorHandler("Document Seeker not allowed to access this resource.", 400)
        );
    }

    const {
        Lawyer,
        title,
        description,
        category,
        country,
        city,
        fixedValidity,
        validityFrom,
        validityTo,
        validityType,
    } = req.body;

    // Validate required fields
    if (!Lawyer || !title || !description || !category || !country || !city) {
        return next(new ErrorHandler("Please provide all required document details.", 400));
    }

    // Validity type conditions
    if (validityType === "Fixed Validity" && !fixedValidity) {
        return next(new ErrorHandler("Please provide a fixed validity period.", 400));
    }

    if (validityType === "Ranged Validity" && (!validityFrom || !validityTo)) {
        return next(new ErrorHandler("Please provide both validity from and validity to.", 400));
    }

    if (validityFrom && validityTo && fixedValidity) {
        return next(
            new ErrorHandler("Cannot provide both fixed and ranged validity.", 400)
        );
    }

    const postedBy = req.user._id;

    const document = await Document.create({
        Lawyer,
        title,
        description,
        category,
        country,
        city,
        fixedValidity,
        validityFrom,
        validityTo,
        validityType,
        postedBy,
    });

    res.status(201).json({
        success: true,
        message: "Document posted successfully!",
        document,
    });
});

export const getMyDocuments = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Document Seeker") {
        return next(
            new ErrorHandler("Document Seeker not allowed to access this resource.", 400)
        );
    }

    const myDocuments = await Document.find({ postedBy: req.user._id });

    res.status(200).json({
        success: true,
        myDocuments,
    });
});

export const updateDocument = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Document Seeker") {
        return next(
            new ErrorHandler("Document Seeker not allowed to access this resource.", 400)
        );
    }

    const { id } = req.params;
    let document = await Document.findById(id);

    if (!document) {
        return next(new ErrorHandler("Document not found.", 404));
    }

    document = await Document.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Document updated successfully!",
    });
});

export const deleteDocument = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Document Seeker") {
        return next(
            new ErrorHandler("Document Seeker not allowed to access this resource.", 400)
        );
    }

    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
        return next(new ErrorHandler("Document not found.", 404));
    }

    await document.deleteOne();

    res.status(204).json({
        success: true,
        message: "Document deleted successfully!",
    });
});

export const getSingleDocument = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const document = await Document.findById(id);
        if (!document) {
            return next(new ErrorHandler("Document not found.", 404));
        }
        res.status(200).json({
            success: true,
            document,
        });
    } catch (error) {
        return next(new ErrorHandler("Invalid ID format or document not found.", 404));
    }
}); 