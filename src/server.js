const { ApolloServer } = require('apollo-server')
const ContaSeeds = require('./seeds/Conta')
const mongoose = require('mongoose')

class Server {
  constructor (typeDefs, resolvers) {
    this.database()
    this.app = new ApolloServer({ typeDefs, resolvers, playground: true })
  }

  database () {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    new ContaSeeds().init()
  }
}

module.exports = Server
