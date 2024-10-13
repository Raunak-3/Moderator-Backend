import cron from "node-cron";
import { Artist } from "../models/artist.js";
import { nodemailerConfig } from "../config/nodemailerConfig.js";
export const scheduleReminderEmail = (requestId,sellerName)=>{
    cron.schedule('* * * * *',async()=>{
        const artistRequest = await Artist.findById(requestId);
        if(!artistRequest.isReviewed){
            await nodemailerConfig.sendMail({
                from:'"HouseOfMarktech" 1337xmas@gmail.com',
                to:"luvsharmagju31@gmail.com",//admin Email
                subject:"Reminder: New Artist Request Review Pending",
                text:`Please review the service request from ${sellerName}.`
            });
            console.log(`Reminder email sent.`);
        }
    });
};