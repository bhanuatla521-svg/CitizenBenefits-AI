const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Education', 'Agriculture', 'Pension', 'Health', 'Business', 'Housing', 'Employment', 'Family Support', 'Social Security', 'Senior Citizens'],
    required: true
  },
  eligibility: {
    minAge: Number,
    maxAge: Number,
    minIncome: Number,
    maxIncome: Number,
    states: [String],
    occupations: [String],
    categories: [String]
  },
  benefits: {
    amount: Number,
    currency: { type: String, default: 'INR' },
    description: String,
    frequency: String
  },
  applicationProcess: {
    onlinePortal: String,
    documents: [String],
    applicationFee: Number
  },
  deadline: Date,
  governmentDepartment: String,
  contactInfo: {
    email: String,
    phone: String,
    website: String
  },
  applicationCount: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scheme', schemeSchema);
