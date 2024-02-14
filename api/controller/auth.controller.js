const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/err');

const signUp = async(req, res, next) => {
    console.log(req.body);
    const {userName, userEmail, userPassword} = req.body;
    const hashPassword = bcrypt.hashSync(userPassword);
    const newUser = new userModel({userName, userEmail, userPassword : hashPassword});
   try{
    await newUser.save();
    res.status(201).json({ message : "User created and saved successfully"});
   }catch(err){
    // handling middleware errors here
     next(err);
    //  handling custom error handler with the help of error handler function
    // next(errorHandler(300, 'something went wrong'));
   }
};


module.exports = signUp;