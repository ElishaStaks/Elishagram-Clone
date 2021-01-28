const User = require("../models/User");

signin = (req, res, next) => {
    const { email, password } = req.body;

    // Make sure the email and password is not empty
    if (!email || !password) {
        return next({
            message: "Please provide email and password",
            statusCode: 400,
        });
    }

    // check if that email exists in the database
    const user = await User.findOne({ email });

    // if the email is incorrect
    if (!user) {
        return next({
            message: "Invalid email or password",
            statusCode: 400,
        });
    }

     // if email is correct we then compare the hashed password with 
     // the password the user enters
    const match = await user.checkPassword(password);
    
    if (!match) {
        return next({ message: "The password does not match", 
        statusCode: 400 });
    }

    const token = user.getJwtToken();

    // then send json web token as response
    res.status(200).json({ success: true, token });
};