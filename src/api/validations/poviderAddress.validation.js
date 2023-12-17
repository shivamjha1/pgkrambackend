// validations/providerAddress.validation.js
const Joi = require('joi');

module.exports = {
  // POST /v1/providerAddresses
  createProviderAddress: {
    body: {
      providerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      line1: Joi.string().required(),
      line2: Joi.string(),
      state: Joi.string().valid('Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal').required(),
      city: Joi.string().required(),
      pincode: Joi.string().required(),
    },
  },

  // PUT /v1/providerAddresses/:providerAddressId
  updateProviderAddress: {
    body: {
      providerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      line1: Joi.string(),
      line2: Joi.string(),
      state: Joi.string().valid('Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'),
      city: Joi.string(),
      pincode: Joi.string(),
    },
    params: {
      providerAddressId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
