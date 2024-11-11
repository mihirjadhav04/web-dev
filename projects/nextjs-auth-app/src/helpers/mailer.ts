import nodemailer from 'nodemailer';
import User from "@/models/user.model"
import bcryptjs from 'bcryptjs';


export const sendMail = async({email, emailType, userId}:any) => {

    try {

        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "289573460b5020",
            pass: "e85edd09458e20"
          }
        });

          const mailOptions = {
            from: 'mihirjadhavofficial@gmail.com', // sender address
            to: email, // list of receivers
            subject:  emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }
          const mailResponse = await transporter.sendMail(mailOptions)
          console.log("Message sent: %s", mailResponse.messageId);
          return mailResponse

    } catch (error:any) {
        throw new Error(error)
    }


}