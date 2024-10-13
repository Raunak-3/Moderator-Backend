import express from "express";
import { createArtistdev, getAllapprovedArtist, getAllonboardingRequest, getAllPendingArtist, getAllRejectedArtist, getOldArtists, getSingleApprovedRequest, getSingleOldArtist, getSinglePendingRequest, getSingleRejectRequest, markAsReviewed, updateProfileStatus } from "../controller/artist.js";

const router = express.Router();
//nested, read routes
router.post("/register",createArtistdev);
router.get("/onboardingRequest",getAllonboardingRequest);
router.get("/approved",getAllapprovedArtist);
router.get("/pending",getAllPendingArtist);
router.get("/rejected",getAllRejectedArtist);
router.get("/getOldArtist",getOldArtists);

//nested, dynamic, read routes
router.get("/pending/:artistId",getSinglePendingRequest)
router.get("/approved/:artistId",getSingleApprovedRequest);
router.get("/rejected/:artistId",getSingleRejectRequest);
router.get("/getOldArtist/:artistId",getSingleOldArtist);

//nested, create routes

//nested, dynamic , update routes
router.put("/:artistId/markAsReviewed",markAsReviewed);
router.put("/:artistId/status",updateProfileStatus);



export default router;