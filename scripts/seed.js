import mongoose from 'mongoose'
import Company from '../data/models/company'

import config from '../graphql.json'
mongoose.connect(config.mongo)

const companies = [
  {
    name: 'ABC Company',
    email: 'abc@company.com',
    password: 'ABC12abc'
  },
  {
    name: 'DEF Company',
    email: 'def@company.com',
    password: 'ABC12abc'
  },
  {
    name: 'GHI Company',
    email: 'ghi@company.com',
    password: 'ABC12abc'
  },
  {
    name: 'JKL Company',
    email: 'jkl@company.com',
    password: 'ABC12abc'
  },
  {
    name: 'MNO Company',
    email: 'mno@company.com',
    password: 'ABC12abc'
  }
]

let insertCompanies = companies.map((company) => {
  return new Promise((resolve, reject) => {
    let newCompany = new Company(company)
    newCompany.save((err) => {
      let errors = []
      if (err) {
        for (let field in err.errors) {
          errors.push({ key: field, msg: err.errors[field].message })
        }
      }
      resolve({ ok: err? false: true, data: company, errors: errors })
    })
  })
})

Promise.all(insertCompanies).then((insertResults) => {
  console.log(JSON.stringify(insertResults, null, 2))
  console.log('All Inserted')
})