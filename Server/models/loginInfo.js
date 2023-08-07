// models/loginInfo.js
const mongoose = require('mongoose');

const loginInfoSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  actionType:{
    type: String,
    enum: ['LOGIN', 'LOGOUT']
  },
  timestamp: {
    type: Date,
    required: true,
  },
  isSuccess:{
    type: Boolean,
    required: true
  },
  failReason:{
    type: String
  }
});

const LoginInfo = mongoose.model('LoginInfo', loginInfoSchema);

module.exports = LoginInfo;
