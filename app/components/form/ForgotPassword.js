import React from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router'

import InputText from 'components/form/element/InputText'
import SubmitButton from 'components/form/element/SubmitButton'

// This form is pure so it is easy to test
// Page/Login will decorate it with the necessary props
const ForgotPasswordForm = (props) => {
  const { submitting, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <label>Vui lòng nhập email của bạn. Hệ thống sẽ gửi một mật khẩu mới tới email này</label>
      <Field
        name='email'
        component={InputText}
        label='Email'
        type='email'
        required={true}
      />
      <div className='form-group label-floating' style={{textAlign: 'center'}}>
        <Link to='login' style={{ margin: '10px 0' }}>Trở về trang đăng nhập?</Link>
      </div>
      <SubmitButton
        text='Xác nhận'
        submitting={submitting}
        className='btn btn-primary btn-block btn-flat'
      />
     </form>
  )
}

export default ForgotPasswordForm
