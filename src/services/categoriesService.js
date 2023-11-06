const categoryRepo = require('../repositories/categoriesRepository.js')

const execute = async () => {
  return await categoryRepo.findAll()
}

module.exports = { execute }
