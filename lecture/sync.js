const fs = require("fs");

const data1 = fs.readFileSync("./readme.txt");
console.log("1", data1.toString());

const data2 = fs.readFileSync("./readme.txt");
console.log("2", data2.toString());

const data3 = fs.readFileSync("./readme.txt");
console.log("3", data3.toString());

const data4 = fs.readFileSync("./readme.txt");
console.log("4", data4.toString());
