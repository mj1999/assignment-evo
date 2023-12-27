const mongoose = require("mongoose");
const surveyFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    default: "male",
  },
  nationality: {
    type: String,
    enum: [
      "Indian",
      "American",
      "Chinese",
      "French",
      "German",
      "Japanese",
      "British",
      "Australian",
      "Canadian",
      "Brazilian",
    ],
    default: "Indian",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Survey = mongoose.model("Survey", surveyFormSchema);
module.exports = Survey;
