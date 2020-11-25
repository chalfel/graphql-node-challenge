const mongoose = require('mongoose')
const dotenv = require('dotenv')
const ContaRepository = require('.')
const Account = require('../../models/Conta')

dotenv.config()

describe('Account Repository', () => {
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

  describe('Account Balance', () => {
    it('Should update account balance', async () => {
      const sut = new ContaRepository(Account)

      const response = await sut.atualizarSaldo(123456, 230)

      expect(response).toHaveProperty('saldo')
      expect(response).toHaveProperty('conta')
      expect(response).toHaveProperty('_id')
      expect(response.saldo).toBe(230)
    })
    it('Should return a validation error ', async () => {
      const sut = new ContaRepository(Account)

      const response = await sut.atualizarSaldo(123456)

      expect(response).toBe(false)
    })

    it('Should return null ', async () => {
      const sut = new ContaRepository(Account)

      const response = await sut.atualizarSaldo(4555555, 2354)

      expect(response).toBe(null)
    })
  })

  describe('Account Info', () => {
    it('Should return empty account', async () => {
      const sut = new ContaRepository(Account)

      const response = await sut.obterDadosConta(123457)

      expect(response).toBe(null)
    })

    it('Should return null value', async () => {
      const sut = new ContaRepository(Account)

      const response = await sut.obterDadosConta()

      expect(response).toBe(null)
    })

    it('Should return an existent account', async () => {
      const sut = new ContaRepository(Account)

      const response = await sut.obterDadosConta(123456)

      expect(response).toHaveProperty('saldo')
      expect(response).toHaveProperty('conta')
      expect(response).toHaveProperty('_id')
    })
  })
})
