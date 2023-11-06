const joi = require('joi')
const jwt = require('jsonwebtoken')
const authSecret = process.env.AUTH_SECRET

const inputRequirements = async (req, res, next) => {
  try {
    const userSchema = joi
      .object({
        nome: joi.string().required().messages({
          'string.base': '{#key} must be a text',
        }),
        email: joi.string().email().required().messages({
          'string.email': 'invalid {#key}',
        }),
        senha: joi.string().min(5).required().messages({
          'string.min': '{#key} must have at least {#limit} characters',
        }),
      })
      .messages({ 'any.required': 'the field {#key} is required' })

    await userSchema.validateAsync(req.body)

    next()
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ error: error.details[0].message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

const inputLoginRequirements = async (req, res, next) => {
  try {
    const userSchema = joi
      .object({
        email: joi.string().email().required().messages({
          'string.email': 'invalid {#key}',
        }),
        senha: joi.string().min(5).required().messages({
          'string.min': '{#key} must have at least {#limit} characters',
        }),
      })
      .messages({ 'any.required': 'the field {#key} is required' })

    await userSchema.validateAsync(req.body)

    next()
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ error: error.details[0].message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

const validateUserToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ message: 'Failure to get token' })
    }

    const token = authorization.split(' ')[1]

    const validToken = await jwt.verify(token, authSecret)

    req.locals = { id: validToken.id }

    next()
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = {
  inputRequirements,
  inputLoginRequirements,
  validateUserToken,
}
