const connection = require('../../database/connection');
// const messages = require('../../resources/messages');

module.exports = {
  async assign(projectId, userId) {
    try {
      await connection('assigned_projects').insert({
        user_id: userId,
        project_id: projectId,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
};
