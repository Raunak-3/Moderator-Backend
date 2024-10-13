import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
import cors from "cors";
import artistRouter from "./routes/artist.js";
import adminRouter from "./routes/admin.js";
import emailQueue from "./config/bullConfig.js";
import { emailJob } from "./jobs/emailJob.js";
export const app = express();


emailQueue.process(emailJob);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, '../public/images')));
dotenv.config(path.join(__dirname,'../.env'));

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Api working with /api/v1");
});

app.use("/api/v1/artist",artistRouter);
app.use("/api/v1/admin",adminRouter);
app.use(errorMiddleware);