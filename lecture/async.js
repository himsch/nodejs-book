const fs = require("fs");

fs.readFileSync("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1", data.toString());
});

fs.readFileSync("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("2", data.toString());
});

fs.readFileSync("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("3", data.toString());
});

fs.readFileSync("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("4", data.toString());
});
