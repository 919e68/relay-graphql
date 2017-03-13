import { 
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

const RootType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    greetings: {
      type: GraphQLString
    }
  }
})


export { RootType }