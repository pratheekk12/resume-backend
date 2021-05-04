const mongoose = require('mongoose')


//create a mongo schema
const Schema = mongoose.Schema
const profileSchema = new Schema({
    firstName : {
        type : String,
        // required :true
        required :[true,"First Name is mandatory"]
    },
    lastName : {
        type : String,
        // required :true
        required :[true,"last Name is mandatory"]
    },
    email : {
        type : String,
        // required :true
        required : [true,'Your Profile has been Already Submitted'],
        unique :true
    },
    Dob :{
        type : String,
        required :true
    },
    mobile :{
        type : String,
        required : [true,'Your Profile has been Already Submitted'],
        unique :true
    },
    alternatemob :{
        type : String,
        required :true
    },
    role :{
        type : String,
        required :true
    },
    experience :{
        type : String,
        required :true
    },
    graduation :{
        type : String,
        required :true
    },
    backlogs :{
        type : String,
        required :true
    },
    ctc :{
        type : String,
        required :true
    },
    joining :{
        type : String,
        required :true,
       
    },
    prrofileStatus :{
        type : String,
        required :true,
        default: "Applied"
    },
    sourceIp :{
        type : String,
        required :false,
        default: ""

    },
    resume :{
        type : String,
        required :false,
        default: ""
    },
    created_At    : { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    updated_At    : { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    reason_reject    : { 
        type: String,  
        default: ""
    },
    reference    : { 
        type: String,  
        default: ""
    },
    jobcode : {
        type : String,
        //required :true
    },
    uniqID : {
        type : String,
        // required : [true,'username is required'],
        unique :true
    }
})


 

const Profile = mongoose.model('Profile', profileSchema)


module.exports = Profile