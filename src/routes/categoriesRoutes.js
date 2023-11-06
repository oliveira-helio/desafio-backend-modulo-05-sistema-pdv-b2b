const { Router } = require('express')

const getCategories = require('../controller/categoriesController')

const routes = Router()

routes.get('/', getCategories)

module.exports = routes
