require('dotenv').config()

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.NAME,
    port: process.env.DB_PORT,
  },
})

module.exports = knex
