const knex = require('../config/config')

const findByEmail = async (email, cpf) => {
  return await knex('clientes').where('email', email).orWhere('cpf', cpf)
}

const insertClient = async (
  nome,
  email,
  cpf,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  estado
) => {
  return await knex('clientes')
    .returning('*')
    .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
}

const findByID = async (id) => {
  return await knex('clientes').where('id', id)
}

const findByEmailOrCpfAndFilterByID = async (email, cpf, id) => {
  return await knex('clientes')
    .where(knex.raw('(email = ? OR cpf = ?)', [email, cpf]))
    .andWhere('id', '!=', id)
}

const updateClient = async (
  nome,
  email,
  cpf,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  estado,
  id
) => {
  return await knex('clientes')
    .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .where('id', id)
}

const listClients = async () => {
  return await knex('clientes')
}
module.exports = {
  findByEmail,
  insertClient,
  findByID,
  findByEmailOrCpfAndFilterByID,
  updateClient,
  listClients,
}
