"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

async function main(message){
  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 587,
    secure:false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  let info = await transporter.sendMail({
    from: "Email-Bot <"+process.env.EMAIL+">",
    to: "Bradley <sendallthemailto@gmail.com>",
    text: message
  });

  console.log("Message sent: %s", info.messageId);
}

app.post("/", (req, res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const content = req.body.content;
  const message = "Name: "+name+" Email: "+email+" Message: "+content;
  main(message).catch(console.error);
  res.redirect("https://confuseddev.github.io");
});

app.listen(process.env.PORT, ()=>{
  console.log("Server Started");
});