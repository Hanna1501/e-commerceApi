const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: [true, "Please add the user name"]
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);