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

  async unassign(userId, projectId) {
    try {
      const del = await connection('assigned_projects')
        .where('user_id', userId)
        .where('project_id', projectId)
        .del();

      return del;
    } catch (error) {
      return false;
    }
  },
};
