import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import LoginForm from 'components/form/Login'
import { submitLogin } from 'lib/actions/submit'

class Login extends Component {
  render() {
    const { signedIn } = this.props

    if (signedIn) {
      return (
        <div>
          <div className='col-md-3'/>
          <div className='col-md-6'>
            <div className='card' style={style.cardBackground}>
              <div className='card-header' style={style.cardHeaderBackground}>
                <h2 className='card-title' style={style.cardTitle}>Bạn đã đăng nhập. Nếu muốn thoát vui lòng bấm nút thoát!</h2>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='login-form-wrapper'>
        <div className='col-md-4'/>
        <div className='col-md-4'>
          <div className='card' style={style.cardBackground}>
            <div className='card-header' style={style.cardHeaderBackground}>
              <h2 className='card-title' style={style.cardTitle}> BK Food CMS</h2>
            </div>
            <div className='card-body' style={{ padding: '0 30px' }}>
              <DecoratedLoginForm />
            </div>
          </div>
        </div>
        <div className='col-md-4'/>
      </div>
    )
  }
}

// Decorate LoginForm so that form is pure
const DecoratedLoginForm = reduxForm({
  form: 'login',
  onSubmit: submitLogin
})(LoginForm)

const style = {
  cardBackground: {
    background: 'white',
    marginTop: '20vh'
  },
  cardHeaderBackground: {
    background: '#ff9800'
  },
  cardTitle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600'
  }
}

const mapStateToProps = (state) => ({
  signedIn: state.admin.signedIn
})

export default connect(mapStateToProps)(Login)
