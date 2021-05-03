const { findOne } = require('../models/users')
const User = require('../models/users')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersController ={}

usersController.register =(req,res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

usersController.login =(req,res)=>{
    const body = req.body
    User.findOne({email : body.email})
    .then((user)=>{
        if(user){
            //res.json(user)
            bycrpt.compare(body.password,user.password)
                .then((result)=>{
                    // res.send(result)
                    if(result){
                        //res.send("email password matches")
                        const tokenData ={
                            id : user._id
                        }
                        const token = jwt.sign(tokenData,'grssl@123',{expiresIn : '2d'})
                        res.json({
                            token : token,
                            userID:user._id,
                            username
                        })
                    }else {
                        res.send('password does not match')
                    }
                })
                .catch((err)=>{
                    res.json(err)
                })
        }else{
            res.json({error : 'Invalid email /password'})
        }
    })
    .catch((err)=>{
        res.json(err)
    })

}

module.exports = usersController