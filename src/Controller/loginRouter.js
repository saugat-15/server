const express = require("express");
const User = require("../Model/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
//   console.log(req.body);
  try {
    if (req.body.email && req.body.password) {
      const token = jwt.sign({ email: req.body.email }, "ifsjdfosadjofo");

      const registeredUser = await User.findOne({ email: req.body.email });
      console.log(registeredUser);
      const hashedPassword = registeredUser.password;
      console.log(hashedPassword)
      bcrypt.compare(req.body.password, hashedPassword).then(function (result) {
        // result == true
        // console.log(hash)
        if (result) {
          res.json({
            detail: registeredUser,
            msg: `You're logged in`,
            token: token,
            // hashedPassword: hashedPassword
          });
        } else {
          res.json({
            msg: `invalid creds`,
          });
        }
      });
    }
  } catch(error) {
    res.json({
        msg: `invalid creds`,
        errorDetails: error
      });
  }
});

module.exports = router;
