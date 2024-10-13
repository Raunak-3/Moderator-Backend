import Queue from "bull";
import { emailJob } from "../jobs/emailJob.js";


const emailQueue = new Queue('emailQueue',{
    redis: {
        host:process.env.REDIS_HOST, // your redis host
        port: process.env.REDIS_PORT,         // your redis port
        password:process.env.REDIS_PASSWORD
    }
});

emailQueue.on('completed', (job) => {
    console.log(`Job completed with result: ${job.returnvalue}`);
});

emailQueue.on('failed', (job, err) => {
    console.error(`Job failed with error: ${err}`);
});

export default emailQueue;