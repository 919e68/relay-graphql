import React from 'react'
import Relay from 'react-relay'
import Companies from '../components/companies'

const CompaniesContainer = Relay.createContainer(Companies, {
  fragments: {
    companies: () => Relay.QL`
      fragment on Viewer {
        companies {
           _id
          name
          email
        }
      }
    `
  }
})

export default CompaniesContainer
