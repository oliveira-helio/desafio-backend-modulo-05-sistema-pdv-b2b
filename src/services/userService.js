const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepo = require('../repositories/userRepository')
const AppError = require('../utils/AppError')
const authSecret = process.env.AUTH_SECRET

const executeSignUp = async (nome, email, senha) => {
  const duplicateEmail = await userRepo.findByEmail(email)

  if (duplicateEmail.length > 0) {
    throw new AppError(
      'There is already a registered user with the entered email.',
      400
    )
  }

  const encryptedPassword = await bcrypt.hash(senha, 10)

  const newUser = await userRepo.insertUser(nome, email, encryptedPassword)

  const { senha: _, ...user } = newUser[0]

  return user
}

const executeLogIn = async (email, senha) => {
  const getUser = await userRepo.findByEmail(email)

  if (getUser.length < 1) {
    throw new AppError('Incorrect email or password.', 401)
  }

  const validPassword = await bcrypt.compare(senha, getUser[0].senha)

  if (!validPassword) {
    throw new AppError('Incorrect email or password.', 401)
  }

  const token = await jwt.sign({ id: getUser[0].id }, authSecret, {
    expiresIn: '8h',
  })

  // eslint-disable-next-line no-unused-vars
  const { senha: _, ...authenticatedUser } = getUser[0]

  return { usuario: authenticatedUser, token }
}

const executeGetUser = async (id) => {
  const user = await userRepo.findByID(id)

  // eslint-disable-next-line no-unused-vars
  const { senha: _, ...authenticatedUser } = user[0]

  return authenticatedUser
}

const executeEditUser = async (id, nome, email, senha) => {
  const duplicateEmail = await userRepo.findByEmailAndFilterByID(email, id)

  if (duplicateEmail.length > 0) {
    throw new AppError(
      'There is already a registered user with the entered email.',
      400
    )
  }

  const encryptedPassword = await bcrypt.hash(senha, 10)

  await userRepo.updateUser(nome, email, encryptedPassword, id)
}

module.exports = {
  executeSignUp,
  executeLogIn,
  executeGetUser,
  executeEditUser,
}
