# ToDoList
To-Do List Web App

Overview

This is a React-based To-Do List application that allows users to:

Add, check, and delete tasks.

Set reminders for tasks with notifications.

Receive reminder emails.

Store tasks locally using localStorage.

Authenticate users using Firebase OTP-based authentication.



---

Features

Task Management: Add, check, and delete tasks.

Reminders: Users can set reminders, and they will receive notifications when it's time.

Email Notifications: Sends reminder emails using a backend service.

Local Storage: Tasks are stored in the browser's localStorage, so they persist even after refreshing.

Firebase Authentication: Uses OTP-based authentication for user login.



---

Tech Stack

Frontend: React, CSS

Backend: Node.js, Express.js (for email reminders)

Database: Local Storage

Notifications: Browser Notifications API

Authentication: Firebase OTP Authentication



---

Setup Instructions

Prerequisites

Node.js & npm installed

Firebase Project setup with authentication enabled

Backend server (for email reminders)


Steps to Run

1. Clone the Repository

git clone https://github.com/your-repo/todo-list.git
cd todo-list


2. Install Dependencies

npm install


3. Start the React App

npm start

The app should now be running at http://localhost:3000.


4. Backend Setup (for Email Reminders)

A Node.js backend should be running at http://localhost:5000.

Example Express.js backend:

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'your-email@gmail.com', pass: 'your-password' },
});

app.post('/sendReminder', async (req, res) => {
  const { email, task, reminderTime } = req.body;
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Task Reminder',
      text: `Reminder for your task: "${task}" scheduled at ${reminderTime}`,
    });
    res.status(200).send('Email sent');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));



5. Firebase Setup

Replace the firebaseConfig in firebase.js with your Firebase credentials.





---

Usage

Add a Task: Enter a task description, email, and an optional reminder time, then click "Add".

Check/Uncheck a Task: Click on the circle next to a task to mark it as completed.

Delete a Task: Click on the "×" next to a task to remove it.

Receive Notifications: The app will notify you when the reminder time arrives.

Logout: Click the logout button to log out.



---

Screenshots

1. Main To-Do List Interface



2. Task Reminder Notification





---

Future Improvements

Add user authentication to store tasks in a database.

Implement push notifications via Firebase.

Improve UI/UX with animations.



---

License

This project is open-source and available under the MIT License.

Contributors:

Chinar Mhatre 
Pranay Karmokar 

