import express, { response } from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import http from 'http'

async function startApolloServer() {
  //https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express

  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  await server.start()
  server.applyMiddleware({
    app,
    bodyParserConfig: true
  })

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000
  const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'

  await new Promise(resolve =>
    httpServer.listen({ port: PORT, host: HOSTNAME }, resolve)
  )
  console.log(`Server ready at http://${HOSTNAME}:${PORT}${server.graphqlPath}`)

  // const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000
  // const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'

  // server.listen(PORT, HOSTNAME, () => {
  //   console.log(`Server is listening at http://${HOSTNAME}:${PORT}`)
  // })
}
startApolloServer()
