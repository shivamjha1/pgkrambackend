const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: [
      {
        type: String,
      },
    ],
    email: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    providerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProviderProfile',
    },
  },
  {
    timestamps: true,
  }
);

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
