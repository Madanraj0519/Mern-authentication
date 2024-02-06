const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');

const signUp = async(req, res) => {
    console.log(req.body);
    const {userName, userEmail, userPassword} = req.body;
    const hashPassword = bcrypt.hashSync(userPassword);
    const newUser = new userModel({userName, userEmail, userPassword : hashPassword});
   try{
    await newUser.save();
    res.status(201).json({ message : "User created and saved successfully"});
   }catch(err){
    res.status(500).json({ error : err.message });
   }
};


module.exports = signUp;