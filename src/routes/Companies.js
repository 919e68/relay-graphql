import React from 'react'
import Relay from 'react-relay'
import Companies from '../components/Companies'

const CompaniesContainer = Relay.createContainer(Companies, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        greetings
      }
    `
  }
})

export default CompaniesContainer
