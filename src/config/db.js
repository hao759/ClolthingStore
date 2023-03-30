const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.URL_MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
    console.log(error);
  }
}

module.exports = { connect };
