const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json()); // for parsing application/json

app.post("/api/send-email", async (req, res) => {
  let { email, addCounts, removeCounts } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "clkokila.it@gmail.com",
      pass: "Kako@2020",
    },
  });

  let mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Order Details",
    text: `Add Counts: ${addCounts}, Remove Counts: ${removeCounts}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});
