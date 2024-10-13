import emailQueue from "../config/bullConfig.js";
import { nodemailerConfig } from "../config/nodemailerConfig.js";
import { scheduleReminderEmail } from "./jobScheduler.js";

export const sendInitialEmailAndScheduleReminder = async(artist)=>{
    const {artistName,artistEmail} = artist;
    emailQueue.add({
        adminEmail:"luvsharmagju31@gmail.com",
        subject:"New artist Request",
        body:`A new seller ${artistName} has requested to join. Please review it.`
    })
    // scheduleReminderEmail(artist._id, artistName);
};