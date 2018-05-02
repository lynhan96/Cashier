import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'

import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import TableEditItem from 'components/admin/table/TableEditItem'
import { editBooking, deleteBooking, editFieldInfo, selectFieldData } from 'lib/actions/booking'

class BookingEdit extends ReactQueryParams {
  render() {
    const { error, bookings, dispatch } = this.props
    const params = this.queryParams

    if (error) {
      return (
        <ContentLoading
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <TableEditItem
            editFieldInfo={editFieldInfo()}
            selectFieldData={selectFieldData()}
            editHeader='Chỉnh sửa thông tin Lịch đặt bàn'
            arrLink={{ list: 'bookings', view: 'booking-view' }}
            itemIndex={params.index}
            subHeader={bookings[params.index].name}
            submitEdit={editBooking}
            items={bookings}
            dispatch={dispatch}
            deleteItem={deleteBooking}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bookings: state.booking.items,
  loading: state.booking.loading,
  error: state.booking.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(BookingEdit)
