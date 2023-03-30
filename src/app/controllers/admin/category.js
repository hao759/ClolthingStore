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
  // res.render("admin/blank", { data: result });
};
