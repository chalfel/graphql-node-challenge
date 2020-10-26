const mongoose = require('mongoose')
const dotenv = require('dotenv')
const ContaValidator = require('.')
const errorMessages = require('../../utils/errorMessages')

dotenv.config()

describe('Account Validator', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: false, useFindAndModify: false }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })
  it('Should return existent account', async () => {
    const sut = new ContaValidator()

    const response = sut.checarConta({ conta: 123456 })
    expect(response).toBe(true)
  })
  it('Should return error about inexistent account', async () => {
    const sut = new ContaValidator()
    try {
      await sut.checarConta()
    } catch (e) {
      expect(e.message).toBe(errorMessages.CONTA_NAO_ENCONTRADA)
    }
  })

  it('Should return error when it has insufficient balance', async () => {
    const sut = new ContaValidator()
    try {
      await sut.checarSaldoInsuficiente(999, 1000)
    } catch (e) {
      expect(e.message).toBe(errorMessages.SALDO_INSUFICIENTE)
    }
  })

  it('Should return error when it has no balance', async () => {
    const sut = new ContaValidator()
    try {
      await sut.checarSaldoInsuficiente()
    } catch (e) {
      expect(e.message).toBe(errorMessages.SALDO_NAO_INFORMADO)
    }
  })

  it('Should return whe it has sufficient balance', async () => {
    const sut = new ContaValidator()

    const response = await sut.checarSaldoInsuficiente(999, 10)
    expect(response).toBe(true)
  })

  it('Should return empty value error', async () => {
    const sut = new ContaValidator()
    try {
      await sut.checarValor()
    } catch (e) {
      expect(e.message).toBe(errorMessages.VALOR_NAO_INFORMADO)
    }
  })

  it('Should return negative value error', async () => {
    const sut = new ContaValidator()
    try {
      await sut.checarValor(-100)
    } catch (e) {
      expect(e.message).toBe(errorMessages.VALOR_NEGATIVO)
    }
  })

  it('Should return that is a valid value', async () => {
    const sut = new ContaValidator()

    const response = await sut.checarValor(100)

    expect(response).toBe(true)
  })

  it('Should return negative balance error', async () => {
    const sut = new ContaValidator()

    try {
      await sut.checarSaldoInsuficiente(-100)
    } catch (e) {
      expect(e.message).toBe(errorMessages.SALDO_NEGATIVO)
    }
  })
  it('Should return negative balance error', async () => {
    const sut = new ContaValidator()

    try {
      await sut.checarSaldoInsuficiente(-100, -100)
    } catch (e) {
      expect(e.message).toBe(errorMessages.SALDO_NEGATIVO)
    }
  })

  it('Should return type error when send string account number', async () => {
    const sut = new ContaValidator()

    try {
      await sut.checarConta('123456')
    } catch (e) {
      expect(e.message).toBe(errorMessages.TIPO_CONTA_ERRADO)
    }
  })
  it('Should return type error when send string balance number', async () => {
    const sut = new ContaValidator()

    try {
      await sut.checarSaldoInsuficiente('123456')
    } catch (e) {
      expect(e.message).toBe(errorMessages.TIPO_SALDO_ERRADO)
    }
  })
  it('Should return type error when send string value number', async () => {
    const sut = new ContaValidator()

    try {
      await sut.checarValor('123456')
    } catch (e) {
      expect(e.message).toBe(errorMessages.TIPO_VALOR_ERRADO)
    }
  })
})
