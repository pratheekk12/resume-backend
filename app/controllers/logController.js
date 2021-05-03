const Log = require('../models/logs')

const logController ={}

logController.create =(req,res)=>{
    const body = req.body
    //console.log(body)
    const log = new Log(body)
    // console.log(log)
    log.save()
    .then((log)=>{
        res.json(log)
    })
    .catch((err)=>{
        res.json(log)
    })
}

logController.getlog =(req,res)=>{
    const id =req.params.id
    console.log(req.params)
    // Log.find({ profileID: id })
    // .then((res)=>{
    //     res.json(res)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
   
}

logController.show =(req,res)=>{
    const id = req.body.id
    Log.find({"profileID":id})
        .then((profile)=>{
            res.json(profile)
        })
        .catch((err)=>{
            res.json(err)
        })
}





module.exports = logController