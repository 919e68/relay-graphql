import React from 'react'
import Relay from 'react-relay'
import classNames from 'classnames'
import { IndexRoute, Route } from 'react-router'

import App from './components/app'

import Home from './routes/home'
import Companies from './routes/companies'
import Managers from './routes/managers'
import Drivers from './routes/drivers'
import Stations from './routes/stations'
import Owners from './routes/owners'

import RootQuery from './queries/root'
import CompaniesQuery from './queries/companies'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} queries={RootQuery} />
    <Route path='/companies' component={Companies} queries={CompaniesQuery} />
    <Route path='/managers' component={Managers} queries={RootQuery} />
    <Route path='/drivers' component={Drivers} queries={RootQuery} />
    <Route path='/stations' component={Stations} queries={RootQuery} />
    <Route path='/owners' component={Owners} queries={RootQuery} />
  </Route>
)
