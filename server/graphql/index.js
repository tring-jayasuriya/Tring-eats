const {mergeTypeDefs,mergeResolvers} =require("@graphql-tools/merge")

const userDefs=require('./typedefs/usedefs.js')
const restaurantDefs = require("./typedefs/restaurantDef.js")

const userResolver=require('./resolvers/userResolver.js')
const restaurantResolver = require("./resolvers/restaurantResolvers.js")

const typeDefs=mergeTypeDefs([userDefs,restaurantDefs])
const resolvers=mergeResolvers([userResolver,restaurantResolver])

module.exports={typeDefs,resolvers}

