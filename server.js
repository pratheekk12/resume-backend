var express = require('express')   //import express
var mongoose = require('mongoose')
var cors = require('cors');
var multer = require('multer');
var app = express() ;    
var path = require("path");            


//read the environment

const dotenv = require('dotenv');
dotenv.config();

//
//for swagger documentation
//

const expressOasGenerator = require('express-oas-generator');
const { env } = require('process');

/** place handleResponses as the very first middleware for swagger*/

expressOasGenerator.handleResponses(app, {});

//configuration for data incoming
app.use(express.json(),cors())
app.use(express.static(path.join(__dirname, 'public')));

const fileStorageEngine =multer.diskStorage({
    destination : (req,file,cb)=>{
       // cb(null,'./resumes')
        cb(null, process.env.FILES_FOLDER)

    },
    filename : (req,file,cb)=>{
        console.log(req.path)
        cb(null,file.originalname);
    },
})

const upload = multer({storage : fileStorageEngine })

app.post('/hr-profiles/resume',upload.single("resume"),(req,res)=>{
    console.log(req.file.filename)
    res.send("sucess")
})



// mongoose.connect('mongodb://localhost:27017/hr-profiles')
console.log("mongo=",process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('error in connecting db',err )
    })

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
        required :[true,"email is mandatory"]
    },
    Dob :{
        type : String,
        required :true
    },
    mobile :{
        type : String,
        required :true
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
    
   
})

//create a model
const Profile = mongoose.model('Profile',profileSchema)

//tasks api
app.get('/api/profiles', (req,res)=>{
    Profile.find()
    .then((tasks)=>{
        res.json(tasks)
    })
    .catch((err)=>{
        res.json(err)
    })

})

//add a profile to db
app.post('/api/profiles',(req,res)=>{
    const body = req.body
    console.log(body)
    let profile = new Profile(body)
    console.log(Profile)
    profile.save()
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })

})

//get a profile by ID
app.get('/api/profiles/:id',(req,res)=>{
    const id =req.params.id
    Profile.findById(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.get('/api/profiles_resumes/:id',(req,res)=>{
    const id =req.params.id
    Profile.findById(id)
        .then((task)=>{
            res.json(env.FILES_FOLDER+"/"+task.resume)
        })
        .catch((err)=>{
            res.json(err)
        })
})


//update task 
app.put('/api/profiles/:id',(req,res)=>{
    const body = req.body
    const id =req.params.id
    
    Profile.findByIdAndUpdate(id,body,{new : true, runValidators: true})
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })

})

//delete a profile
app.delete('/api/profiles/:id',(req,res)=>{
    const id =req.params.id
    
    Profile.findByIdAndDelete(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })

})

app.get('/',(req,res)=>{
    res.send("welcome to our page")
})

/** place handleRequests as the very last middleware */
expressOasGenerator.handleRequests();

app.listen(process.env.PORT,()=>{
    console.log('server is running on port ',process.env.PORT)
})

