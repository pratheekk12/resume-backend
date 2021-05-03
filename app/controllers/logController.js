const Log = require('../models/logs')

const logController ={}

logController.create =(req,res)=>{
    const body = req.body
    const log = new Log(body)
    log.save()
    .then((log)=>{
        res.json(log)
    })
    .catch((err)=>{
        res.json(log)
    })
}

// logController.getlog =(req,res)=>{
//     const id =req.params.id
//     console.log(id)
//     Log.find({ profileID: '608f931e2d17a73f2ea04a4e' })
//     .then((res)=>{
//         res.json(res)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
   
// }





module.exports = logController