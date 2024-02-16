const userModel = require("../model/user.model");
const errorHandler = require("../utils/err");
const bcrypt = require('bcryptjs');

// logics for the user
const getUser = (req,res) => {
    res.json({
        message : "API request successful",
    });
};

const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'you can update only your account!'));
    }

    try{

        if(req.body.userPassword){
            req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);
        }

        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    userName : req.body.userName,
                    userEmail : req.body.userEmail,
                    userPassword : req.body.userPassword,
                    userPhoto : req.body.userPhoto,
                }
            },
            { new : true },
        );
        const {userPassword, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    }catch(err){
        next(err);
    }
};


const deleteUser = async(req, res, next) => {
    
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'you can delete only your account'));
    }

    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json('your account has been deleted');
    }catch(err){
        next(err);
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
};