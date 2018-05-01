import { database } from 'database/database'
import R from 'ramda'
import { getAdminData, getOrderingState, getTableState } from 'lib/Constant'
import * as firebase from 'firebase'
import { markReadMessage } from 'lib/actions/notification'
import { showNotification } from './showNotification'

export const FETCH_ORDERING_BEGIN = 'FETCH_ORDERING_BEGIN'
export const FETCH_ORDERING_SUCCESS = 'FETCH_ORDERING_SUCCESS'
export const FETCH_ORDERING_ERROR = 'FETCH_ORDERING_ERROR'

export const fetchOrderingsBegin = () => ({
  type: FETCH_ORDERING_BEGIN
})

export const fetchOrderingsSuccess = items => ({
  type: FETCH_ORDERING_SUCCESS,
  items: items
})

export const fetchOrderingsError = error => ({
  type: FETCH_ORDERING_ERROR,
  error: error
})

export const fetchOrderings = params => {
  return dispatch => {
    dispatch(fetchOrderingsBegin())
    const ref = database.ref(getAdminData().vid + '/orders')
    ref.once('value')
      .then((snapshot) => {
        dispatch(fetchOrderingsSuccess(snapshot.val()))
      })
      .then(() => {
        ref.on('value', (result) => {
          dispatch(fetchOrderingsSuccess(result.val()))
        })
      })
      .catch((error) => console.log(error))
  }
}

export const changeOrderStatus = (orderingId, newStatus) => {
  return dispatch => {
    const employeeData = getAdminData()
    const orderingData = getOrderingState().items
    const tableData = getTableState().items
    let currentOrder = orderingData[orderingId]

    currentOrder.status = newStatus

    firebase.database().ref(employeeData.vid + '/orders/').child(orderingId).set(currentOrder)

    let table = tableData[currentOrder.tableId]

    table.status = 'Còn trống'
    table['lastOrderingId'] = ''

    const ref = firebase.database().ref(employeeData.vid + '/tables').child(currentOrder.tableId)
    ref.set(table)

    const messageId = firebase.database().ref(getAdminData().vid + '/notifications/').push().key

    firebase.database().ref(getAdminData().vid + '/notifications/').child(messageId).set({
      id: messageId,
      message: table.name + ': Xác nhận đã hoàn tất thanh toán',
      type: 'waiter',
      orderingId: orderingId,
      tableId: currentOrder.tableId,
      requiredDeleteFood: 'no',
      read: 'no'
    })

    showNotification('topCenter', 'success', 'Cập nhập trạng thái thành công')

    dispatch(fetchOrderings())
  }
}
