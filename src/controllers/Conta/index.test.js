const mongoose = require('mongoose')
const dotenv = require('dotenv')
const ContaController = require('.')
const Account = require('../../models/Conta')
const ContaRepository = require('../../repositories/Conta')
const ContaValidator = require('../../validators/Conta')
const errorMessages = require('../../utils/errorMessages')
const Conta = require('../../models/Conta')

dotenv.config()

describe('Account Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: false, useFindAndModify: false }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
    await Account.create({
      conta: 123456,
      saldo: 0
    })
  })
  afterAll(async () => {
    await Account.findOneAndDelete({ conta: 123456 })
  })
  it('Should deposit money', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    const response = await sut.depositar({}, { conta: 123456, valor: 23.55 })

    expect(response).toHaveProperty('saldo')
    expect(response).toHaveProperty('conta')
    expect(response).toHaveProperty('_id')
  })
  it('Should withdraw money', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    const response = await sut.sacar({}, { conta: 123456, valor: 10.20 })

    expect(response).toHaveProperty('saldo')
    expect(response).toHaveProperty('conta')
    expect(response).toHaveProperty('_id')
  })
  it('Should return error when it has insufficient balance', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.sacar({}, { conta: 123456, valor: 9999.99 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.SALDO_INSUFICIENTE)
    }
  })
  it('Should return balance', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    const response = await sut.saldo({}, { conta: 123456 })

    expect(typeof response).toBe('number')
  })

  it('Should return account not found error when try to get balance', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.saldo({}, { conta: 22323 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.CONTA_NAO_ENCONTRADA)
    }
  })

  it('Should return account not found error when try to get balance and not sending account', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.saldo({}, { conta: 22323 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.CONTA_NAO_ENCONTRADA)
    }
  })

  it('Should return account not found error when try to withdraw', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.sacar({}, { valor: 2000 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.CONTA_NAO_ENCONTRADA)
    }
  })

  it('Should return an account not found error when try to withdraw', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.sacar({}, { conta: 22323 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.CONTA_NAO_ENCONTRADA)
    }
  })

  it('Should return an empty value error when try to withdraw', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.sacar({}, { conta: 123456 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.VALOR_NAO_INFORMADO)
    }
  })

  it('Should return account not found error when try to deposit', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.depositar({}, { valor: 2000 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.CONTA_NAO_ENCONTRADA)
    }
  })

  it('Should return an account not found error when try to deposit', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.sacar({}, { conta: 22323 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.CONTA_NAO_ENCONTRADA)
    }
  })

  it('Should return an empty value error when try to deposit', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.depositar({}, { conta: 123456 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.VALOR_NAO_INFORMADO)
    }
  })

  it('Should return negative value error when try to deposit', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.depositar({}, { conta: 123456, valor: -2000 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.VALOR_NEGATIVO)
    }
  })

  it('Should return negative value error when try to withdraw', async () => {
    const sut = new ContaController(new ContaRepository(Conta), new ContaValidator())

    try {
      await sut.sacar({}, { conta: 123456, valor: -2000 })
    } catch (e) {
      expect(e.message).toBe(errorMessages.VALOR_NEGATIVO)
    }
  })
})
