import { database } from 'database/database'
import R from 'ramda'
import { getAdminData, getOrderingState, getTableState } from 'lib/Constant'
import * as firebase from 'firebase'
import { showNotification } from './showNotification'
import { sortObjectsByKeyAtoZ, sortObjectsByKeyZtoA } from 'lib/objects'

export const FETCH_ORDERING_BEGIN = 'FETCH_ORDERING_BEGIN'
export const FETCH_ORDERING_SUCCESS = 'FETCH_ORDERING_SUCCESS'
export const FETCH_ORDERING_ERROR = 'FETCH_ORDERING_ERROR'
export const FETCH_ORDERING_SORT_VALUE = 'FETCH_ORDERING_SORT_VALUE'
export const FETCH_ORDERING_TOTAL_PAGE = 'FETCH_ORDERING_TOTAL_PAGE'

export const tableHeader = () => ([
  { 'fieldName': 'id', 'viewTitle': 'ID' },
  { 'fieldName': 'transactionId', 'viewTitle': 'Mã hóa đơn' },
  { 'fieldName': 'status', 'viewTitle': 'Trạng thái' },
  { 'fieldName': 'totalPrice', 'viewTitle': 'Tổng tiền' },
  { 'fieldName': 'createdAt', 'viewTitle': 'Thời gian' }
])

export const viewLabelHeader = () => ([
])

export const editFieldInfo = () => ([
])

export const selectFieldData = () => ({
})

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

export const fetchOrderingsSortValue = (fieldName, sortType) => ({
  type: FETCH_ORDERING_SORT_VALUE,
  sortType: sortType,
  sortBy: fieldName
})

export const fetchOrderingsTotalPage = totalPage => ({
  type: FETCH_ORDERING_TOTAL_PAGE,
  totalPage: totalPage
})

export const searchByKeyword = (event, dispatch) => {
  dispatch(fetchOrderings({keyword: event.target.value}))
  dispatch(fetchOrderingsSortValue('id', 'AtoZ'))
}

export const changePagination = (offset, sortFieldName, sortType, dispatch) => {
  if (sortType === 'AtoZ') {
    dispatch(fetchOrderings({sortBy: sortFieldName, sortDir: 'asc', offset: offset}))
  } else {
    dispatch(fetchOrderings({sortBy: sortFieldName, sortDir: 'desc', offset: offset}))
  }
}

export const sortByKey = (datas, fieldName, currentFieldName, sortType, dispatch) => {
  dispatch(fetchOrderingsBegin())

  if (sortType === 'AtoZ' && fieldName === currentFieldName) {
    dispatch(fetchOrderingsSortValue(fieldName, 'ZtoA'))
  } else {
    dispatch(fetchOrderingsSortValue(fieldName, 'AtoZ'))
  }

  dispatch(fetchOrderings())
}

const makeOrderingData = (datas, state, params) => {
  let offset = 0
  if (params && params.offset) {
    offset = params.offset
  }

  if (state.sortType === 'AtoZ') {
    return sortObjectsByKeyAtoZ(datas, state.sortBy, offset, 50)
  }

  return sortObjectsByKeyZtoA(datas, state.sortBy, offset, 50)
}

export const fetchOrderings = params => {
  return dispatch => {
    dispatch(fetchOrderingsBegin())
    const orderingState = getOrderingState()

    const ref = database.ref(getAdminData().vid + '/orders')

    ref.once('value')
      .then((snapshot) => {
        dispatch(fetchOrderingsTotalPage(R.values(snapshot.val()).length / 50))
        dispatch(fetchOrderingsSuccess(makeOrderingData(snapshot.val(), orderingState, params)))
      })
      .then(() => {
        ref.on('value', (result) => {
          dispatch(fetchOrderingsTotalPage(R.values(result.val()).length / 50))
          dispatch(fetchOrderingsSuccess(makeOrderingData(result.val(), orderingState, params)))
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
    let currentOrder = R.find(R.propEq('id', orderingId))(orderingData)

    currentOrder.status = newStatus
    currentOrder['cashierName'] = employeeData.name
    currentOrder['cashierToken'] = employeeData.token

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
