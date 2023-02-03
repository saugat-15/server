const express = require('express')
const app = express()
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
// const PORT = 5000;


const connectMongoose = require("./db/mongoose");
connectMongoose()

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))

const productsRouter = require('./Controller/productRouter');
const registerRouter = require('./Controller/registerRouter');
const loginRouter = require('./Controller/loginRouter');
// const imageRouter = require('./Controller/imageRouter');
// const { connect } = require('mongoose');

app.use('/products', productsRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
// app.use('/image', imageRouter)

app.listen(process.env.PORT, () => {
    console.log(`ecommerce server starting on port: ${process.env.PORT}`)
})