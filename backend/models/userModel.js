const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URL);

let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('user', userSchema);