const knex = require('../config/config')

const insertProduct = async (
  descricao,
  quantidade_estoque,
  valor,
  categoria_id,
  produto_imagem
) => {
  return await knex('produtos').returning('*').insert({
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    produto_imagem,
  })
}

const updateProduct = async (
  descricao,
  quantidade_estoque,
  valor,
  categoria_id,
  produto_imagem,
  id
) => {
  return await knex('produtos')
    .update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem,
    })
    .where('id', id)
}

const findProductByID = async (id) => {
  return await knex('produtos').where('id', id)
}

const deleteProductByID = async (id) => {
  return await knex('produtos').del().where('id', id)
}

const findProductsByCategory = async (id) => {
  return await knex('produtos').where('categoria_id', id).orderBy('id')
}

const listProducts = async () => {
  return await knex('produtos').orderBy('id')
}

module.exports = {
  insertProduct,
  updateProduct,
  findProductByID,
  deleteProductByID,
  findProductsByCategory,
  listProducts,
}
