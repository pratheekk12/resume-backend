const mongoose = require('mongoose')


//create a mongo schema
const Schema = mongoose.Schema

const logSchema = new Schema({
    userID : {
        type : String,
    },
    userName : {
        type :String,
        required : true
    },
    profileID : {
        type : String,
    },
    action : {
        type : String,
    },
    created_At : {
        type: Date, 
        required: true, 
        default: Date.now 
    }

})

const Log = mongoose.model('Log', logSchema)

module.exports =Log