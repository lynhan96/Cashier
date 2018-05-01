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

    const url = 'kitchenLogin'
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

// export const submitOrder =
//   (values, dispatch, props) => {
//     const foods = getFoodState().items
//     const selectedFoods = getSelectedState().items
//     const employeeData = getAdminData()
//     const tableData = getTableState().items
//     const orderingData = getOrderingState().items
//     let items = getOrderItems(selectedFoods, foods)
//     let table = tableData[values.tableId]
//     let orderId = ''
//     let message = ''

//     if (items.length === 0) {
//       return showNotification('topCenter', 'info', 'Vui lòng chọn món ăn!')
//     }

//     if (values.type === 'newOrder') {
//       if (tableData[values.tableId].status === 'Đã có khách' || tableData[values.tableId].status === 'Đã đặt') {
//         return showNotification('topCenter', 'error', 'Bàn đã có khách vui lòng chọn bàn khác!')
//       }

//       orderId = firebase.database().ref(employeeData.vid + '/orders/').push().key
//       message = 'Đặt món thành công!'
//     } else {
//       if (tableData[values.tableId].status !== 'Đã có khách' && tableData[values.tableId].status !== 'Đã đặt') {
//         return showNotification('topCenter', 'error', 'Vui lòng chọn bàn đã có khách để thêm món ăn vào bàn đó!')
//       }

//       orderId = table.lastOrderingId
//       const currentOrder = orderingData[orderId]
//       if (currentOrder.items) {
//         items = R.concat(currentOrder.items, items)
//       }

//       message = 'Thêm món ăn thành công!'
//     }

//     const totalPrice = R.pipe(
//       R.values,
//       R.map(item => item.currentPrice * item.quantity),
//       R.sum
//     )(items)

//     const order = {
//       createdAt: moment.utc().format('YYYY-MM-DD hh-mm-ss'),
//       updatedAt: moment.utc().format('YYYY-MM-DD hh-mm-ss'),
//       transactionId: 'BILL.' + moment.utc().format('YYYY.MM.DD.hh.mm.ss'),
//       status: 'Đang gọi món',
//       totalPrice: totalPrice,
//       items: items,
//       userName: '',
//       userId: '',
//       tableId: values.tableId,
//       employeeName: employeeData.name,
//       employeeToken: employeeData.token,
//       id: orderId
//     }

//     firebase.database().ref(employeeData.vid + '/orders/').child(orderId).set(order)

//     table.status = 'Đã có khách'
//     table['lastOrderingId'] = orderId

//     const ref = firebase.database().ref(employeeData.vid + '/tables').child(values.tableId)
//     ref.set(table)

//     dispatch(updateSelectedFood({}))
//     dispatch(fetchOrderings())
//     dispatch(changeOrderModal(false))

//     showNotification('topCenter', 'success', message)

//     Navigator.push('tabe-order-detail?tableId=' + values.tableId)
//   }
