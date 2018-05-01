import React, { Component } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import { isAdmin } from 'components/wrappers/isAdmin'
import 'styles/print.less'

class PrintOrder extends Component {
  render() {
    const { signedIn } = this.props

    return (
      <div id='page' className='page'>
        <div className='header'>
          CCCCC
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  signedIn: state.admin.signedIn
})

export default R.pipe(
  isAdmin,
  connect(mapStateToProps)
)(PrintOrder)
