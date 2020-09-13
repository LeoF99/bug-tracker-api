const jwt = require('jsonwebtoken');
const connection = require('../../database/connection');
const messages = require('../../resources/messages');
const AuthService = require('./AuthService');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await connection('users').where('email', email).select('*');

    if (!user.length) return res.status(404).json({ error: messages.USER_NOT_FOUND });

    if (!AuthService.checkPassword(user[0].password, password)) {
      return res.status(401).json({ error: messages.INCORRECT_PASSWORD });
    }

    // if (!user[0].is_confirmed) return res.json({ message: messages.USER_NOT_CONFIRMED });
    delete user[0].password;
    const tokenSecret = process.env.TOKEN_SECRET;

    return jwt.sign({ user }, tokenSecret, { expiresIn: '10h' }, (err, token) => {
      res.json({ user, token });
    });
  },

  verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader === 'undefined') {
      return res.status(403).json({ message: messages.FORBIDDEN });
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    const tokenSecret = process.env.TOKEN_SECRET;
    return jwt.verify(bearerToken, tokenSecret, (err) => {
      if (err) return res.status(403).json({ message: messages.FORBIDDEN });

      return next();
    });
  },
};
