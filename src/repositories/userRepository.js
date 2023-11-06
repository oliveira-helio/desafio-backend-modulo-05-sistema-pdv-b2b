const knex = require('../config/config')

const findByEmail = async (email) => {
  return await knex('usuarios').where('email', email)
}

const insertUser = async (nome, email, senha) => {
  return await knex('usuarios').insert({ nome, email, senha }).returning('*')
}

const findByID = async (id) => {
  return await knex('usuarios').where('id', id)
}

const findByEmailAndFilterByID = async (email, id) => {
  return await knex('usuarios').where('email', email).andWhere('id', '!=', id)
}

const updateUser = async (nome, email, senha, id) => {
  return await knex('usuarios').update({ nome, email, senha }).where('id', id)
}

module.exports = {
  findByEmail,
  insertUser,
  findByID,
  findByEmailAndFilterByID,
  updateUser,
}
