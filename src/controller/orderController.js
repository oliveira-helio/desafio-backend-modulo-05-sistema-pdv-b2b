const orderService = require('../services/orderServices.js')
const AppError = require('../utils/AppError')

const createOrder = async (req, res) => {
  try {
    const { cliente_id, pedido_produtos, observacao } = req.body
    const response = await orderService.executeCreateOrder(
      cliente_id,
      pedido_produtos,
      observacao
    )

    return res.status(201).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json(error.message)
    return res.status(500).json({ message: 'Server error' })
  }
}

const listOrders = async (req, res) => {
  try {
    const { cliente_id } = req.query

    if (!cliente_id) {
      const response = await orderService.executeListOrders()

      return res.status(201).json(response)
    }

    const response = await orderService.executeListOrdersByClient(cliente_id)

    return res.status(201).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  createOrder,
  listOrders,
}
