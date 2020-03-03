const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    isAdmin:{
    type: Boolean,
    default: false
    }
},{
    timestamps: true
});
const User = mongoose.model('user', userSchema)
module.exports= User