const bcrypt = require("bcrypt");

const encrypt = async (text) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(text, 10, (err, hash) => {
      resolve(hash);
    });
  });

const decrypt = async (password, hash) =>
  Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

module.exports = {
  encrypt,
  decrypt,
};
