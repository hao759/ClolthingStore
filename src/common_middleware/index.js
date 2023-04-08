const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(token);
  } else {
    console.log("456");
    return res.status(400).json({
      mess: "Can dang nhap",
    }); //Authorization required
  }
  next();
  //jwt.decode()
};
exports.adminMiddleware = (req, res, next) => {
  console.log(req.user);
  if (req.user.isAdmin != true) {
    return res.status(400).json({
      mess: "Chỉ có  admin mới có quyền này",
    });
  }
  console.log("===OK=====");
  next();
};
