const express = require("express");
const User = require('../Model/userSchema')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', (req, res) => {
    console.log(req.body)
    try{
        bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
            // Store hash in your password DB.
            console.log(req.body);
            req.body.password = hash;
            const user = User.create(req.body);
            if(user){
                res.json({
                    message: 'user successfully registered',
                    details: user
                })}
        });
        
        
    }catch(error){
        res.send({
            message: 'Invalid creds'
        })
    }
})
module.exports = router;