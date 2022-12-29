const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    productName: { type: String, },
    productType: { type: String, },
    price: { type: Number, },
    productImage: { type: String,},
    description: { type: String,},
  },
  {
    collection: "Products",
  }
);

const productsModel = mongoose.model("productsModel", productsSchema);
module.exports = productsModel;
