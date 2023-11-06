const { Router } = require('express')
const { inputRequirements, validateUserToken } = require('../middlewares/user')
const { signUp, getUser, editUser } = require('../controller/userController')

const routes = Router()

routes.post('/', inputRequirements, signUp)
routes.get('/', validateUserToken, getUser)
routes.put('/', inputRequirements, validateUserToken, editUser)

module.exports = routes
