const { Router } = require('express')
const { validateUserToken } = require('../middlewares/user')
const { validateFields } = require('../middlewares/order')
const { createOrder, listOrders } = require('../controller/orderController')

const routes = Router()

routes.post('/', validateUserToken, validateFields, createOrder)
routes.get('/', validateUserToken, listOrders)

module.exports = routes
