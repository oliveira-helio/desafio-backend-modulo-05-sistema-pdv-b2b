const joi = require('joi')

const validateFields = async (req, res, next) => {
  try {
    const clientSchema = joi
      .object({
        nome: joi.string().required().messages({
          'string.base': '{#key} must be a text',
        }),
        email: joi.string().email().required().messages({
          'string.base': '{#key} must be a text',
          'string.email': 'invalid {#key}',
        }),
        cpf: joi
          .string()
          .pattern(/^[0-9]+$/)
          .length(11)
          .required()
          .messages({
            'string.base': '{#key} must be a text',
            'string.length': '{#key} must have 11 characters',
            'string.pattern.base': '{#key} must contain only numbers',
          }),
        cep: joi
          .string()
          .pattern(/^[0-9]+$/)
          .length(8)
          .allow(null)
          .messages({
            'string.base': '{#key} must be a text',
            'string.length': '{#key} must have 8 characters',
            'string.pattern.base': '{#key} must contain only numbers',
          }),
        rua: joi.string().messages({
          'string.base': '{#key} must be a text',
        }),
        numero: joi
          .string()
          .pattern(/^[0-9]+$/)
          .allow(null)
          .messages({
            'string.base': '{#key} must be a text',
            'string.pattern.base': '{#key} must contain only numbers',
          }),
        bairro: joi.string().allow(null).messages({
          'string.base': '{#key} must be a text',
        }),
        cidade: joi.string().allow(null).messages({
          'string.base': '{#key} must be a text',
        }),
        estado: joi.string().length(2).allow(null).messages({
          'string.base': '{#key} must be a text',
          'string.length': '{#key} must have 2 characters',
        }),
      })
      .messages({ 'any.required': 'the field {#key} is required' })

    await clientSchema.validateAsync(req.body)

    next()
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ error: error.details[0].message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { validateFields }
