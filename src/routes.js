const express = require('express');

const UserController = require('./api/Users/UserController');
const ProjectController = require('./api/Projects/ProjectController');
const BugsController = require('./api/Bugs/BugsController');
const AuthController = require('./api/Auth/AuthController');

const routes = express.Router();

// users routes
routes.post('/users', AuthController.verifyToken, UserController.create); // create
routes.get('/users', AuthController.verifyToken, UserController.index); // index
routes.get('/users/:id', AuthController.verifyToken, UserController.show); // show
routes.put('/users/:id', AuthController.verifyToken, UserController.update); // update
routes.delete('/users/:id', AuthController.verifyToken, UserController.delete); // delete

routes.get('/users/projects/:id', AuthController.verifyToken, ProjectController.getProjectsByUser); // get projects by user
routes.get('/users/bugs/created/:id', AuthController.verifyToken, BugsController.getBugsByUserCreator); // get bugs by user creator
routes.get('/users/bugs/assigned/:id', AuthController.verifyToken, BugsController.getBugsByUserAssigned); // get bugs by user assigned

// projects routes
routes.post('/projects', AuthController.verifyToken, ProjectController.create); // create
routes.get('/projects', AuthController.verifyToken, ProjectController.index); // index
routes.get('/projects/:id', AuthController.verifyToken, ProjectController.show); // show
routes.put('/projects/:id', AuthController.verifyToken, ProjectController.update); // update
routes.delete('/projects/:id', AuthController.verifyToken, ProjectController.delete); // delete

routes.get('/projects/bugs/:id', AuthController.verifyToken, BugsController.getBugsByProject); // get bugs by project

// bugs routes
routes.post('/bugs', AuthController.verifyToken, BugsController.create); // create
routes.get('/bugs', AuthController.verifyToken, BugsController.index); // index
routes.get('/bugs/:id', AuthController.verifyToken, BugsController.show); // show
routes.put('/bugs/:id', AuthController.verifyToken, BugsController.update); // update
routes.delete('/bugs/:id', AuthController.verifyToken, BugsController.delete); // delete

// auth routes
routes.post('/auth/login', AuthController.login); // login

module.exports = routes;
