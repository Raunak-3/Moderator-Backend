import emailQueue from "../config/bullConfig.js";
import scheduleReminderEmail from "../services/jobScheduler.js";
export const sendInitialEmailAndScheduleReminder = async (
  entityName,
  entityType,
  requestId
) => {
  try {
    await emailQueue.add({
      adminEmail: "luvsharmagju31@gmail.com",
      subject: `New ${entityType} Registration`,
      body: `A new ${entityType} named ${entityName} has registered. Please review it.`,
    });
    scheduleReminderEmail(requestId, entityName, entityType);
  } catch (error) {
    console.error(`Error enqueuing ${entityType} registration email:`, error);
  }
};
