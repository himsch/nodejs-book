const {odd, even} = require('./var');

function checkOddEven(number) {
  if (number % 2) {
    return even;
  }
  return odd;
}