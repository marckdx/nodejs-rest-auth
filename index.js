const express =  require('express')
const mongoose = require('mongoose')
const dotvenv = require('dotenv')
const cors = require('cors');
dotvenv.config()
const routes = require('./routes')

/* Importing GraphQL */
var graphqlHTTP = require('express-graphql')
var schema = require('./src/graphql/schemas')
var provider = require('./src/graphql/provider')

const server = express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

mongoose.connect(process.env.DB_CONNECTION_STRING,
            { useNewUrlParser: true },
            () => console.log("Connected to the database"))

server.use(cors())
server.use(express.json())
server.use(routes)

/* Setting up the graphql resolver */



server.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: provider,
    graphiql: true,
}))

server.listen(process.env.PORT, () => console.log("Server is running"))