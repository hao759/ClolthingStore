const express = require("express");
const router = express.Router();
const admin = require("../app/controllers/admin/admin");

router.get("/", (req, res) => {
  res.render("SignUp");
});

router.get("/Signin", (req, res) => {
  res.render("Signin");
});
router.post("/adminsignUp", admin.signUp);
router.post("/adminsignIn", admin.signIn);

module.exports = router;
