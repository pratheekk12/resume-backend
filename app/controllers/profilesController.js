const Profile = require('../models/profiles')

const profileController ={}

//To add a profile
profileController.create=(req,res)=>{
    const body = req.body
    const profile = new Profile(body)
    console.log(profile," ai ma here")
    profile.save()
        .then((profile)=>{
            console.log(profile._id)
            res.json(profile)
        })
        .catch((err)=>{
            res.json(profile)
        })
}

//Api to get all Profiles
profileController.list =(req,res)=>{
    Profile.find()
    .then((profiles)=>{
        res.json(profiles)
    })
    .catch((err)=>{
        res.json(err)
    })
}


//Api to get Particular profile
profileController.show =(req,res)=>{
    const id =req.params.id
    Profile.findById(id)
        .then((profile)=>{
            res.json(profile)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//Api to update a profile
profileController.profileUpdate=(req,res)=>{
    const body = req.body
    const id =req.params.id
    
    Profile.findByIdAndUpdate(id,body,{new : true, runValidators: true})
        .then((profile)=>{
            res.json(profile)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = profileController