import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import Login from 'pages/Login'

const _isAdmin = (Component) => (props) => {
  const { signedIn, ...others } = props

  if (signedIn) {
    return <Component {...others} />
  } else {
    return <Login />
  }
}

const mapStateToProps = (state) =>
  ({ signedIn: R.path(['admin', 'signedIn'], state) })

export const isAdmin = R.pipe(
  _isAdmin,
  connect(mapStateToProps)
)
