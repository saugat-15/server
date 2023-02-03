const express = require("express");
const Products = require("../Model/productsSchema");
const router = express.Router();
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const path = require('path');


// const {uploadFile} = require('../../s3')
// const upload = multer()8g

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "../client/src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});



cloudinary.config({
  cloud_name: 'dbqifkohb',
  api_key: '433712114898133',
  api_secret: '-XwwRKWUOnn7zrKc-hiSExmCZOk'
});



// cloudinary.uploader.upload(filePath,  { resource_type: 'auto' }, function(error, result) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(result);
//   }
// });

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  // console.log(req.body);
  try {
    const findProducts = await Products.find();
    if (findProducts) {
      console.log(findProducts)
      res.send({
        message: "products fetched",
        productsList: findProducts,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// debugger;
router.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  // console.log('aassshit')
 req.body.productImage = req.file.filename;
 console.log(req.file);
  try {
    console.log(req.body);
    cloudinary.uploader.upload(file.path, { resource_type: "auto" }, (error, result) => {
      // if(error) return next(error);
      return res.send(result);
  });
    const product = await Products.create(req.body);
    if (product) {
      res.json({
        message: "product added successfully",
        productDetail: product,
      });
    }
  } catch (error) {
    res.json({
      message: "something went wrong",
      error: error,
    });
  }
});

router.put("/", upload.single("image"), async (req, res) => {
  console.log(req.file);
  
  try {
    req.body.productImage = req.file.filename;
    console.log(req.body);
    console.log(req.file.filename);
    const id = req.body.id;
    const product = await Products.findByIdAndUpdate(
      id,
      req.body
      // { new: true }
    );

    console.log(product);

    await product.save();

    if (product) {
      res.json({
        message: "product updated successfully",
        productDetail: product,
      });
    }
  } catch (error) {
    res.send({
      message: "something went wrong",
      error: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // console.log(req.body);
    const product = await Products.findOneAndDelete(req.params);
    if (product) {
      res.json({
        message: "product deleted successfully",
        productDetail: product,
      });
    }
  } catch (error) {
    res.send({
      message: "something went wrong",
      error: error,
    });
  }
});

module.exports = router;
