const express = require("express");
const router = express.Router();
const admin = require("../app/controllers/admin/admin");

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

module.exports = router;
