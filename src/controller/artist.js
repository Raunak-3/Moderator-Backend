import ErrorHandler from "../middlewares/error.js";
import moment from "moment";
import { Artist } from "../models/artist.js";
import { sendInitialEmailAndScheduleReminder } from "../services/emailService.js";

export const markAsReviewed = async (req, res, next) => {
  const { artistId } = req.params;

  const updatedArtist = await Artist.findByIdAndUpdate(
    artistId,
    { isReviewed: true },
    { new: true }
  );

  if (!updatedArtist) {
    return next(new ErrorHandler("Artist not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: {
      message: "Artist marked as reviewed",
      // artist: updatedArtist,
    },
  });
};
export const updateProfileStatus = async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const { status } = req.body; // either 'approved', 'pending', 'rejected'

    if (!["pending", "approved", "rejected"].includes(status)) {
      return next(new ErrorHandler("Invalid status", 400));
    }

    console.log("Updating artist", artistId, status);
    const updatedUser = await Artist.findByIdAndUpdate(
      artistId,
      { profileStatus: status },
      { new: true }
    );
    console.log("Updated user:", updatedUser);

    if (!updatedUser) {
      return next(new ErrorHandler("Artist not found", 404));
    }
    if (status === "approved") {
      if (!updatedUser.initialApprovalDate) {
        updatedUser.initialApprovalDate = new Date(); // Set only once
      }
      updatedUser.workStartDate = new Date(); // Set the start date to now if approved
    }
    await updatedUser.save();
    return res.status(200).json({
      success: true,
      data: {
        message: "profile status updated",
        artist: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleOldArtist = async (req, res, next) => {
  try {
    const { artistId } = req.params;

    const threeMonthsAgo = moment().subtract(3, "month").toDate();

    const artist = await Artist.find({
      _id: artistId,
      profileStatus: "approved",
      initialApprovalDate: { $lte: threeMonthsAgo }, // Artists approved before 3 months ago
    });

    if (!artist) {
      return next(
        new ErrorHandler("Old artist not found or does not meet criteria.", 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: {
        artist,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleRejectRequest = async (req, res, next) => {
  const { artistId } = req.params;

  try {
    const artist = await Artist.findOne({
      _id: artistId,
      profileStatus: "rejected",
    });
    if (!artist) {
      return next(new ErrorHandler("Rejected artist not found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        artist,
      },
    });
  } catch (error) {
    console.error("Error fetching rejected artist:", error);
    return next(new ErrorHandler("Error fetching rejected artist.", 500));
  }
};
export const getSingleApprovedRequest = async (req, res, next) => {
  const { artistId } = req.params;

  try {
    const artist = await Artist.findOne({
      _id: artistId,
      profileStatus: "approved",
    });
    if (!artist) {
      return next(new ErrorHandler("Approved artist not found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        artist,
      },
    });
  } catch (error) {
    console.error("Error fetching approved artist:", error);
    return next(new ErrorHandler("Error fetching approved artist.", 500));
  }
};
export const getSinglePendingRequest = async (req, res, next) => {
  const { artistId } = req.params;

  try {
    const artist = await Artist.findOne({
      _id: artistId,
      profileStatus: "pending",
      isReviewed: true,
    });
    if (!artist) {
      return next(new ErrorHandler("Pending artist not found.", 404));
    }
    //Now we will send the artist entire profile
    return res.status(200).json({
      success: true,
      data: {
        artist,
      },
    });
  } catch (error) {
    console.error("Error fetching pending artist:", error);
    return next(new ErrorHandler("Error fetching pending artist.", 500));
  }
};

export const getOldArtists = async (req, res, next) => {
  try {
    const threeMonthsAgo = moment().subtract(3, "month").toDate();

    const oldArtists = await Artist.find({
      profileStatus: "approved",
      initialApprovalDate: { $lte: threeMonthsAgo }, // Artists approved before 3 months ago
    });

    if (!oldArtists.length) {
      return next(new ErrorHandler("No old artists found.", 404));
    }

    return res.status(200).json({
      success: true,
      data: { oldArtists },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRejectedArtist = async (req, res, next) => {
  try {
    const rejectedArtists = await Artist.find({ profileStatus: "rejected" });
    if (!rejectedArtists.length) {
      return next(new ErrorHandler("No rejected artists found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        rejectedArtists,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(`Error fetching rejected artists:`, 404));
  }
};
export const getAllPendingArtist = async (req, res, next) => {
  try {
    const pendingArtists = await Artist.find({
      profileStatus: "pending",
      isReviewed: true,
    });
    if (!pendingArtists.length) {
      return next(new ErrorHandler("No pending artists found.", 404));
    }
    //send glimpse of artist detail lists
    return res.status(200).json({
      success: true,
      data: {
        pendingArtists,
      },
    });
  } catch (error) {
    return next(
      new ErrorHandler("Server error while fetching pending artists.", 404)
    );
  }
};
export const getAllapprovedArtist = async (req, res, next) => {
  try {
    const approvedArtists = await Artist.find({ profileStatus: "approved" });
    if (!approvedArtists.length) {
      return next(new ErrorHandler("No approved artists found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        approvedArtists,
      },
    });
  } catch (error) {
    return next(
      new ErrorHandler("Server error while fetching approved artists.", 500)
    );
  }
};
export const getAllonboardingRequest = async (req, res, next) => {
  try {
    const newRequests = await Artist.find({
      isReviewed: false,
    });
    if (!newRequests.length) {
      return next(new ErrorHandler("No new artists found.", 404));
    }
    return res.status(200).json({
      success: true,
      count: newRequests.length,
      data: newRequests.map((artist) => ({
        _id: artist._id,
        fullname: artist.artistName,
        skills: artist.skills,
        title: artist.title,
        requesttime: artist.requestDate,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const createArtistdev = async (req, res, next) => {
  const { artistName, artistEmail } = req.body;
  try {
    const user = await Artist.findOne({ artistEmail });
    if (user) {
      return next(new ErrorHandler("Artist already exit", 409));
    }
    const newArtist = await Artist.create({
      artistName,
      artistEmail,
    });
    // await sendInitialEmailAndScheduleReminder(newArtist);
    return res.status(201).json({
      success: true,
      data: newArtist,
    });
  } catch (e) {
    next(e);
  }
};
