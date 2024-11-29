var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var userModel = require('../models/userModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const secret = "secret"

router.post('/signUp', async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email })
  if (emailCon) {
    return res.json({ success: false, message: "Email already exists" })
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash
        });

        return res.json({ success: true, message: "User createed successfully" })
      });
    });

  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (isMatch) {
        let token = jwt.token = jwt.sign({ email: user.email, userID: user._id }, secret)
        return res.json({ success: true, message: "User logged in successfully", token: token, userId: user._id })
      } else {
        return res.json({ success: false, message: "Invalid email or password" });
      }
    });
  } else {
    return res.json({ success: false, message: "User not found ! " })
  }
})

module.exports = router;
