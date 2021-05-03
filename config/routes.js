const express = require('express')
const router = express.Router()
const profileController = require('../app/controllers/profilesController')
const usersController = require('../app/controllers/usersController')

//Profiles Api routes
router.post('/api/profiles',profileController.create)
router.get('/api/profiles',profileController.list)
router.get('/api/profiles/:id',profileController.show)
router.put('/api/profiles/:id',profileController.profileUpdate)

//User Authentication Api routes
router.post('/api/users/register',usersController.register)
router.post('/api/users/login',usersController.login)



module.exports = router