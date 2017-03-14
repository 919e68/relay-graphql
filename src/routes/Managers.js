import React from 'react'
import Relay from 'react-relay'
import Managers from '../components/managers'

const ManagersContainer = Relay.createContainer(Managers, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        greetings
      }
    `
  }
})

export default ManagersContainer
