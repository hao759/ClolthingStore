const express = require("express");
const router = express.Router();
const admin = require("../app/controllers/admin/admin");
const Category = require("../app/controllers/admin/category");

router.get("/admin", admin.gotoadmin); //tới trang dashboard
router.get("/", (req, res) => {
  res.render("Signin");
});
router.get("/signup", (req, res) => {
  res.render("SignUp");
});
router.get("/getListUser", admin.getListUser);
router.post("/deleteUser", admin.deleteUser);
router.get("/getUser/:id", admin.getUser);
router.post("/adminsignUp", admin.signUp);
router.post("/updateUser", admin.updateUser);
router.post("/adminsignIn", admin.signIn);

//Category
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "public/upload"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post(
  "/addCategory",
  upload.single("categoryImage"),
  Category.addCategory
);
router.get("/getLisCategory", Category.getLisCategory);
module.exports = router;
