const mongoose = require('mongoose')

const configureDB =() =>{
    // mongoose.connect('mongodb://localhost:27017/resume-bank',{
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(()=>{
            console.log("connected to db")
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = configureDB