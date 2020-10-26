const { UserInputError } = require('apollo-server')
const errorMessages = require('../../utils/errorMessages')

class ContaValidator {
  checarConta (contaEncontrada) {
    if (contaEncontrada && typeof contaEncontrada !== 'object') {
      throw new UserInputError(errorMessages.TIPO_CONTA_ERRADO)
    }
    if (!contaEncontrada) {
      throw new UserInputError(errorMessages.CONTA_NAO_ENCONTRADA)
    }

    return true
  }

  checarSaldoInsuficiente (saldo, valor) {
    if ((valor && typeof valor !== 'number') || (saldo && saldo !== 0 && typeof saldo !== 'number')) {
      throw new UserInputError(errorMessages.TIPO_SALDO_ERRADO)
    }
    if (!saldo && saldo !== 0) {
      throw new UserInputError(errorMessages.SALDO_NAO_INFORMADO)
    }
    if (valor) {
      if (saldo < valor) {
        throw new UserInputError(errorMessages.SALDO_INSUFICIENTE)
      }
    }
    if (saldo < 0) {
      throw new UserInputError(errorMessages.SALDO_NEGATIVO)
    }
    return true
  }

  checarValor (valor) {
    if (valor && typeof valor !== 'number') {
      throw new UserInputError(errorMessages.TIPO_VALOR_ERRADO)
    }
    if (!valor) {
      throw new UserInputError(errorMessages.VALOR_NAO_INFORMADO)
    }
    if (valor < 0) {
      throw new UserInputError(errorMessages.VALOR_NEGATIVO)
    }

    return true
  }
}

module.exports = ContaValidator
