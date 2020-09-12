const { v4: uuidv4 } = require('uuid');
const connection = require('../../database/connection');
const messages = require('../../resources/messages');

module.exports = {
  async create(req, res) {
    const id = uuidv4();
    req.body.id = id;

    try {
      await connection('bugs').insert(req.body);

      return res.status(201).json(req.body);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const bugs = await connection('bugs').select('*');

      return res.json({ bugs });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const bug = await connection('bugs').select('*').where('id', id);

      return res.json({ bug });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const isUpdated = await connection('bugs').where('id', id).update(body);

      if (!isUpdated > 0) {
        return res.status(404).json({ message: messages.BUG_NOT_FOUND });
      }

      const bug = await connection('bugs')
        .select('*')
        .where('id', id);

      return res.json({ bug });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const bug = await connection('bugs').where('id', id).del();

      if (!bug > 0) {
        return res.status(404).json({ message: messages.BUG_NOT_FOUND });
      }

      return res.json({ id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
