const express = require('express');
const { getUser, updateUser, deleteUser } = require('../controller/user.controller');
const verifyUser = require('../utils/verifyUser');

const UserRouter = express.Router();


UserRouter.get('/', getUser);
UserRouter.post('/update/:id', verifyUser, updateUser);
UserRouter.delete('/delete/:id', verifyUser, deleteUser);


module.exports = UserRouter;