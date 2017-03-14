import { GraphQLString, GraphQLObjectType } from 'graphql'

const UserErrorType = new GraphQLObjectType({
  name: 'UserError',
  fields: {
    key: {
      type: GraphQLString
    },
    msg: {
      type: GraphQLString
    }
  }
})

export default UserErrorType