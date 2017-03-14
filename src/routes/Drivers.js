import React from 'react'
import Relay from 'react-relay'
import Drivers from '../components/drivers'

const DriversContainer = Relay.createContainer(Drivers, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        greetings
      }
    `
  }
})

export default DriversContainer
