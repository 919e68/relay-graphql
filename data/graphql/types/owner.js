import { 
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString, GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

import { StationType } from './station'
import Station from '../../models/station'

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
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
    address: {
      type: GraphQLString
    },
    paymentAmount: {
      type: GraphQLFloat
    },
    stations: {
      type: new GraphQLList(StationType),
      resolve: (owner) => {
        return new Promise((resolve, reject) => {
          Station.find({ ownerId: owner._id }, (err, stations) => {
            if (!err) {
              resolve(stations)
            } else {
              reject(err)
            }
          })
        })
      }
    }
  }
})

const OwnerInput = new GraphQLInputObjectType({
  name: 'OwnerInput',
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
    address: {
      type: GraphQLString
    },
    paymentAmount: {
      type: GraphQLFloat
    }
  }
})

export { OwnerType, OwnerInput }