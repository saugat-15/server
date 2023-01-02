const express = require("express");
// const Products = require("../Model/productsSchema");
const router = express.Router();
const multer = require("multer");
const upload = multer({dest: 'uploads/'})

const {uploadFile} = require('../../s3')
// const upload = multer()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(file);
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file;
    console.log(file);
    const result = await uploadFile(file);
    // console.log(result);
    res.send('done');
})

module.exports = router;
