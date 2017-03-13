import React from 'react'
import Relay from 'react-relay'
import Stations from '../components/Stations'

const StationsContainer = Relay.createContainer(Stations, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        greetings
      }
    `
  }
})

export default StationsContainer
