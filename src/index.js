const Server = require('./server')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const dotenv = require('dotenv')
dotenv.config()

const server = new Server(typeDefs, resolvers)

server.app.listen(process.env.PORT).then(({ url }) => console.log(`Server is listening at ${url}`))
