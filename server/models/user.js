const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  jobTitle: String,
  email: String,
  phone: String,
  role: String,
  password: String,
  secondaryPhone: String,
  secondaryEmail: String,
  companies: Array,
  imageUrl: String,
  incomingMassages: String,
});

mongoose.model("User", userSchema);
