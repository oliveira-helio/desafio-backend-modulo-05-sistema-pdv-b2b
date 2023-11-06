const joi = require('joi')

const inputProductRequirements = async (req, res, next) => {
  try {
    const productDataSchema = joi
      .object({
        descricao: joi.string().required().messages({
          'string.base': '{#key} must be a text',
        }),
        quantidade_estoque: joi.number().positive().required(),
        valor: joi.number().positive().required(),
        categoria_id: joi.number().required(),
        produto_imagem: joi.allow(null),
      })
      .messages({
        'any.required': 'the field {#key} is required',
        'number.base': '{#key} must be a number',
        'number.positive': '{#key} must be a positive number',
      })

    await productDataSchema.validateAsync(req.body)

    next()
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ error: error.details[0].message })
    }

    return res.status(500).json({ message: 'Server error' })
  }
}

const validateParamsID = async (req, res, next) => {
  try {
    const paramsSchema = joi.object({
      id: joi.number().messages({
        'number.base': '{#key} param must be a number',
      }),
    })
    await paramsSchema.validateAsync(req.params)

    next()
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ error: error.details[0].message })
    }

    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  inputProductRequirements,
  validateParamsID,
}
