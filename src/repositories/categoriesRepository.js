const knex = require('../config/config')

const findAll = async () => {
  return await knex.select().from('categorias')
}

const findCategoryByID = async (id) => {
  return await knex('categorias').where('id', id)
}

module.exports = {
  findAll,
  findCategoryByID,
}
