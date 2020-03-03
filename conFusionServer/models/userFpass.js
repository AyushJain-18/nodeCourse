let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportlocalMongoose = require('passport-local-mongoose');

let userPass = new Schema({
   // we dont require username and password as they will be automatically be added by 
   // passport local mongoose plugin
    isAdmin: {
        type: Boolean,
        default: false
    }
})
userPass.plugin(passportlocalMongoose);
 const user = mongoose.model('userForPass',userPass)
 module.exports = user