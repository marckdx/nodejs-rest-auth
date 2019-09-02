const express = require('express');
const validation = require('./src/utils/private')

const routes = express.Router();

const UserController = require('./src/controllers/UserController')
routes.post('/api/user/login', UserController.login)
routes.post('/api/user/register', UserController.register)
routes.post('/api/user/current', validation, UserController.getLoggedUser)
routes.post('/api/users', validation, UserController.getAllUsers)
module.exports = routes;