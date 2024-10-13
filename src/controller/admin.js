import ErrorHandler from "../middlewares/error.js";
import { Admin } from "../models/admin.js";
import { sendCookie } from "../utils/feature.js";
import bcryptjs from "bcryptjs";
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("admin data: ",req.body);
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide given fields", 400));
  }
  let admin = await Admin.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });
  if (admin) {
    return next(
      new ErrorHandler("Email already exist Please login to continue", 409)
    );
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  
  admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });
  // return res.send("success");
  sendCookie(admin, res, 201);
  return res.json({
    success:true,
    message: "admin successfully created",
  });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let findAdmin = await Admin.findOne({ email }).select("+password");

  if (!findAdmin) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }
  const isValidPassword = await bcryptjs.compare(password, findAdmin.password);

  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid password", 404));
  }
  sendCookie(findAdmin, res, 200);
  return res.json({
    success:true,
    message: `welcome, ${findAdmin.name}`,
  });
};
