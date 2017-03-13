import React from 'react'
import Relay from 'react-relay'
import classNames from 'classnames'
import { IndexRoute, Route } from 'react-router'

import App from './components/App'

import Home from './routes/Home'
// import Companies from './routes/Companies'
// import Managers from './routes/Managers'
// import Drivers from './routes/Drivers'
// import Stations from './routes/Stations'
// import Owners from './routes/Owners'

import RootQuery from './queries/Root'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} queries={RootQuery} />
  </Route>
)
