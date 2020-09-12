const express = require('express');

const UserController = require('./api/Users/UserController');
const ProjectController = require('./api/Projects/ProjectController');
const BugsController = require('./api/Bugs/BugsController');

const routes = express.Router();

// users routes
routes.post('/users', UserController.create); // create
routes.get('/users', UserController.index); // index
routes.get('/users/:id', UserController.show); // show
routes.put('/users/:id', UserController.update); // update
routes.delete('/users/:id', UserController.delete); // delete

// projects routes
routes.post('/projects', ProjectController.create); // create
routes.get('/projects', ProjectController.index); // index
routes.get('/projects/:id', ProjectController.show); // show
routes.put('/projects/:id', ProjectController.update); // update
routes.delete('/projects/:id', ProjectController.delete); // delete

// bugs routes
routes.post('/bugs', BugsController.create); // create
routes.get('/bugs', BugsController.index); // index
routes.get('/bugs/:id', BugsController.show); // show
routes.put('/bugs/:id', BugsController.update); // update
routes.delete('/bugs/:id', BugsController.delete); // delete

module.exports = routes;
