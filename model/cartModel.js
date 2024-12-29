// models/Cart.js
const mongoose = require('mongoose');
const Product = require('./productModel');

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  }
});

// // Pre-save middleware to calculate total price
// cartSchema.pre('save', async function (next) {
//     let total = 0;
//     for (const item of this.items) {
//       const product = await product.findById(item.product_id);
//       if (product) {
//         total += product.price * item.quantity;
//       }
//     }
//     this.totalPrice = total;
//     next();
//   });
  
module.exports = mongoose.model('Cart', cartSchema);
