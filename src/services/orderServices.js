const orderRepo = require('../repositories/orderRepository.js')
const clientRepo = require('../repositories/clientRepository')
const AppError = require('../utils/AppError')
const SMTP = require('../config/mail')
const {
  htmlCompiler,
  processOrder,
  updateStock,
} = require('../utils/utilities.js')

const executeCreateOrder = async (clientID, orderProducts, obs) => {
  const clientAvailable = await clientRepo.findByID(clientID)

  if (clientAvailable.length < 1) {
    throw new AppError('Client not found', 404)
  }

  const orderValue = await processOrder(orderProducts)

  const orderBasics = await orderRepo.create(clientID, obs, orderValue)

  const order = await updateStock(orderProducts, orderBasics[0])

  const html = await htmlCompiler('./src/templates/order.html', {
    username: clientAvailable[0].nome,
    orderID: order.id,
    totalValue: order.valor_total,
  })

  SMTP.sendMail({
    from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
    to: `${clientAvailable[0].nome} <${clientAvailable[0].email}>`,
    subject: 'Order Created',
    html,
  })

  return order
}

const executeListOrders = async () => {
  const orders = await orderRepo.listOrders()

  const response = []

  for (let order of orders) {
    const orderProducts = await orderRepo.listProductsByOrder(order.id)

    const completeOrder = {
      pedido: order,
      pedido_produtos: orderProducts,
    }

    response.push(completeOrder)
  }

  return response
}

const executeListOrdersByClient = async (clientID) => {
  const orders = await orderRepo.listOrdersByClient(clientID)

  const response = []

  for (let order of orders) {
    const orderProducts = await orderRepo.listProductsByOrder(order.id)

    const completeOrder = {
      pedido: order,
      pedido_produtos: orderProducts,
    }

    response.push(completeOrder)
  }

  return response
}

module.exports = {
  executeCreateOrder,
  executeListOrders,
  executeListOrdersByClient,
}
