import express from "express";
import {
    deleteDocument,
    getAllDocuments,
    getMyDocuments,
    getSingleDocument,
    postDocument,
    updateDocument,
} from "../controllers/documentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllDocuments);
router.post("/post", isAuthenticated, postDocument);
router.get("/getmydocuments", isAuthenticated, getMyDocuments);
router.put("/update/:id", isAuthenticated, updateDocument);
router.delete("/delete/:id", isAuthenticated, deleteDocument);
router.get("/:id", isAuthenticated, getSingleDocument);

export default router; 