const express = require("express");
const connectDb = require("./configs/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5002;

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin/products", require("./routes/adminProductRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart/products", require("./routes/cartRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
})