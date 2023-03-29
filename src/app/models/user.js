const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
    unique: true,
  },
  userName: {
    type: String,
    require: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    //   enum: ["user", "admin"],
  },
});

// userSchema.virtual("password").set(function (password) {
//   this.hashPassword = bcrypt.hashSync(password, 10);
// });

// userSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

// userSchema.methods = {
//   authenticate: function (password) {
//     return bcrypt.compareSync(password, this.hashPassword);
//   },
// };

module.exports = mongoose.model("User", userSchema);
