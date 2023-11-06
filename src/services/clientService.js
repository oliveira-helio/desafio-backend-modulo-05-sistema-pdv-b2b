const clientRepo = require('../repositories/clientRepository.js')
const AppError = require('../utils/AppError')
const { treatClientData } = require('../utils/utilities.js')

const executeAdd = async (client) => {
  const duplicatedClient = await clientRepo.findByEmail(
    client.email,
    client.cpf
  )

  if (duplicatedClient.length > 0) {
    throw new AppError(
      'There is already a registered client with the entered email or cpf.',
      400
    )
  }

  const response = await clientRepo.insertClient(
    client.nome,
    client.email,
    client.cpf,
    client.cep,
    client.rua,
    client.numero,
    client.bairro,
    client.cidade,
    client.estado
  )

  return response[0]
}

const executeList = async () => {
  const response = await clientRepo.listClients()

  return response
}

const executeGetClient = async (id) => {
  const response = await clientRepo.findByID(id)

  if (response.length < 1) {
    throw new AppError("There's no client with the requested id", 404)
  }

  return response[0]
}

const executeEdit = async (client, id) => {
  const duplicatedClient = await clientRepo.findByEmailOrCpfAndFilterByID(
    client.email,
    client.cpf,
    id.id
  )

  if (duplicatedClient.length > 0) {
    throw new AppError(
      'There is already a registered client with the entered email or cpf.',
      400
    )
  }

  const treatedClient = await treatClientData(client)

  return await clientRepo.updateClient(
    treatedClient.nome,
    treatedClient.email,
    treatedClient.cpf,
    treatedClient.cep,
    treatedClient.rua,
    treatedClient.numero,
    treatedClient.bairro,
    treatedClient.cidade,
    treatedClient.estado,
    id.id
  )
}

module.exports = { executeAdd, executeList, executeGetClient, executeEdit }
