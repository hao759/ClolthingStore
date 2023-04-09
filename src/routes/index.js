const express = require("express");
const router = express.Router();
const admin = require("../app/controllers/admin/admin");
const Category = require("../app/controllers/admin/category");
const Product = require("../app/controllers/admin/product");
const Cart = require("../app/controllers/cart");
const Order = require("../app/controllers/order");
const {
  requireSignin,
  adminMiddleware,
} = require("../common_middleware/index");

//   // Generate
//   // const url = cloudinary.url("olympic_flag1", {
//   //   width: 100,
//   //   height: 150,
//   //   Crop: "fill",
//   // });
//   // // The output url
//   // console.log("url", url);
// });
//==================================================================================================================
router.get("/admin", admin.gotoadmin); //tới trang dashboard
router.get("/signin", (req, res) => {
  res.render("login");
});
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/shop/:categoryID", (req, res) => {
  res.render("shop");
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

//Category================================================================================
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

//Product=================================================================================================
router.post("/addProduct", upload.single("productImage"), Product.addProduct);
router.get("/Product", Product.renderview);
router.get("/getListProduct", Product.getListProduct);
router.get("/detail/:id", Product.detail);
router.get("/getProductByID/:_id", Product.getProductByID);
router.get(
  "/getProductBycategoryID/:categoryID",
  Product.getProductBycategoryID
);
router.post("/deleteProduct", Product.deleteProduct);

//Cart=================================================================================================
router.get("/Cart", Cart.viewCart);
router.get("/getCartItems", requireSignin, Cart.getCartItems);
router.post("/addItemToCart", requireSignin, Cart.addItemToCart);

//Order=================================================================================================
router.get("/order", Order.Order);
router.post("/addOrder", requireSignin, Order.addOrder);
router.get("/getListOrders", Order.getListOrders);
router.get("/getOrders/:_id", Order.getOrders);
module.exports = router;
