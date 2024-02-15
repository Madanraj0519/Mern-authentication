const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : 'string',
        required : true,
        unique : true,
    },    
    userEmail : {
        type : 'string',
        required : true,
        unique : true,
    },    
    userPassword : {
        type : 'string',
        required : true,
    }, 
    userPhoto : {
        type : 'string',
        default : 'https://cdn-icons-png.flaticon.com/128/236/236832.png',
    }   
        

}, {timestamps: true});  //Create a automatically time to the user when its created


module.exports = mongoose.model('User', userSchema);