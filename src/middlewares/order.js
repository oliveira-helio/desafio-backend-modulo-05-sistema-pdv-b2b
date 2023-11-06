const joi = require('joi')

const validateFields = async (req, res, next) => {
  try {
    const orderSchema = joi
      .object({
        cliente_id: joi.number().required(),
        pedido_produtos: joi.array().required().min(1).items({
          produto_id: joi.number().required(),
          quantidade_produto: joi.number().required(),
        }),
        observacao: joi.string().allow(null),
      })
      .messages({
        'any.required': 'the field {#key} is required',
        'number.base': '{#key} must be a number',
        'array.base': '{#key} must be an array',
        'array.min': '{#key} cannot be empty',
        'string.base': '{#key} must be a string',
      })

    await orderSchema.validateAsync(req.body)

    next()
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ error: error.details[0].message })
    }
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { validateFields }
