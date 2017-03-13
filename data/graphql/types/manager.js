import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

const ManagerType = new GraphQLObjectType({
  name: 'ManagerType',
  fields: {
    _id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    phoneNumber: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    companyId: {
      type: GraphQLID
    }
  }
})

const ManagerInput = new GraphQLInputObjectType({
  name: 'ManagerInput',
  fields: {
    _id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    phoneNumber: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    companyId: {
      type: GraphQLID
    }
  }
})

export { ManagerType, ManagerInput }