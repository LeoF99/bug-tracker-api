const express = require('express');

const UserController = require('./api/Users/UserController');

const routes = express.Router();

// users routes
routes.post('/users', UserController.create); // create
routes.get('/users', UserController.index); // index
routes.get('/users/:id', UserController.show); // show
routes.put('/users/:id', UserController.update); // update
routes.delete('/users/:id', UserController.delete); // delete

module.exports = routes;
