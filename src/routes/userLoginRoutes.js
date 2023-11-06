const { Router } = require('express')
const { inputLoginRequirements } = require('../middlewares/user')
const { logIn } = require('../controller/userController')

const routes = Router()

routes.post('/', inputLoginRequirements, logIn)

module.exports = routes
