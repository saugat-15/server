const express = require("express");
const Products = require("../Model/productsSchema");
const router = express.Router();
const multer = require("multer");
// const upload = multer()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "../client/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const findProducts = await Products.find();
    if (findProducts) {
      res.send({
        message: "products fetched",
        productsList: findProducts,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  req.body.productImage = req.file.filename;
  console.log(req.file);
  try {
    console.log(req.body);
    const product = await Products.create(req.body);
    if (product) {
      res.json({
        message: "product added successfully",
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

router.put("/", async (req, res) => {
//   console.log(req.file);
  try {
    // req.body.productImage = req.file.filename;
    console.log(req.body);
    const id = req.body._id;
    const product = await Products.findByIdAndUpdate(id, req.body);

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
