const asyncHandler = require("express-async-handler");
const User = require("../model/authModel");

const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403);
            throw new Error("admin access required");
        }
    } catch (error) { }

    res.status(500);
});

module.exports = isAdmin;