const userService = require('../services/userService')
const AppError = require('../utils/AppError')

const signUp = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const response = await userService.executeSignUp(nome, email, senha)

    return res.status(201).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: error.message })
  }
}

const logIn = async (req, res) => {
  const { email, senha } = req.body

  try {
    const response = await userService.executeLogIn(email, senha)

    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: error.message })
  }
}

const getUser = async (req, res) => {
  const { id } = req.locals
  try {
    const response = await userService.executeGetUser(id)

    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

const editUser = async (req, res) => {
  const { id } = req.locals
  const { nome, email, senha } = req.body

  try {
    await userService.executeEditUser(id, nome, email, senha)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { signUp, logIn, getUser, editUser }
