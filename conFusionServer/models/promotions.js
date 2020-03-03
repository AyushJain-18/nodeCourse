const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const promotionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:String,
        required:true
    }
},{
    timestamps: true
});

let Promotions = mongoose.model('promotion', promotionSchema);

module.exports = Promotions;