const knex = require('../config/config')

const create = async (cliente_id, observacao, valor_total) => {
  return await knex('pedidos')
    .returning('*')
    .insert({ cliente_id, observacao, valor_total })
}

const insertOrderProduct = async (
  pedido_id,
  produto_id,
  quantidade_produto,
  valor_produto
) => {
  return await knex('pedido_produtos')
    .returning('*')
    .insert({ pedido_id, produto_id, quantidade_produto, valor_produto })
}

const listOrders = async () => {
  return await knex('pedidos')
}

const listOrdersByClient = async (clientID) => {
  return await knex('pedidos').where('cliente_id', clientID)
}

const listProductsByOrder = async (id) => {
  return await knex('pedido_produtos').where('pedido_id', id)
}

const findProduct = async (id) => {
  return await knex('pedido_produtos').where('produto_id', id)
}

module.exports = {
  create,
  insertOrderProduct,
  listOrders,
  listProductsByOrder,
  listOrdersByClient,
  findProduct,
}
