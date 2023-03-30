const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
  },
  categoryImage: {
    type: String,
  },
  // parentId: {
  //   type: String,
  // },
});

module.exports = mongoose.model("Category", categorySchema);
