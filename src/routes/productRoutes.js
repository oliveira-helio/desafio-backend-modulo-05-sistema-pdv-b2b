const { Router } = require('express')
const { validateUserToken } = require('../middlewares/user')
const {
  inputProductRequirements,
  validateParamsID,
} = require('../middlewares/product')
const {
  addProduct,
  editProduct,
  deleteProduct,
  listProducts,
  getProduct,
} = require('../controller/productController')
const multer = require('../middlewares/multer')

const routes = Router()

routes.post(
  '/',
  multer.single('produto_imagem'),
  validateUserToken,
  inputProductRequirements,
  addProduct
)
routes.put(
  '/:id',
  multer.single('produto_imagem'),
  validateUserToken,
  validateParamsID,
  inputProductRequirements,
  editProduct
)
routes.get('/', validateUserToken, listProducts)
routes.get('/:id', validateUserToken, validateParamsID, getProduct)
routes.delete('/:id', validateUserToken, validateParamsID, deleteProduct)
routes.delete('/:id/test', validateUserToken, validateParamsID, deleteProduct)

module.exports = routes
