const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.shieldUser = (req, res, next) => {
    const { authorization } = request.headers;

    // if authorization is not present
    if (!authorization) {
        response.status(401).json({error: "You must be logged in"});
    }

    // retrieve token from auth
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error){
            return response.status(403).json({error: "You must be logged in"});
        }
        const {_id} = payload;
        User.findById(_id).then(userData => {
            request.user = userData;
            next();
        });
    });
};