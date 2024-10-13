import { nodemailerConfig } from "../config/nodemailerConfig.js";

export const emailJob = async(job)=>{
    const {adminEmail,subject,body} = job.data;
    try{
        await nodemailerConfig.sendMail({
            from:'"HouseOfMarktech" 1337xmas@gmail.com',
            to:adminEmail,//admin Email
            subject:subject,
            text:body
        })
        console.log("email sent successfully");
    }catch(e){
        console.error('Error sending email:',e)
    }
};