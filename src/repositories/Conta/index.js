class ContaRepository {
  constructor (contaModel) {
    this.contaModel = contaModel
  }

  async obterDadosConta (conta) {
    if (!conta) {
      return null
    }
    const contaDados = await this.contaModel.findOne({ conta })
    if (!contaDados) {
      return null
    }
    return contaDados
  }

  async atualizarSaldo (conta, novoSaldo) {
    if (!conta || !novoSaldo) {
      return false
    }
    const contaAtualizada = await this.contaModel.findOneAndUpdate({ conta }, { saldo: novoSaldo }, { new: true })
    if (!contaAtualizada) {
      return null
    }
    return contaAtualizada
  }
}

module.exports = ContaRepository
