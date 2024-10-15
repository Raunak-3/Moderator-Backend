import express from "express";
import { getAllApprovedBrand, getAllNewBrand, getAllPendingBrand, getAllRejectedBrand, getApprovedRequest, getPendingRequest, getRejectedRequest, markAsReviewedBrand, registerBrand, updateProfileStatusBrand } from "../controller/brand.js";

const router = express.Router();


router.post("/register",registerBrand);

router.get("/newBrand",getAllNewBrand);
router.get("/approved",getAllApprovedBrand);
router.get("/pending",getAllPendingBrand);
router.get("/rejected",getAllRejectedBrand);

router.get("/pending/:brandId",getPendingRequest);
router.get("/approved/:brandId",getApprovedRequest);
router.get("/rejected/:brandId",getRejectedRequest);


router.put("/:brandId/markAsReviewed",markAsReviewedBrand);
router.put("/:brandId/status",updateProfileStatusBrand);


export default router;