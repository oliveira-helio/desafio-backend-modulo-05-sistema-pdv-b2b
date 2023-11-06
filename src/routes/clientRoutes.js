const { Router } = require('express')
const { validateUserToken } = require('../middlewares/user')
const { validateFields } = require('../middlewares/client')
const {
  addClient,
  listClients,
  getClient,
  editClient,
} = require('../controller/clientController')

const routes = Router()

routes.post('/', validateUserToken, validateFields, addClient)
routes.get('/', validateUserToken, listClients)
routes.get('/:id', validateUserToken, getClient)
routes.put('/:id', validateUserToken, validateFields, editClient)

module.exports = routes
