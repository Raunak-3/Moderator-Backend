import cron from "node-cron";
import { Artist } from "../models/artist.js";
import { nodemailerConfig } from "../config/nodemailerConfig.js";
import { Brand } from "../models/brand.js";

export const scheduleReminderEmail = (
  requestId,
  sellerName,
  entityType = "artist"
) => {
//   every day at 9 AM
  const cronJob = cron.schedule("0 9 * * *", async () => {
    let requestEntity;

    if (entityType === "artist") {
      requestEntity = await Artist.findById(requestId);
    } else if (entityType === "brand") {
      requestEntity = await Brand.findById(requestId);
    }

    if (requestEntity && !requestEntity.isReviewed) {
      try {
        await nodemailerConfig.sendMail({
          from: '"HouseOfMarktech" <1337xmas@gmail.com>',
          to: "luvsharmagju31@gmail.com", // Admin email
          subject: `Reminder: New ${entityType} Request Review Pending`,
          text: `Please review the joining request from ${sellerName}.`,
        });

        //   console.log(`Reminder email sent for ${entityType} ${sellerName}.`);
      } catch (error) {
          console.error(`Error sending reminder email for ${entityType} ${sellerName}:`, error);
      }
    } else if (requestEntity && requestEntity.isReviewed) {
      cronJob.stop();
      console.log(
        `Request for ${entityType} ${sellerName} has been reviewed. Stopping reminder.`
      );
    }
  });
};
