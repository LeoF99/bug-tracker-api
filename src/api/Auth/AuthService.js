const bcrypt = require('bcryptjs');

module.exports = {
  checkPassword(hash, password) {
    if (bcrypt.compareSync(password, hash)) return true;
    return false;
  },
};
