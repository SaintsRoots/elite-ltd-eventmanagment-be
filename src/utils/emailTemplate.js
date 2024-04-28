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


// Function to send a notification to the EventHub Team
export const notifyUserOfNewEvent = (email, event) => {
  const { title, description, date_schedule, location, price } = event;
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const emailTemplate = {
    emailTo: email,
    subject: `Join Us for an Exciting Event: ${title}!`,
    message: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #0056b3;">${title}</h1>
        <p>Hello,</p>
        <p>We're excited to invite you to our upcoming event, <strong>${title}</strong>, which will be held on <strong>${formatDate(date_schedule)}</strong> at <strong>${location}</strong>.</p>  
        <p>${description}</p>
        
        <h2>Event Details:</h2>
        <ul>
          <li><strong>Date:</strong> ${formatDate(date_schedule)}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Price:</strong> $${price}</li>
        </ul>
        
        <p>Don't miss this opportunity to enjoy what promises to be a memorable event. Seats are limited, so be sure to secure your spot soon!</p>
        
        <p>For more information and to purchase tickets, please visit our website or contact us directly.</p>
        
        <p>We look forward to welcoming you to <strong>${title}</strong>!</p>
        
        <p>Best regards,</p>
        <p>The Events Team</p>
      </div>
      `,
  };

  sendMail(emailTemplate)
};

// sending Email Person Booked tickets
export const sendEmailPersonBookedTickets = (email, name , eventDetails) => {
  const emailTemplate = {
      emailTo: email,
      subject: "Booking Confirmation!",
      message: `<p>Hi,${name}<br>Your booking for ${eventDetails.number_of_tickets} tickets to ${eventDetails.title} has been confirmed!</p><p>Total price: ${eventDetails.total_price} FRW</p>`,
  };

  sendMail(emailTemplate);
};
