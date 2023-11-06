const productRepo = require('../repositories/productRepository.js')
const categoryRepo = require('../repositories/categoriesRepository.js')
const orderRepo = require('../repositories/orderRepository.js')
const AppError = require('../utils/AppError.js')
const {
  uploadImage,
  deleteImage,
  generatePath,
} = require('../utils/utilities.js')

const executeAdd = async (productData, productImg) => {
  const foundCategory = await categoryRepo.findCategoryByID(
    productData.categoria_id
  )

  if (foundCategory.length < 1) {
    throw new AppError('Category ID not found', 404)
  }

  const path = await uploadImage(productImg)

  const response = await productRepo.insertProduct(
    productData.descricao,
    productData.quantidade_estoque,
    productData.valor,
    productData.categoria_id,
    path
  )

  return response[0]
}

const executeEdit = async (product, id, productImg) => {
  const productFound = await productRepo.findProductByID(id)

  if (productFound.length < 1) {
    throw new AppError('Product ID not found', 404)
  }

  const generatedPath = generatePath(productFound[0].produto_imagem)

  await deleteImage(generatedPath)

  const path = await uploadImage(productImg)

  return await productRepo.updateProduct(
    product.descricao,
    product.quantidade_estoque,
    product.valor,
    product.categoria_id,
    path,
    id
  )
}

const executeListProductsByCategory = async (id) => {
  if (id < 0 || id > 9) {
    throw new AppError('Category ID not found', 404)
  }

  const response = await productRepo.findProductsByCategory(id)

  return response
}

const executeListProducts = async () => {
  const response = await productRepo.listProducts()

  return response
}

const executeGetProduct = async (id) => {
  const response = await productRepo.findProductByID(id)

  if (response.length < 1) {
    throw new AppError('Product not found', 404)
  }

  return response[0]
}

const executeDeleteProduct = async (id) => {
  const productFound = await productRepo.findProductByID(id)

  if (productFound.length < 1) {
    throw new AppError('Product ID not found', 404)
  }

  const productOrdered = await orderRepo.findProduct(id)

  if (productOrdered.length > 1) {
    throw new AppError('This product has unfinished orders', 400)
  }

  const path = generatePath(productFound[0].produto_imagem)

  await deleteImage(path)

  await productRepo.deleteProductByID(id)
}

module.exports = {
  executeAdd,
  executeEdit,
  executeListProductsByCategory,
  executeListProducts,
  executeGetProduct,
  executeDeleteProduct,
}
