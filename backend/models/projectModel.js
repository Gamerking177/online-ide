const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/onlineIDE')

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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>Hello World</h1>
</body>

</html>
    `
  },
  cssCode: {
    type: String,
    default: `body {
  color: red;
}`
  },
  jsCode: {
    type: String,
    default: `console.log("Hello World");`
  }
})

module.exports = mongoose.model("Project", projectSchema)