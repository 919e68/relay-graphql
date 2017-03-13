import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import UserErrorType from './types/userError'
import { CompanyType, CompanyInput } from './types/company'
import Company from '../models/company'

const Query = {
  company: {
    type: CompanyType,
    args: {
      _id: {
        name: 'id',
        type: GraphQLID
      }
    },
    resolve: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Company.findById(_id, (err, company) => {
          if (!err) {
            resolve(company)
          } else {
            reject(err)
          }
        })
      })
    }
  },
  companies: {
    type: new GraphQLList(CompanyType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        Company.find((err, companies) => {
          if (!err) {
            resolve(companies)
          } else {
            reject(err)
          }
        })
      })
    }
  }
}

const Mutation = {
  createCompany: {
    type: new GraphQLObjectType({
      name: 'CreateCompanyResponse',
      fields: {
        company: {
          type: CompanyType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: { 
      input: { 
        name: 'input', 
        type: CompanyInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []
        let company = new Company(input)

        company.save((err) => {
          if (err) {
            for (let field in err.errors) {
              errors.push({ key: field, msg: err.errors[field].message })
            }
          }

          resolve({ company, errors })
        })
      })
    }
  },

  updateCompany: {
    type: new GraphQLObjectType({
      name: 'UpdateCompanyResponse',
      fields: {
        company: {
          type: CompanyType
        },
        errors: {
          type: new GraphQLList(UserErrorType)
        }
      }
    }),
    args: {
      input: { 
        name: 'input', 
        type: CompanyInput 
      }
    },
    resolve: (root, { input }) => {
      return new Promise((resolve, reject) => {
        let errors = []

        if (!input._id) {
          errors.push({ key: 'id', msg: 'company id is required' })
          resolve({ errors })
        }

        Company.findById(input._id, (err, company) => {
          if (!err) {
            Object.assign(company, input)
            
            company.save((err) => {
              if (err) {
                for (let field in err.errors) {
                  errors.push({ key: field, msg: err.errors[field].message })
                }
              }

              resolve({ company, errors })
            })
          } else {
            reject(err)
          }
        })
      })
    }
  },

  deleteCompany: {
    type: new GraphQLObjectType({
      name: 'DeleteCompanyResponse',
      fields: {
        company: {
          type: CompanyType
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

        Company.findByIdAndRemove(id, function (err, company) {  
          if (!company) {
            errors.push({ key: 'id', msg: 'company id does not exists' })
          }

          resolve({ company, errors })
        })
      })
    }
  }
}

export default { 
  Queries: Query, 
  Mutations: Mutation 
}