const mongoose = require('mongoose');

const UserSchema= mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email:{type:String, required: true},    
    password:{type:String, required: true},
    phone: {type: Number, required: true},
    social:{
        facebook :{type:String, default:""},
        instagram :{type:String, default:""},
        youtube :{type:String, default:""},
    },
        dateJoined: {type: Date, default: Date.now, required: true},
});


// Exporting the model UserModel that will use the schema of UserSchema
module.exports = mongoose.model('Users', UserSchema);