const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { addToCart } = require("../controllers/cartController");

const router = express.Router();
router.use(validateToken);

router.post("/", addToCart );

module.exports = router;
