import request from 'request-promise'
import { SubmissionError } from 'redux-form'
import R from 'ramda'
import moment from 'moment'

import Navigator from 'lib/Navigator'
import { showNotification } from './showNotification'
import { makeRequestOptions } from '../requestHeader'

export const FETCH_BOOKING_BEGIN = 'FETCH_BOOKING_BEGIN'
export const FETCH_BOOKING_SUCCESS = 'FETCH_BOOKING_SUCCESS'
export const FETCH_BOOKING_ERROR = 'FETCH_BOOKING_ERROR'
export const FETCH_BOOKING_SORT_VALUE = 'FETCH_BOOKING_SORT_VALUE'
export const FETCH_BOOKING_TOTAL_PAGE = 'FETCH_BOOKING_TOTAL_PAGE'

export const tableHeader = () => ([
  { 'fieldName': 'id', 'viewTitle': 'ID' },
  { 'fieldName': 'name', 'viewTitle': 'Tên' },
  { 'fieldName': 'people', 'viewTitle': 'Số người' },
  { 'fieldName': 'time', 'viewTitle': 'Thời gian' },
  { 'fieldName': 'status', 'viewTitle': 'Trạng thái' }
])

export const viewLabelHeader = () => ([
  { 'fieldName': 'name', 'viewTitle': 'Tên' },
  { 'fieldName': 'status', 'viewTitle': 'Trạng thái' },
  { 'fieldName': 'time', 'viewTitle': 'Ngày đặt' },
  { 'fieldName': 'createdAt', 'viewTitle': 'Ngày tạo' },
  { 'fieldName': 'description', 'viewTitle': 'Ghi chú' }
])

export const editFieldInfo = () => ([
  { 'fieldName': 'name', 'viewTitle': 'Tên', isRequired: true, type: 'text' },
  { 'fieldName': 'phoneNumber', 'viewTitle': 'Số điện thoại', isRequired: true, type: 'text' },
  { 'fieldName': 'people', 'viewTitle': 'Số người', isRequired: true, type: 'number' },
  { 'fieldName': 'time', 'viewTitle': 'Thời gian', type: 'datetime', isRequired: true },
  { 'fieldName': 'description', 'viewTitle': 'Ghi chú', isRequired: true, type: 'textarea' }
])

export const fetchBookingsBegin = () => ({
  type: FETCH_BOOKING_BEGIN
})

export const fetchBookingsSuccess = bookings => ({
  type: FETCH_BOOKING_SUCCESS,
  items: bookings
})

export const fetchBookingsError = error => ({
  type: FETCH_BOOKING_ERROR,
  error: error
})

export const fetchBookingsSortValue = (fieldName, sortType) => ({
  type: FETCH_BOOKING_SORT_VALUE,
  sortType: sortType,
  sortBy: fieldName
})

export const fetchBookingsTotalPage = totalPage => ({
  type: FETCH_BOOKING_TOTAL_PAGE,
  totalPage: totalPage
})

export const searchByKeyword = (event, dispatch) => {
  dispatch(fetchBookings({keyword: event.target.value}))
  dispatch(fetchBookingsSortValue('id', 'AtoZ'))
}

export const changePagination = (offset, sortFieldName, sortType, dispatch) => {
  if (sortType === 'AtoZ') {
    dispatch(fetchBookings({sortBy: sortFieldName, sortDir: 'asc', offset: offset}))
  } else {
    dispatch(fetchBookings({sortBy: sortFieldName, sortDir: 'desc', offset: offset}))
  }
}

export const sortByKey = (datas, fieldName, currentFieldName, sortType, dispatch) => {
  dispatch(fetchBookingsBegin())

  if (sortType === 'AtoZ' && fieldName === currentFieldName) {
    dispatch(fetchBookingsSortValue(fieldName, 'ZtoA'))
    dispatch(fetchBookings({sortBy: fieldName, sortDir: 'desc'}))
  } else {
    dispatch(fetchBookingsSortValue(fieldName, 'AtoZ'))
    dispatch(fetchBookings({sortBy: fieldName, sortDir: 'asc'}))
  }
}

export const fetchBookings = params => {
  return dispatch => {
    dispatch(fetchBookingsBegin())
    request(makeRequestOptions(params, 'bookings')).then(body => {
      if (body.code === 401 || body.code === 400 || body.code === 414) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        dispatch(fetchBookingsSuccess(body.data.items))
        dispatch(fetchBookingsTotalPage(body.data.totalPage))
      }
    })
    .catch(err => dispatch(fetchBookingsError(err)))
  }
}

const createItem = (params, url, dispatch, props) => {
  return new Promise((resolve) => {
    request(makeRequestOptions(params, url)).then(body => {
      if (body.code === 0) {
        showNotification('topRight', 'success', 'Tạo dữ liệu thành công')
        Navigator.push('bookings')
      } else if (body.code === 401 || body.code === 400) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        showNotification('topRight', 'error', 'Quá trình tạo dữ liệu xảy ra lỗi')
      }

      return resolve
    })
    .catch(function (err) {
      if (err.message) {
        showNotification('topRight', 'error', err.message)
        throw new SubmissionError({ _error: err.message })
      } else {
        showNotification('topRight', 'error', JSON.stringify(err))
        throw new SubmissionError({ _error: JSON.stringify(err) })
      }
    })
  })
}

export const createBooking =
  (values, dispatch, props) => {
    const url = 'createBooking'
    let params = values
    if (!params.time) params['time'] = new Date()
    dispatch(fetchBookingsBegin())
    createItem(params, url, dispatch, props)
  }

export const deleteBooking = (dispatch, bookingId, itemIndex, currentAction) => {
  const url = 'deleteBooking'

  return new Promise((resolve) => {
    request(makeRequestOptions({bookingId: bookingId}, url)).then(body => {
      if (body.code === 0) {
        if (currentAction === 'list') {
          dispatch(fetchBookings())
        } else {
          Navigator.push('bookings')
        }

        showNotification('topRight', 'info', 'Xóa dữ liệu thành công')
      } else if (body.code === 401 || body.code === 400) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        showNotification('topRight', 'error', 'Quá trình xóa dữ liệu xảy ra lỗi')
      }

      return resolve
    })
    .catch(function (err) {
      if (err.message) {
        showNotification('topRight', 'error', err.message)
        throw new SubmissionError({ _error: err.message })
      } else {
        showNotification('topRight', 'error', JSON.stringify(err))
        throw new SubmissionError({ _error: JSON.stringify(err) })
      }
    })
  })
}
