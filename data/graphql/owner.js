import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import moment from 'moment'
import geohash from 'ngeohash'

import UserErrorType from './types/userError'
import { OwnerType, OwnerInput } from './types/owner'
import Owner from '../models/owner'

const Query = {
  owner: {
    type: OwnerType,
    args: {
      _id: {
        name: 'id',
        type: GraphQLID
      }
    },
    resolve: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Owner.findById(_id, (err, owner) => {
          console.log(owner)
          if (!err) {
            resolve(owner)
          } else {
            reject(err)
          }
        })
      })
    }
  },
  owners: {
    type: new GraphQLList(OwnerType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        Owner.find((err, owners) => {
          if (!err) {
            resolve(owners)
          } else {
            reject(err)
          }
        })
      })
    }
  }
}

const Mutation = {
  createOwner: {
    type: new GraphQLObjectType({
      name: 'CreateOwnerResponse',
      fields: {
        owner: {
          type: OwnerType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: { 
      input: { 
        name: 'input', 
        type: OwnerInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []
        let owner = new Owner(input)

        owner.save((err) => {
          if (err) {
            for (let field in err.errors) {
              errors.push({ key: field, msg: err.errors[field].message })
            }
          }

          resolve({ owner, errors })
        })
      })
    }
  },

  updateOwner: {
    type: new GraphQLObjectType({
      name: 'UpdateOwnerResponse',
      fields: {
        owner: {
          type: OwnerType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: { 
      input: { 
        name: 'input', 
        type: OwnerInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []

        if (!input._id) {
          errors.push({ key: 'id', msg: 'owner id is required' })
          resolve({ null, errors })
        }

        Owner.findById(input._id, (err, owner) => {
          if (!err) {
            Object.assign(owner, input)

            owner.save((err) => {
              if (err) {
                for (let field in err.errors) {
                  errors.push({ key: field, msg: err.errors[field].message })
                }
              }

              resolve({ owner, errors })
            })
          }
        })
      })
    }
  },

  deleteOwner: {
    type: new GraphQLObjectType({
      name: 'DeleteOwnerResponse',
      fields: {
        owner: {
          type: OwnerType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: {
      id: { 
        name: 'id', 
        type: GraphQLID 
      }
    },
    resolve: (root, { id }) => {
      return new Promise((resolve, reject) => {
        let errors = []

        Owner.findByIdAndRemove(id, (err, owner) => {  
          if (!owner) {
            errors.push({ key: 'id', msg: 'owner id does not exists' })
          }

          resolve({ owner, errors })
        })
      })
    }
  }
}

export default { 
  Queries: Query, 
  Mutations: Mutation
}