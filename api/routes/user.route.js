const express = require('express');
const { getUser, updateUser } = require('../controller/user.controller');
const verifyUser = require('../utils/verifyUser');

const UserRouter = express.Router();


UserRouter.get('/', getUser);
UserRouter.post('/update/:id', verifyUser, updateUser);


module.exports = UserRouter;