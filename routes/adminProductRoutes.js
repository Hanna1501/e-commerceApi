const express = require("express");
const { createProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const validateToken = require("../middleware/validateTokenHandler");
const isAdmin = require("../middleware/adminHandler");
const router = express.Router();

router.use(validateToken);
router.use(isAdmin);

router.post("/", createProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);

module.exports = router;