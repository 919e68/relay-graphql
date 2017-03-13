import React from 'react'
import Relay from 'react-relay'
import Home from '../components/Home'

const HomeContainer = Relay.createContainer(Home, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        greetings
      }
    `
  }
})

export default HomeContainer
