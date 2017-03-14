import config from '../graphql.json'
import mongoose from 'mongoose'
import { GraphQLString, GraphQLList, GraphQLSchema, GraphQLObjectType } from 'graphql'

import Root from './graphql/root'
import Company from './graphql/company'
import Manager from './graphql/manager'
import Driver from './graphql/driver'
import Owner from './graphql/owner'
import Station from './graphql/station'

mongoose.connect(config.mongo)

let ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    companies: Company.Queries.companies,
    managers: Manager.Queries.managers,
    drivers: Driver.Queries.drivers,
    owners: Owner.Queries.owners,
    stations: Station.Queries.stations,
  }
})

const Queries = new GraphQLObjectType({
  name: 'Query',
  fields: {
    root: Root.Queries.root,
    company: Company.Queries.company,
    manager: Manager.Queries.manager,
    driver: Driver.Queries.driver,
    owner: Owner.Queries.owner,
    station: Station.Queries.station,

    viewer: {
      type: new GraphQLObjectType({
        name: 'Viewer',
        fields: {
          name: {
            type: GraphQLString
          },
          companies: Company.Queries.companies,
          managers: Manager.Queries.managers,
          drivers: Driver.Queries.drivers,
          owners: Owner.Queries.owners,
          stations: Station.Queries.stations,

        }
      }),
      resolve: () => {
        return { name: 'Viewer' }
      }
    }
  }
})

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCompany: Company.Mutations.createCompany,
    updateCompany: Company.Mutations.updateCompany,
    deleteCompany: Company.Mutations.deleteCompany,

    createManager: Manager.Mutations.createManager,
    updateManager: Manager.Mutations.updateManager,
    deleteManager: Manager.Mutations.deleteManager,

    createDriver: Driver.Mutations.createDriver,
    updateDriver: Driver.Mutations.updateDriver,
    deleteDriver: Driver.Mutations.deleteDriver,

    createStation: Station.Mutations.createStation,
    updateStation: Station.Mutations.updateStation,
    deleteStation: Station.Mutations.deleteStation,

    createOwner: Owner.Mutations.createOwner,
    updateOwner: Owner.Mutations.updateOwner,
    deleteOwner: Owner.Mutations.deleteOwner,
  }
})

const Schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
})

export default Schema