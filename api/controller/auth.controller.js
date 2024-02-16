const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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


const signIn = async (req, res, next) => {
    const {userEmail, userPassword} = req.body;
   try{
    const validUser = await userModel.findOne({userEmail});
    if(!validUser){
        return next(errorHandler(404, 'user not found'));
    }
    //comparing the password which is coming from the request and in the database
    const validPassword = bcrypt.compareSync(userPassword, validUser.userPassword);
    if(!validPassword){
        return next(errorHandler(401, 'Invalid credentials'));
    }
    const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET);
    /* Just hidding the password from the client side for the security purpose*/
    const {userPassword : hashPassword, ...restDetails} = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res.cookie('access_token', token, {httpOnly: true, expires : expiryDate}).
    status(200).
    json(restDetails);
   }catch(err){
    next(err)
   }
};

const google = async (req, res, next) => {
    try{
        const user = await userModel.findOne({userEmail : req.body.userEmail})
        if(user){
            const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET);
            const {userPassword : hashPassword, ...rest} = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, {httpOnly: true, expires : expiryDate}).status(200).json(rest);
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatePassword, 10);
            const newUser = new userModel({
                userName : req.body.userName.
                     split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                userEmail : req.body.userEmail,
                userPassword : hashPassword,
                userPhoto  : req.body.userPhoto
            });
            await newUser.save();
            const token = jwt.sign({ id : newUser._id}, process.env.JWT_SECRET);
            const {userPassword : hashPassword2, ...rest} = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, {httpOnly: true, expires : expiryDate}).status(200).json(rest);
        }
    }catch(err){
        next(err);
    }
}

module.exports = signUp;
module.exports = signIn;
module.exports = google;