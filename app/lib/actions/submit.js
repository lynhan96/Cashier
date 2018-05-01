import { SubmissionError } from 'redux-form'
import request from 'request-promise'

import { makeRequestOptions } from '../requestHeader'
import { adminHasSignedIn } from 'ducks/admin'
import { showNotification } from './showNotification'
import Navigator from 'lib/Navigator'

// Redux-form requires a promise for async submission
// so we return a promise
export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    let admin = null

    const url = 'cashierLogin'
    const params = { email: email, password: password }

    return request(makeRequestOptions(params, url)).then(body => {
      if (body.code === 0) {
        admin = body.data
        dispatch(adminHasSignedIn(admin))
        Navigator.push('map-tables')
      } else if (body.code === 416) {
        showNotification('topCenter', 'error', 'Mật khẩu không hợp lệ!')
      } else if (body.code === 414) {
        showNotification('topCenter', 'error', 'Tài khoản không tồn tại!')
      } else if (body.code === 419) {
        showNotification('topCenter', 'error', 'Tài khoản không được cấp quyền để truy cập vào trang này!')
      } else {
        showNotification('topCenter', 'error', 'Lỗi hệ thống')
      }

      return Promise.resolve()
    })
    .catch(function (err) {
      if (err.message) {
        showNotification('topCenter', 'error', err.message)
        throw new SubmissionError({ _error: err.message })
      } else {
        showNotification('topCenter', 'error', JSON.stringify(err))
        throw new SubmissionError({ _error: JSON.stringify(err) })
      }
    })
  }

export const submitForgotPassword =
  (values, dispatch, props) => {
    const { email } = values

    const url = 'forgotPassword'
    const params = { email: email }

    return request(makeRequestOptions(params, url)).then(body => {
      if (body.code === 0) {
        showNotification('topCenter', 'success', 'Vui lòng kiểm tra email để nhận mật khẩu mới!')
        Navigator.push('login')
      } else if (body.code === 414) {
        showNotification('topCenter', 'error', 'Tài khoản không tồn tại trong hệ thống!')
      } else {
        showNotification('topCenter', 'error', 'Lỗi hệ thống')
      }

      return Promise.resolve()
    })
    .catch(function (err) {
      if (err.message) {
        showNotification('topCenter', 'error', err.message)
        throw new SubmissionError({ _error: err.message })
      } else {
        showNotification('topCenter', 'error', JSON.stringify(err))
        throw new SubmissionError({ _error: JSON.stringify(err) })
      }
    })
  }
