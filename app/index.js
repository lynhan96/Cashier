import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import Navigator from 'lib/Navigator'
import Store from 'lib/Store'
import App from 'App'
import Login from 'pages/Login'
import ForgotPassword from 'pages/ForgotPassword'

import MapTable from 'components/admin/maps/MapTable'

import TableOrderDetail from 'pages/TableOrderDetail'
import OrderingList from 'components/admin/orderings/OrderingList'
import OrderingView from 'components/admin/orderings/OrderingView'
import OrderingEdit from 'components/admin/orderings/OrderingEdit'

ReactDOM.render((
  <Provider store={Store}>
    <Router history={Navigator}>
      <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login}/>
        <Route path='forgot-password' component={ForgotPassword}/>
        <Route path='tabe-order-detail' component={TableOrderDetail} />
        <Route path='map-tables' component={MapTable} />

        <Route path='orderings' component={OrderingList} />
        <Route path='ordering-view' component={OrderingView} />
        <Route path='ordering-edit' component={OrderingEdit} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('website'))
