const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getProducts, getProductDetails } = require("../controllers/productController");
const router = express.Router();

router.use(validateToken);

router.get("/", getProducts);
router.get("/:id", getProductDetails);

module.exports = router;