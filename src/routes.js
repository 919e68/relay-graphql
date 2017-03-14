import React from 'react'
import Relay from 'react-relay'
import classNames from 'classnames'
import { IndexRoute, Route } from 'react-router'

import App from './components/App'

import Home from './routes/Home'
import Companies from './routes/Companies'
import Managers from './routes/Managers'
import Drivers from './routes/Drivers'
import Stations from './routes/Stations'
import Owners from './routes/Owners'

import RootQuery from './queries/Root'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} queries={RootQuery} />
    <Route path='/companies' component={Companies} queries={RootQuery} />
    <Route path='/managers' component={Managers} queries={RootQuery} />
    <Route path='/drivers' component={Drivers} queries={RootQuery} />
    <Route path='/stations' component={Stations} queries={RootQuery} />
    <Route path='/owners' component={Owners} queries={RootQuery} />
  </Route>
)
