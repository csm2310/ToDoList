const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karmokarpranay793@gmail.com",
    pass: "kwnr brwp zuua mvzj",
  },
});

app.post("/sendReminder", (req, res) => {
  const { email, task, reminderTime } = req.body;

  if (!task || !reminderTime) {
    return res.status(400).send("Task and reminder time are required");
  }

  const formattedTime = new Date(reminderTime).toLocaleString();

  const mailOptions = {
    from: "karmokarpranay793@gmail.com",
    to: 'p4381764@gmail.com',
    subjects: "Task Reminder",
    text: `Reminder: ${task}/n scheduled Time: ${formattedTime}`,
  };

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending Email.", error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
