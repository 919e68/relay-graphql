import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import moment from 'moment'
import geohash from 'ngeohash'
import Station from '../models/station'

import UserErrorType from './types/userError'
import { StationType, StationInput } from './types/station'

const Query = {
  station: {
    type: StationType,
    args: { 
      _id: { 
        name: 'id', 
        type: GraphQLID 
      }
    },
    resolve: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Station.findById(_id, (err, station) => {
          if (!err) {
            resolve(station)
          } else {
            reject(err)
          }
        })
      })
    }
  },
  stations: {
    type: new GraphQLList(StationType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        Station.find((err, stations) => {
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

const Mutation = {
  createStation: {
    type: new GraphQLObjectType({
      name: 'CreateStationResponse',
      fields: {
        station: {
          type: StationType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: { 
      input: { 
        name: 'input', 
        type: StationInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []
        let pumpIds = []

        if (input.products) {
          for (let i in input.products) {
            pumpIds.push(input.products[i].pumpId)
            input.products[i].updatedAt = moment().toDate()
          }
        }

        let station = new Station(input)
        station.updatedAt = moment().toDate()
        station.geohash = geohash.encode(input.lat, input.lng)
        station.pumpIds = pumpIds

        station.save((err) => {
          if (err) {
            for (let field in err.errors) {
              errors.push({ key: field, msg: err.errors[field].message })
            }
          }

          resolve({ station, errors })
        })
      })
    }
  },

  updateStation: {
    type: new GraphQLObjectType({
      name: 'UpdateStationResponse',
      fields: {
        station: {
          type: StationType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: { 
      input: { 
        name: 'input', 
        type: StationInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []

        if (!input._id) {
          errors.push({ key: 'id', msg: 'station id is required' })
            resolve({ errors })
        }

        Station.findById(input._id, (err, station) => {
          if (!err) {
            Object.assign(station, input)

            station.save((err) => {
              if (err) {
                for (let field in err.errors) {
                  errors.push({ key: field, msg: err.errors[field].message })
                }
              }

              resolve({ station, errors })
            })
          }
        })
      })
    }
  },

  deleteStation: {
    type: new GraphQLObjectType({
      name: 'DeleteStationResponse',
      fields: {
        station: {
          type: StationType
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

        Station.findByIdAndRemove(id, (err, station) => {  
          if (!station) {
            errors.push({ key: 'id', msg: 'station id does not exists' })
          }

          resolve({ station, errors })
        })
      })
    }
  }
}

export default { 
  Queries: Query, 
  Mutations: Mutation
}