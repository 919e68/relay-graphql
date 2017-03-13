import config from '../graphql.json'
import mongoose from 'mongoose'
import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import Root from './graphql/root'
import Company from './graphql/company'
import Manager from './graphql/manager'
import Driver from './graphql/driver'
import Owner from './graphql/owner'
import Station from './graphql/station'

mongoose.connect(config.mongo)

const Queries = new GraphQLObjectType({
  name: 'Query',
  fields: {
    root: Root.Queries.root,
    company: Company.Queries.company,
    companies: Company.Queries.companies,
    
    manager: Manager.Queries.manager,
    managers: Manager.Queries.managers,

    driver: Driver.Queries.driver,
    drivers: Driver.Queries.drivers,

    owner: Owner.Queries.owner,
    owners: Owner.Queries.owners,

    station: Station.Queries.station,
    stations: Station.Queries.stations,
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