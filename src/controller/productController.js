require('dotenv').config()
const productService = require('../services/productServices.js')
const { uploadFile } = require('../services/storage.js')
const AppError = require('../utils/AppError')

const addProduct = async (req, res) => {
  const { files } = req
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body

  try {
    const { body, file } = req

    const response = await productService.executeAdd(body, file)

    return res.status(201).json(response)
  } catch (error) {
    console.log(error.message)
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: error.message })
  }
}

const editProduct = async (req, res) => {
  try {
    const { body, file } = req

    await productService.executeEdit(body, req.params.id, file)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: error.message })
  }
}

const getProduct = async (req, res) => {
  try {
    const response = await productService.executeGetProduct(req.params.id)

    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

const listProducts = async (req, res) => {
  try {
    if (req.query.categoria_id) {
      var response = await productService.executeListProductsByCategory(
        req.query.categoria_id
      )
    }

    if (!req.query.categoria_id) {
      response = await productService.executeListProducts()
    }

    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Server error' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    await productService.executeDeleteProduct(req.params.id)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  addProduct,
  editProduct,
  getProduct,
  deleteProduct,
  listProducts,
}
