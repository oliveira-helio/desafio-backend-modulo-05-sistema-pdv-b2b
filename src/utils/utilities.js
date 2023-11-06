const orderRepo = require('../repositories/orderRepository.js')
const productRepo = require('../repositories/productRepository')
const AppError = require('../utils/AppError')
const handlebars = require('handlebars')
const fs = require('fs/promises')
const { s3 } = require('../config/aws.js')

const treatClientData = async (client) => {
  const newData = {
    nome: client.nome || null,
    email: client.email || null,
    cpf: client.cpf || null,
    cep: client.cep || null,
    rua: client.rua || null,
    numero: client.numero || null,
    bairro: client.bairro || null,
    cidade: client.cidade || null,
    estado: client.estado || null,
  }

  return newData
}

const htmlCompiler = async (file, context) => {
  const htmlFile = await fs.readFile(file)

  const compiler = handlebars.compile(htmlFile.toString())

  const htmlString = compiler(context)

  return htmlString
}

const processOrder = async (orderProducts) => {
  let totalValue = 0
  for (let product of orderProducts) {
    const productAvailable = await productRepo.findProductByID(
      product.produto_id
    )

    if (productAvailable.length < 1) {
      throw new AppError(
        `The product with following ID could not be found: ${product.produto_id}`,
        404
      )
    }

    if (productAvailable[0].quantidade_estoque < product.quantidade_produto) {
      throw new AppError(
        `The product with following ID does not have enough quantity stored: ${product.produto_id}`,
        404
      )
    }

    totalValue += product.quantidade_produto * productAvailable[0].valor
  }

  return totalValue
}

const updateStock = async (orderProducts, order) => {
  order.produtos = []

  for (let product of orderProducts) {
    const findProduct = await productRepo.findProductByID(product.produto_id)

    await orderRepo.insertOrderProduct(
      order.id,
      product.produto_id,
      product.quantidade_produto,
      findProduct[0].valor
    )
    // eslint-disable-next-line no-unused-vars
    const { quantidade_estoque, categoria_id, ...item } = findProduct[0]

    await productRepo.updateProduct(
      findProduct[0].descricao,
      findProduct[0].quantidade_estoque - product.quantidade_produto,
      findProduct[0].valor,
      findProduct[0].categoria_id,
      findProduct[0].produto_imagem,
      findProduct[0].id
    )
    item.quantidade = product.quantidade_produto
    order.produtos.push(item)
  }

  return order
}

const uploadImage = async (image) => {
  if (image) {
    const uploadedImg = await s3
      .upload({
        Bucket: process.env.BB_BUCKET,
        Key: image.originalname,
        Body: image.buffer,
        ContentType: image.minetype,
      })
      .promise()

    return uploadedImg.Location || null
  }
}

const generatePath = (url) => {
  const brokenUrl = url.split('/')
  const path = brokenUrl[brokenUrl.length - 1]
  return path
}

const deleteImage = async (path) => {
  if (path) {
    return await s3
      .deleteObject({
        Bucket: process.env.BB_BUCKET,
        Key: path,
      })
      .promise()
  }
}
module.exports = {
  htmlCompiler,
  processOrder,
  updateStock,
  uploadImage,
  deleteImage,
  generatePath,
  treatClientData,
}
