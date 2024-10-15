import ErrorHandler from "../middlewares/error.js";
import { Brand } from "../models/brand.js";
import { sendInitialEmailAndScheduleReminder } from "../services/emailService.js";

export const registerBrand = async (req, res, next) => {
  const {
    brandName,
    brandEmail,
    brandPassword,
    brandPhoneNumber,
    address,
    skillsRequired,
    payment,
  } = req.body;
  try {
    if (!brandName || !brandEmail || !brandPassword || !brandPhoneNumber) {
      return next(new ErrorHandler("Provide given fields", 400));
    }
    let brand;
    brand = await Brand.findOne({
      brandEmail,
    });
    if (brand) {
      return next(new ErrorHandler("Brand already existed", 409));
    }
    brand = await Brand.create({
      brandName,
      brandEmail,
      brandPassword,
      brandPhoneNumber,
      address,
      skillsRequired,
      payment,
    });
    // await sendInitialEmailAndScheduleReminder(brandName,"brand",brand._id);
    return res.status(201).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNewBrand = async (req, res, next) => {
  try {
    const newBrands = await Brand.find({
      isReviewed: false,
    });
    if (!newBrands.length) {
      return next(new ErrorHandler("No new Brands found", 404));
    }
    return res.status(200).json({
      success: true,
      count: newBrands.length,
      data: newBrands,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApprovedBrand = async (req, res, next) => {
  try {
    const approvedBrands = await Brand.find({ profileStatus: "approved" });
    if (!approvedBrands.length) {
      return next(new ErrorHandler("No approved Brand found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: { approvedBrands },
    });
  } catch (error) {
    next(error);
  }
};
export const getAllPendingBrand = async (req, res, next) => {
  try {
    const pendingBrands = await Artist.find({
      profileStatus: "pending",
      isReviewed: true,
    });
    if (!pendingBrands.length) {
      return next(new ErrorHandler("No pending brands found.", 404));
    }
    //send glimpse of artist detail lists
    return res.status(200).json({
      success: true,
      data: { pendingBrands },
    });
  } catch (error) {
    return next(
      new ErrorHandler("Server error while fetching pending Brands.", 404)
    );
  }
};

export const getAllRejectedBrand = async (req, res, next) => {
  try {
    const rejectedBrands = await Artist.find({ profileStatus: "rejected" });
    if (!rejectedBrands.length) {
      return next(new ErrorHandler("No rejected brands found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        rejectedBrands,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(`Error fetching rejected brands:`, 404));
  }
};
export const getPendingRequest = async (req, res, next) => {
  const { brandId } = req.params;

  try {
    const brand = await Brand.findOne({
      _id: brandId,
      profileStatus: "pending",
      isReviewed: true,
    });
    if (!brand) {
      return next(new ErrorHandler("Pending brand not found.", 404));
    }

    return res.status(200).json({
      success: true,
      data: {
        brand,
      },
    });
  } catch (error) {
    console.error("Error fetching pending brand:", error);
    return next(new ErrorHandler("Error fetching pending brand.", 500));
  }
};

export const getApprovedRequest = async (req, res, next) => {
  const { brandId } = req.params;

  try {
    const brand = await Brand.findOne({
      _id: brandId,
      profileStatus: "approved",
    });
    if (!brand) {
      return next(new ErrorHandler("Approved brand not found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        brand,
      },
    });
  } catch (error) {
    console.error("Error fetching approved brand:", error);
    return next(new ErrorHandler("Error fetching approved brand.", 500));
  }
};

export const getRejectedRequest = async (req, res, next) => {
  const { brandId } = req.params;

  try {
    const Brand = await Brand.findOne({
      _id: brandId,
      profileStatus: "rejected",
    });
    if (!Brand) {
      return next(new ErrorHandler("Rejected Brand not found.", 404));
    }
    return res.status(200).json({
      success: true,
      data: {
        Brand,
      },
    });
  } catch (error) {
    console.error("Error fetching rejected Brand:", error);
    return next(new ErrorHandler("Error fetching rejected Brand.", 500));
  }
};
export const markAsReviewedBrand = async (req, res, next) => {
  const { brandId } = req.params;

  const updatedArtist = await Artist.findByIdAndUpdate(
    brandId,
    { isReviewed: true },
    { new: true }
  );

  if (!updatedArtist) {
    return next(new ErrorHandler("Brand not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: {
      message: "Brand marked as reviewed",
      // artist: updatedArtist,
    },
  });
};
export const updateProfileStatusBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const { status } = req.body; // either 'approved', 'pending', 'rejected'

    if (!["pending", "approved", "rejected"].includes(status)) {
      return next(new ErrorHandler("Invalid status", 400));
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      { profileStatus: status },
      { new: true }
    );

    if (!updatedBrand) {
      return next(new ErrorHandler("Brand not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: {
        message: "profile status updated",
        brand: updatedBrand,
      },
    });
  } catch (error) {
    next(error);
  }
};
