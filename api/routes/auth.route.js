const express = require('express');
const signUp = require('../controller/auth.controller');
const authRouter = express.Router();

authRouter.post('/sign-up', signUp);

module.exports = authRouter;