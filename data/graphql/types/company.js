import { 
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  }
})

const CompanyInput = new GraphQLInputObjectType({
  name: 'CompanyInput',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
})

export { CompanyType, CompanyInput }