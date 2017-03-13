import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import UserErrorType from './types/userError'
import { DriverType, DriverInput } from './types/driver'

import Driver from '../models/driver'
import Company from '../models/company'

const Query = {
  driver: {
    type: DriverType,
    args: {
      _id: {
        name: 'id',
        type: GraphQLID
      }
    },
    resolve: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Driver.findById(_id, (err, driver) => {
          if (!err) {
            resolve(driver)
          } else {
            reject(err)
          }
        })
      })
    }
  },
  drivers: {
    type: new GraphQLList(DriverType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        Driver.find((err, drivers) => {
          if (!err) {
            resolve(drivers)
          } else {
            reject(err)
          }
        })
      })
    }
  }
}

const Mutation = {
  createDriver: {
    type: new GraphQLObjectType({
      name: 'CreateDriverResponse',
      fields: {
        driver: {
          type: DriverType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: { 
      input: { 
        name: 'input', 
        type: DriverInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []
        let driver = new Driver(input)

        driver.save((err) => {
          if (err) {
            for (let field in err.errors) {
              errors.push({ key: field, msg: err.errors[field].message })
            }
          }

          resolve({ driver, errors })
        })
      })
    }
  },

  updateDriver: {
    type: new GraphQLObjectType({
      name: 'UpdateDriverResponse',
      fields: {
        driver: {
          type: DriverType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: {
      input: { 
        name: 'input', 
        type: DriverInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []

        if (!input._id) {
          errors.push({ key: 'id', msg: 'driver id is required' })
          resolve({ errors })
        }

        Driver.findById(input._id, (err, driver) => {
          if (!err) {
            Object.assign(driver, input)
            
            driver.save((err) => {
              if (err) {
                for (let field in err.errors) {
                  errors.push({ key: field, msg: err.errors[field].message })
                }
              }

              resolve({ driver, errors })
            })
          } else {
            reject(err)
          }
        })
      })
    }
  },

  deleteDriver: {
    type: new GraphQLObjectType({
      name: 'DeleteDriverResponse',
      fields: {
        driver: {
          type: DriverType
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

        Driver.findByIdAndRemove(id, (err, driver) => {  
          if (!driver) {
            errors.push({ key: 'id', msg: 'driver id does not exists' })
          }

          resolve({ driver, errors })
        })
      })
    }
  }
}

export default { 
  Queries: Query, 
  Mutations: Mutation 
}