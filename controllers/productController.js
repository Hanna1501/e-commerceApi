const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");

//@des create product
//@route POST /api/admin/products
//@access private
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;
    if (!name || !description || !price || !stock || !category) {
        res.status(400);
        throw new Error("All fields are mandatory");
    };

    const product = await Product.create({
        name,
        description,
        price, stock, category, imageUrl,
        user_id: req.user.id
    });
    console.log(`product created: ${product}`);
    if (product) {
        res.status(201).json({
            id: product.id,
            name: product.name,
            price: product.price
        })
    } else {
        res.status(400);
        throw new Error("Product data is not valid")
    }
});

//@des Update a product
//@route PUT /api/admin/products/:id
//@access private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    if (product.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user productS");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }  //a query option
    );
    res.status(200).json(updatedProduct);
});

//@des Delete a product
//@route DELETE /api/admin/products/:id
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    if (product.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user productS");
    }
    // await contact.remove();
    res.status(200).json(product);
});

module.exports = { createProduct, updateProduct, deleteProduct }