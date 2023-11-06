const { execute } = require('../services/categoriesService')
const AppError = require('../utils/AppError')

const getCategories = async (req, res) => {
  try {
    const response = await execute()

    return res.status(200).json(response)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = getCategories
