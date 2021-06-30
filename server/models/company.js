const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  email: String,
  website: String,
  primaryContactName: String,
  primaryContactPhone: String,
  primaryContactRole: String,
  users: Array,
  imageUrl: String,
});

mongoose.model("Company", companySchema);
