import { database } from 'database/database'
import R from 'ramda'
import { getAdminData, getOrderingState, getTableState } from 'lib/Constant'
import * as firebase from 'firebase'
import { markReadMessage } from 'lib/actions/notification'

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

export const changeOrderFoodStatus = (orderingId, itemIndex, newStatus) => {
  return dispatch => {
    const employeeData = getAdminData()
    const orderingData = getOrderingState().items
    let currentOrder = orderingData[orderingId]

    currentOrder.items[itemIndex].status = newStatus

    const totalPrice = R.pipe(
      R.values,
      R.map(item => {
        if (item.status === 'Hết món') {
          return 0
        } else {
          return item.currentPrice * item.quantity
        }
      }),
      R.sum
    )(currentOrder.items)

    currentOrder.totalPrice = totalPrice

    firebase.database().ref(employeeData.vid + '/orders/').child(orderingId).set(currentOrder)

    dispatch(fetchOrderings())
  }
}

export const removeFood = (notificationId, orderingId, itemIndex, confirmDeleted) => {
  return dispatch => {
    const employeeData = getAdminData()
    const orderingData = getOrderingState().items
    const tableData = getTableState().items
    let currentOrder = orderingData[orderingId]
    const foodName = currentOrder.items[itemIndex].name

    if (confirmDeleted) {
      currentOrder.items = R.remove(itemIndex, 1)(currentOrder.items)
    } else {
      currentOrder.items[itemIndex]['note'] = 'Thức ăn đang được chế biến không thể hủy!'
    }

    const totalPrice = R.pipe(
      R.values,
      R.map(item => {
        if (item.status === 'Hết món') {
          return 0
        } else {
          return item.currentPrice * item.quantity
        }
      }),
      R.sum
    )(currentOrder.items)

    currentOrder.totalPrice = totalPrice

    firebase.database().ref(employeeData.vid + '/orders/').child(orderingId).set(currentOrder)

    dispatch(markReadMessage(notificationId))
    dispatch(fetchOrderings())

    const currentTable = tableData[currentOrder.tableId]
    const messageId = firebase.database().ref(getAdminData().vid + '/notifications/').push().key

    let message = currentTable.name + ': món ăn ' + foodName + ' đã được hủy'

    if (!confirmDeleted) {
      message = currentTable.name + ': món ăn ' + foodName + ' không được hủy'
    }

    firebase.database().ref(getAdminData().vid + '/notifications/').child(messageId).set({
      id: messageId,
      message: message,
      type: 'waiter',
      orderingId: orderingId,
      tableId: currentOrder.tableId,
      requiredDeleteFood: 'no',
      read: 'no'
    })
  }
}
