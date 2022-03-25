"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

async function main(name, email, content){
  let transporter = nodemailer.createTransport({
    host: process.env.HOSTURL,
    port: 587,
    secure:false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  let info = await transporter.sendMail({
    from: "Email-Bot <"+process.env.EMAIL+">",
    to: "Bradley <"+process.env.SENDMAIL+">",
    subject: "New Email from Email-Bot",
    html: `<h3>Name</h3>
    <p>${name}</p>
    <h3>Email</h3>
    <p>${email}</p>
    <h3>Message</h3>
    <p>${content}</p>
    `
  });

  console.log("Message sent: %s", info.messageId);
}

app.post("/", (req, res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const content = req.body.content;
  main(name, email, content).catch(console.error);
  res.redirect("https://bradsdesk.com");
});

app.listen(process.env.PORT, ()=>{
  console.log("Server Started");
});