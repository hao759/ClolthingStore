const Category = require("../../models/category");
exports.addCategory = async (req, res) => {
  console.log("=============");
  const { name, description } = req.body;
  const _category = new Category({
    name,
    description,
  });
  try {
    if (req.file) {
      _category.categoryImage =
        process.env.ENVIRONMENT + "/public/upload/" + req.file.filename;
    }

    const result = await _category.save();
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
exports.getLisCategory = async (req, res) => {
  try {
    let result = await Category.find({});
    return res.status(200).json({
      message: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
exports.pageCategory = async (req, res) => {
  res.render("admin/cagetory");
};
exports.getCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await Category.findOne({ _id: id }); //deletedCount
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    let id = req.body._id;
    let result = await Category.deleteOne({ _id: id }); //deletedCount
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
exports.updatCagetory = async (req, res) => {
  try {
    let nameIMG;
    let { _id, name, description } = req.body;
    if (req.file) {
      nameIMG = process.env.ENVIRONMENT + "/public/upload/" + req.file.filename;
    }
    let user = await Category.updateOne(
      { _id },
      { name, description, categoryImage: nameIMG }
    );
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};
