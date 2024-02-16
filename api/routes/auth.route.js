const express = require('express');
const signUp = require('../controller/auth.controller');
const signIn = require('../controller/auth.controller');
const google = require('../controller/auth.controller');
const signOut = require('../controller/auth.controller');
const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/google', google);
authRouter.get('/signout', signOut);

module.exports = authRouter;