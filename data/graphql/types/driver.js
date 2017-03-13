import { 
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

import { CompanyType } from './company'
import Company from '../../models/company'

const DriverType = new GraphQLObjectType({
  name: 'DriverType',
  fields: {
    _id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    phoneNumber: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    company: {
      type: CompanyType,
      resolve: (driver) => {
        return new Promise((resolve, reject) => {
          Company.findOne({ _id: driver.companyId }, (err, company) => {
            if (!err) {
              resolve(company)
            } else {
              reject(err)
            }
          })
        })
      }
    }
  }
})

const DriverInput = new GraphQLInputObjectType({
  name: 'DriverInput',
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
    phoneNumber: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    companyId: {
      type: GraphQLID
    }
  }
})

export { DriverType, DriverInput }