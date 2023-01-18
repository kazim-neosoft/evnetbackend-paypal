const mongoose=require('mongoose');
const userScheme=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: 1,
        maxLength: 50,
    },
    lastName:{
        type:String,
        required:true,
        unique:true,
        minLength: 1,
        maxLength: 50,
    },
    username:{
        type:String,
        required:true,
        minLength: 1,
        maxLength: 50,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

})