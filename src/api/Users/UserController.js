const { v4: uuidv4 } = require('uuid');
const connection = require('../../database/connection');
const userService = require('./UserService');
const messages = require('../../resources/messages');

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (await userService.verifyEmail(email)) {
      return res.status(409).json({ message: messages.EMAIL_EXISTS });
    }

    const id = uuidv4();
    const hash = userService.hashPassword(password);

    try {
      await connection('users').insert({
        id,
        name,
        email,
        password: hash,
      });

      return res.status(201).json({ id, name, email });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const users = await connection('users').select('id', 'name', 'email', 'is_confirmed', 'is_super');

      return res.json({ users });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await connection('users')
        .select('id', 'name', 'email', 'is_confirmed', 'is_super')
        .where('id', id);

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const isUpdated = await connection('users').where('id', id).update(body);

      if (!isUpdated > 0) {
        return res.status(404).json({ message: messages.USER_NOT_FOUND });
      }

      const user = await connection('users')
        .select('id', 'name', 'email', 'is_confirmed', 'is_super')
        .where('id', id);

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await connection('users').where('id', id).del();

      if (!user > 0) {
        return res.status(404).json({ message: messages.USER_NOT_FOUND });
      }

      return res.json({ id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
