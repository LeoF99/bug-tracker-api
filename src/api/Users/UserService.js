const bcrypt = require('bcryptjs');
const connection = require('../../database/connection');

module.exports = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  },

  async verifyEmail(email) {
    const bdMail = await connection('users').select('email')
      .where('email', email).first();

    if (bdMail) {
      return true;
    }
    return false;
  },
};
