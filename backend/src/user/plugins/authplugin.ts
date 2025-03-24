import { makeExtendSchemaPlugin} from "postgraphile";
import { AuthTypeDefs } from "../typedefs/authTypDefs";
import { AuthResolvers } from "../resolvers/authResolver";

export const AuthPlugin=makeExtendSchemaPlugin(()=>{
    return{
        typeDefs: AuthTypeDefs,
        resolvers: AuthResolvers
    }
})