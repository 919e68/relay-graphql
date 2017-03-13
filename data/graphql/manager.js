import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import UserErrorType from './types/userError'
import { ManagerType, ManagerInput } from './types/manager'
import Manager from '../models/manager'

const Query = {
  manager: {
    type: ManagerType,
    args: {
      _id: {
        name: 'id',
        type: GraphQLID
      }
    },
    resolve: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Manager.findById(_id, (err, manager) => {
          if (!err) {
            resolve(manager)
          } else {
            reject(err)
          }
        })
      })
    }
  },
  managers: {
    type: new GraphQLList(ManagerType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        Manager.find((err, managers) => {
          if (!err) {
            resolve(managers)
          } else {
            reject(err)
          }
        })
      })
    }
  }
}

const Mutation = {
  createManager: {
    type: new GraphQLObjectType({
      name: 'CreateManagerResponse',
      fields: {
        manager: {
          type: ManagerType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: { 
      input: { 
        name: 'input', 
        type: ManagerInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []
        let manager = new Manager(input)

        manager.save((err) => {
          if (err) {
            for (let field in err.errors) {
              errors.push({ key: field, msg: err.errors[field].message })
            }
          }

          resolve({ manager, errors })
        })
      })
    }
  },

  updateManager: {
    type: new GraphQLObjectType({
      name: 'UpdateManagerResponse',
      fields: {
        manager: {
          type: ManagerType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: {
      input: { 
        name: 'input', 
        type: ManagerInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []

        if (!input._id) {
          errors.push({ key: 'id', msg: 'manager id is required' })
          resolve({ errors })
        }

        Manager.findById(input._id, (err, manager) => {
          if (!err) {
            Object.assign(manager, input)
            
            manager.save((err) => {
              if (err) {
                for (let field in err.errors) {
                  errors.push({ key: field, msg: err.errors[field].message })
                }
              }

              resolve({ manager, errors })
            })
          } else {
            reject(err)
          }
        })
      })
    }
  },

  deleteManager: {
    type: new GraphQLObjectType({
      name: 'DeleteManagerResponse',
      fields: {
        manager: {
          type: ManagerType
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

        Manager.findByIdAndRemove(id, (err, manager) => {  
          if (!manager) {
            errors.push({ key: 'id', msg: 'manager id does not exists' })
          }

          resolve({ manager, errors })
        })
      })
    }
  }
}

export default { 
  Queries: Query, 
  Mutations: Mutation 
}