const express = require('express');
const { getUser } = require('../controller/user.controller');

const UserRouter = express.Router();


UserRouter.get('/', getUser);


module.exports = UserRouter;