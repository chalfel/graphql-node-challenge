
class ContaController {
  constructor (repositorioConta, validadorConta) {
    this.repositorioConta = repositorioConta
    this.validadorConta = validadorConta
  }

  async saldo (_, { conta }) {
    const contaEncontrada = await this.repositorioConta.obterDadosConta(conta)
    await this.validadorConta.checarConta(contaEncontrada)
    const { saldo } = contaEncontrada
    return saldo
  }

  async depositar (_, { conta, valor }) {
    const contaEncontrada = await this.repositorioConta.obterDadosConta(conta)
    await this.validadorConta.checarConta(contaEncontrada)
    await this.validadorConta.checarValor(valor)
    const { saldo } = contaEncontrada
    this.validadorConta.checarSaldoInsuficiente(saldo)
    const contaAtualizada = await this.repositorioConta.atualizarSaldo(conta, saldo + valor)

    return contaAtualizada
  }

  async sacar (_, { conta, valor }) {
    const contaEncontrada = await this.repositorioConta.obterDadosConta(conta)
    await this.validadorConta.checarConta(contaEncontrada)
    await this.validadorConta.checarValor(valor)
    const { saldo } = contaEncontrada
    this.validadorConta.checarSaldoInsuficiente(saldo, valor)

    const contaAtualizada = await this.repositorioConta.atualizarSaldo(conta, saldo - valor)

    return contaAtualizada
  }
}

module.exports = ContaController
