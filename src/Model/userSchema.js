const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
},{
    collection: 'users'
})

const usersModel = mongoose.model('usersModel', userSchema);

module.exports = usersModel