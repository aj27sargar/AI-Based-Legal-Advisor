import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    Lawyer: {
        type: String,
        required: [true, "Please provide a title."],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title."],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
    },
    description: {
        type: String,
        required: [true, "Please provide description."],
        minLength: [10, "Description must contain at least 10 Characters!"],
        maxLength: [500, "Description cannot exceed 500 Characters!"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category."],
    },
    country: {
        type: String,
        required: [true, "Please provide a country name."],
    },
    city: {
        type: String,
        required: [true, "Please provide a city name."],
    },

    validityType: {
        type: String,
        enum: ["Fixed Validity", "Ranged Validity"],
        default: "Fixed Validity",
    },
    fixedValidity: {
        type: String,
        maxLength: [20, "Fixed Validity cannot exceed 20 characters"],
    },
    validityFrom: {
        type: String,
    },
    validityTo: {
        type: String,
    },

    expired: {
        type: Boolean,
        default: false,
    },
    documentPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Document = mongoose.model("Document", documentSchema); 