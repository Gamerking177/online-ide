const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URL)

const projectSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  date: {
    type: Date,
    default: Date.now()
  },
  htmlCode: {
    type: String,
    default: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>Hello World</h1>
    </body>
    </html>`
  },
  cssCode: {
    type: String,
    default:  `
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }`
  },
  jsCode: {
    type: String,
    default: `console.log("Hello World");`
  }
})

module.exports = mongoose.model("Project", projectSchema)