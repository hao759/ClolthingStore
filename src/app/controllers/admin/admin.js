const User = require("../../models/user");

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
  //   User.findOne({ email: req.body.email }).exec(async (error, user) => {
  //     if (error) return res.status(400).json({ error });
  //     if (user) {
  //       const isPassword = await user.authenticate(req.body.password);
  //       if (
  //         isPassword &&
  //         (user.role === "admin" || user.role === "super-admin")
  //       ) {
  //         const token = jwt.sign(
  //           { _id: user._id, role: user.role },
  //           process.env.JWT_SECRET,
  //           { expiresIn: "1d" }
  //         );
  //         const { _id, firstName, lastName, email, role, fullName } = user;
  //         res.cookie("token", token, { expiresIn: "1d" });
  //         res.status(200).json({
  //           token,
  //           user: { _id, firstName, lastName, email, role, fullName },
  //         });
  //       } else {
  //         return res.status(400).json({
  //           message: "Invalid Password",
  //         });
  //       }
  //     } else {
  //       return res.status(400).json({ message: "Something went wrong" });
  //     }
  //   });
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user)
    return res.status(200).json({
      message: "Login thanh coong",
    });
  else
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
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
  // res.render("admin/blank", { data: result });
};

exports.getUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({ _id: id }); //deletedCount
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
    console.log(req.body);
    let { _id, userName, password } = req.body._user;
    let user = await User.updateOne({ _id }, { userName, password });
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
