const { v4: uuidv4 } = require('uuid');
const connection = require('../../database/connection');
const messages = require('../../resources/messages');
const AssignedProjectService = require('../Assigned_projects/AssignedProjectService');

module.exports = {
  async create(req, res) {
    // eslint-disable-next-line camelcase
    const { name, description, user_creator } = req.body;

    const id = uuidv4();

    try {
      await connection('projects').insert({
        id,
        name,
        description,
        user_creator,
      });

      const assign = AssignedProjectService.assign(id, user_creator);

      if (!assign) {
        await connection('projects').where('id', id).del();
        return res.status(500).json({ message: messages.PROJECT_NOT_CREATED });
      }

      return res.status(201).json({ id, name, user_creator });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const projects = await connection('projects').select('*');

      return res.json({ projects });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await connection('projects').select('*').where('id', id);

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const isUpdated = await connection('projects').where('id', id).update(body);

      if (!isUpdated > 0) {
        return res.status(404).json({ message: messages.PROJECT_NOT_FOUND });
      }

      const project = await connection('projects')
        .select('*')
        .where('id', id);

      return res.json({ project });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const project = await connection('projects').where('id', id).del();

      if (!project > 0) {
        return res.status(404).json({ message: messages.PROJECT_NOT_FOUND });
      }

      return res.json({ id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getProjectsByUser(req, res) {
    const { userId } = req.params;

    try {
      const projects = await connection('projects').select('*').where('user_creator', userId);

      return res.json({ projects });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
