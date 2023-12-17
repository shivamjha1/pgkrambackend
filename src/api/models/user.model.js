const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firebaseId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
  },
  authType: {
    type: String,
    enum: ['EMAIL', 'PHONE', 'SOCIAL_GOOGLE', 'SOCIAL_FACEBOOK'],
    required: true,
  },
  role: {
    type: String,
    enum: ['SEEKER', 'PROVIDER'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
