const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.post("/mail", async (req, res) => {
  console.log(req.body);
  const { email, phone, addCounts, totalPrice } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // use 'gmail' as the email service
    auth: {
      user: "clkokila.it@gmail.com",
      pass: "rvvg wdvs xpwt iwzn", // your email password
    },
  });

  // Send an email
  let info = await transporter.sendMail({
    from: '"Taste of Temple City" clkokila.it@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Order Confirmation", // Subject line
    text: `Hello, you have ordered ${JSON.stringify(
      addCounts
    )}. The total price is ${totalPrice}.`, // plain text body
  });

  res.status(200).send("Email sent");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
