// Import nodemailer, the User model, and bcryptjs for email and token handling.
import nodemailer from 'nodemailer';
import User from "@/models/user.model"
import bcryptjs from 'bcryptjs';

// Function to send a verification or password reset email.
export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashed token based on the user ID for security.
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Update the user document with the appropriate token and expiry based on email type.
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1-hour expiry
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1-hour expiry
            });
        }

        // Configure the nodemailer transport with SMTP settings.
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "289573460b5020", // Replace with your actual SMTP user
                pass: "e85edd09458e20"  // Replace with your actual SMTP password
            }
        });

        // Define the email options, setting the subject and message content based on email type.
        const mailOptions = {
            from: 'mihirjadhavofficial@gmail.com', // Sender's email address
            to: email, // Recipient's email address
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // Email HTML content with link
        };

        // Send the email using the transporter and log the message ID.
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", mailResponse.messageId);
        return mailResponse;

    } catch (error: any) {
        // Throw an error if sending the email fails, for easier debugging.
        throw new Error(error);
    }
}
