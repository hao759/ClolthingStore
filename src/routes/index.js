const express = require("express");
const router = express.Router();
const admin = require("../app/controllers/admin/admin");
const Category = require("../app/controllers/admin/category");
const Product = require("../app/controllers/admin/product");
const {
  requireSignin,
  adminMiddleware,
} = require("../common_middleware/index");

router.get("/admin", admin.gotoadmin); //tới trang dashboard
router.get("/login", (req, res) => {
  res.render("Signin");
});
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/signup", (req, res) => {
  res.render("SignUp");
});
router.get("/detail", (req, res) => {
  res.render("detail");
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
const { route } = require("express/lib/router");
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

router.get("/getCategory/:id", Category.getCategory);
router.get("/getLisCategory", Category.getLisCategory);
router.get("/Category", Category.pageCategory);
router.post(
  "/updatCagetory",
  upload.single("categoryImage"),
  Category.updatCagetory
);
router.post("/deleteCategory", Category.deleteCategory);

//Product========================================
router.post("/addProduct", upload.single("productImage"), Product.addProduct);
router.get("/Product", Product.renderview);
router.get("/getListProduct", Product.getListProduct);
router.post("/deleteProduct", Product.deleteProduct);
module.exports = router;
