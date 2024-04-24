import sendMail from "../helper/sendMail";

// Function to send a welcome email to a new administrator
export const sendWelcomeEmailToAdmin = (email, name) => {
    const emailTemplate = {
        emailTo: email,
        subject: "Welcome Aboard - EventHub Team!",
        message: `<h1>Welcome, Admin ${name}!</h1><br/>
    Thank you for joining the EventHub team! We are thrilled to have you onboard as we continue to enhance our event management services. Look forward to exciting collaborations and impactful work.<br/>
    Best regards,<br/>
    The EventHub Team<br/>`,
    };

    sendMail(emailTemplate);
};

// Function to send a password reset email
export const sendResetEmail = (email, name, link, resetCode) => {
    const emailTemplate = {
        emailTo: email,
        subject: "Your EventHub Password Reset Request",
        message: `<h1>Hi ${name},</h1></br>
        <h3>Your Password Reset Code: ${resetCode}</h3><br>
        Please use the link below to reset your password. If the link is not working, you can manually enter the code provided on the reset page.<br><br>
        <a href="${link}" style="background-color:#007BFF;width:100px;height:35px;padding:10px 15px;color:white;font-weight:bold;border-radius:5px;text-decoration:none;text-align:center;display:inline-block;">
        Reset Password
        </a><br><br>
        This code will expire in <b>15 minutes</b>. Please use it right away to reset your password.<br/><br/>
        Warm regards,<br/>
        The EventHub Team<br/>`,
    };

    sendMail(emailTemplate);
};
