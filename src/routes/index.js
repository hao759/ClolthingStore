const express = require("express");
const router = express.Router();
const admin = require("../app/controllers/admin/admin");

router.get("/admin", admin.gotoadmin);
router.get("/", (req, res) => {
  res.render("Signin");
});
router.get("/getListUser", admin.getListUser);
router.post("/adminsignUp", admin.signUp);
router.post("/adminsignIn", admin.signIn);

module.exports = router;
