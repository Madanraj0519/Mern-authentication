const express = require('express');
const signUp = require('../controller/auth.controller');
const authRouter = express.Router();

authRouter.post('/signup', signUp);

module.exports = authRouter;