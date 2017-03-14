import React from 'react'
import Relay from 'react-relay'
import Owners from '../components/owners'

const OwnersContainer = Relay.createContainer(Owners, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        greetings
      }
    `
  }
})

export default OwnersContainer
