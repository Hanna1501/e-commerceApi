const asyncHandler = require("express-async-handler");
const Cart = require("../model/cartModel")
//@des add product to cart
//@route POST /api/cart/products
//@access private
const addToCart  = asyncHandler(async (req, res) => {
    const {product_id, quantity} = req.body;
    const userId = req.user?.id;
    if (!userId) {
        res.status(401);
        throw new Error("User ID is missing or user is not authenticated");
    }
    let cart = await Cart.findOne({user_id: userId})  //find the user's cart
    if(!cart){
        cart=new Cart({user_id: userId, items:[]})
    }

    // Check if product is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
    if (existingItemIndex > -1) {
        // Update quantity if product is already in cart
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.items.push({ product_id, quantity });
    }

    // // Recalculate total price
    // cart.totalPrice = cart.items.reduce((total, item) => {
    //     const itemProduct = item.product_id.toString() === productId ? product : await Product.findById(item.product_id);
    //     return total + (itemProduct.price * item.quantity);
    // }, 0);
    await cart.save();
    res.status(201).json(cart)
})

module.exports = {
    addToCart 
}