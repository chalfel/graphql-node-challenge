const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  saldo: {
    type: Number,
    required: true
  },
  conta: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Conta', Schema)
