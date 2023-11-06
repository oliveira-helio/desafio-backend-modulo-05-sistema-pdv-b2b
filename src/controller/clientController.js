const clientService = require('../services/clientService.js')
const AppError = require('../utils/AppError')

const addClient = async (req, res) => {
  try {
    const response = await clientService.executeAdd(req.body)

    return res.status(201).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

const listClients = async (req, res) => {
  try {
    const response = await clientService.executeList()

    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

const getClient = async (req, res) => {
  try {
    const { id } = req.params

    const response = await clientService.executeGetClient(id)

    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

const editClient = async (req, res) => {
  try {
    await clientService.executeEdit(req.body, req.params)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { addClient, listClients, getClient, editClient }
