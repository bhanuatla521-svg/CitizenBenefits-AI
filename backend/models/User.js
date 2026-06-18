const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  age: {
    type: Number,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'OBC', 'SC', 'ST'],
    default: 'General'
  },
  phone: String,
  gender: String,
  bookmarkedSchemes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme'
  }],
  appliedSchemes: [{
    schemeId: mongoose.Schema.Types.ObjectId,
    applicationDate: Date,
    status: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
