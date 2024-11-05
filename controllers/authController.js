const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/authModel");
//@des sign-up
//@route POST /api/auth/signUp
//@access public
const signUpUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    };

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User is already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`user created: ${user}`);
    if(user){
        res.status(201).json({
           id: user.id,
           email: user.email
        })    
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }
})
//@des sign-up
//@route POST /api/auth/signUp
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
   }
   const user = await User.findOne({email});
   //compare password
   if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user.id
        }
    },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "10m"}
    );
    res.status(200).json({accessToken});
   }else{
    res.status(401);
    throw new Error("Email or Password is not valid");
   }
});

module.exports = {
    signUpUser,
    loginUser
}