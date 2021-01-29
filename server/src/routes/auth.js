const express = require("express");
const router = express.Router();  // allows me to make api requests with extra validation handling
const { signin, signup, me } = require("../routeControllers/auth");
const { shieldUser } = require("../middlewares/authSignin");

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/me").get(shieldUser, me);

module.exports = router;