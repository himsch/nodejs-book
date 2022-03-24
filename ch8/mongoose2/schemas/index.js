const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    `mongodb://${process.env.MONGODB_ID}:${process.env.MONGODB_PW}@localhost:27017/admin`,
    {
      dbName: "nodejs",
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};

module.exports = connect;
