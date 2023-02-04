const express = require("express");
const Products = require("../Model/productsSchema");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const cloudinary = require('./cloudinary');

const upload = multer({
  storage:  multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" ){
      cd(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  }
})

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
  // console.log('aassshit')
//  console.log(req.file);
const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    req.body.productImage = result.secure_url;
    req.body.cloudinary_id = result.public_id;
  try {
    console.log(req.body);
    const product = await Products.create(req.body);
    if (product) {
      // debugger;
      // const file = req.file;
      // const result = await uploadFile(file);
      //  console.log(result);
      res.json({
        message: "product added successfully",
        productDetail: product,
        result,
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
  const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    res.json(result);
    req.body.productImage = result.secure_url;
  try {
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
