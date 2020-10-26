const ContaController = require('../../../controllers/Conta')

const Account = require('../../../models/Conta')
const ContaRepository = require('../../../repositories/Conta')
const ContaValidator = require('../../../validators/Conta')

const contaController = new ContaController(Account, ContaRepository, ContaValidator)

module.exports = {
  Query: {
    saldo: contaController.saldo.bind(contaController)
  },
  Mutation: {
    depositar: contaController.depositar.bind(contaController),
    sacar: contaController.sacar.bind(contaController)
  }
}
