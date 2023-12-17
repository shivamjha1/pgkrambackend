// models/providerProfile.model.js
const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    social: {
      type: String,
    },
    website: {
      type: String,
    },
    sector: {
      type: String,
      enum: ['Sector1', 'Sector2', 'Sector3'], // Add your sectors
    },
    govInfo: {
      type: String,
    },
    registeredYear: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProviderProfile = mongoose.model('ProviderProfile', providerProfileSchema);

module.exports = ProviderProfile;
