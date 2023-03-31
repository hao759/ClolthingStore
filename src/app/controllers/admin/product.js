const Product = require("../../models/product");
exports.renderview = (req, res) => {
  res.render("admin/product");
};
exports.addProduct = async (req, res) => {
  // console.log(req.body);
  const { name, description, price, categoryID } = req.body;
  const _product = new Product({
    name,
    description,
    price,
    categoryID,
  });
  try {
    if (req.file) {
      _product.productImage =
        process.env.ENVIRONMENT + "/public/upload/" + req.file.filename;
    }

    const result = await _product.save();
    return res.status(200).json({
      mess: result,
    });
  } catch (error) {
    console.log("=============");
    return res.status(400).json({
      mess: error,
    });
  }
};
exports.getListProduct = async (req, res) => {
  try {
    let result = await Product.find({});
    return res.status(200).json({
      message: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
  // res.render("admin/blank", { data: result });
};
exports.detail = async (req, res) => {
  res.render("detail");
};
exports.getProductBycategoryID = async (req, res) => {
  try {
    let result;
    if (req.params.categoryID == 1) result = await Product.find({});
    else result = await Product.find({ categoryID: req.params.categoryID });
    return res.status(200).json({
      message: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
  // res.render("admin/blank", { data: result });
};
exports.getProductByID = async (req, res) => {
  try {
    let result = await Product.find({ _id: req.params._id });

    return res.status(200).json({
      message: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
  // res.render("admin/blank", { data: result });
};
exports.deleteProduct = async (req, res) => {
  try {
    console.log(req.body);
    let id = req.body._id;
    let result = await Product.deleteOne({ _id: id }); //deletedCount
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
  // res.render("admin/blank", { data: result });
};
