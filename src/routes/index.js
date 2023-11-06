const { Router } = require('express')

const categoriesRoutes = require('./categoriesRoutes')
const userRoutes = require('./userRoutes')
const userLoginRoutes = require('./userLoginRoutes')
const clientRoutes = require('./clientRoutes')
const productRoutes = require('./productRoutes')
const orderRoutes = require('./orderRoutes')

const routes = Router()

routes.use('/usuario', userRoutes)
routes.use('/categoria', categoriesRoutes)
routes.use('/login', userLoginRoutes)
routes.use('/cliente', clientRoutes)
routes.use('/produto', productRoutes)
routes.use('/pedido', orderRoutes)

module.exports = routes
