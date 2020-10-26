const Conta = require('../models/Conta')

class ContaSeeds {
  init () {
    Conta.create({
      saldo: 0,
      conta: 123456
    })
  }
}

module.exports = ContaSeeds
