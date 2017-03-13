import { GraphQLString, GraphQLObjectType } from 'graphql'

const UserErrorType = new GraphQLObjectType({
  name: 'UserErrorType',
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