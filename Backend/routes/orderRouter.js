import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure Nodemailer (Use your Gmail App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'balkarnsingh6134@gmail.com', // Your Gmail
    pass: 'nnot ggbt fivl kubw'     // Your 16-digit App Password
  }
});

router.post("/place", async (req, res) => {
  const { fullName, email, address, city, items, totalAmount } = req.body;

  try {
    // Setup Email Content
    const mailOptions = {
      from: '"Mobile Shop" <your-email@gmail.com>',
      to: email, // Target user's email
      subject: 'Order Confirmed! - Mobile Shop',
      html: `
        <div style="font-family: Arial, sans-serif; border: 2px solid #06c4dd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #06c4dd;">Hello ${fullName},</h2>
          <p>Your order has been received and is being processed.</p>
          <hr />
          <h3>Order Summary:</h3>
          <ul>
            ${items.map(item => `<li>${item.name} (x${item.quantity}) - $${item.price}</li>`).join('')}
          </ul>
          <h3>Total Amount: $${totalAmount}</h3>
          <p><strong>Shipping Address:</strong> ${address}, ${city}</p>
          <hr />
          <p>Thank you for shopping with us!</p>
        </div>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Order placed and confirmation mail sent!" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ success: false, message: "Error sending confirmation email" });
  }
});

export default router;