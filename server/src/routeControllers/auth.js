const User = require("../models/User");

exports.signin = async (req, res, next) => {
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
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.signup = async (req, res, next) => {
    // all details needed for the user to sign up
    const { fullname, username, email, password } = req.body;
    
    // creates user object
    const user = await User.create({ fullname, username, email, password });

    const token = user.getJwtToken();

    res.status(200).json({ success: true, token });
    
    Promise.resolve((req, res, next)).catch(next);
};

exports.user = async (req, res, next) => {
    const { avatar, username, fullname, email, _id, bio } = req.user;

    res.status(200).json({success: true, data: { avatar, username, fullname, email, _id, bio }});
    Promise.resolve((req, res, next)).catch(next);
};