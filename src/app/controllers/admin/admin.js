const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  //   User.findOne({ email: req.body.email }).exec((err, user) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(400).json({
  //         mess: err,
  //       });
  //     }
  //   });
  const { userName, password, email } = req.body;
  //   const hashPassword = await bcrypt.hash(password, 10);
  const _user = new User({
    userName,
    password,
    email,
    isAdmin: true,
  });
  try {
    const result = await _user.save();
    return res.status(200).json({
      mess: result,
    });
  } catch (error) {
    return res.status(400).json({
      mess: error,
    });
  }
};

exports.signIn = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      message: token,
    });
  } else
    return res.status(400).json({
      message: "Something went wrong",
    });
};
exports.getListUser = async (req, res) => {
  try {
    let result = await User.find({});
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
exports.gotoadmin = async (req, res) => {
  res.render("admin/User");
};
exports.deleteUser = async (req, res) => {
  try {
    let id = req.body._id;
    let result = await User.deleteOne({ _id: id }); //deletedCount
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({ _id: id });
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
exports.updateUser = async (req, res) => {
  try {
    let { _id, userName, password } = req.body._user;
    let user = await User.updateOne({ _id }, { userName, password });
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
