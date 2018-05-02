import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'

import ErrorMessage from 'components/ErrorMessage'
import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import { viewLabelHeader, deleteBooking } from 'lib/actions/booking'
import TableViewItem from 'components/admin/table/TableViewItem'

class BookingView extends ReactQueryParams {
  render() {
    const { error, loading, bookings, dispatch } = this.props
    const params = this.queryParams

    if (error) {
      return (
        <ContentLoading
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    if (loading) {
      return (
        <ContentLoading
          message='Đang tải dữ liệu ...'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          {error && <ErrorMessage text={error} />}
          <TableViewItem
            viewLabelHeader={viewLabelHeader()}
            viewHeader='Thông tin Lịch hẹn'
            arrLink={{ list: 'bookings', edit: 'booking-edit' }}
            data={bookings[params.index]}
            subHeader={bookings[params.index].name}
            deleteItem={deleteBooking}
            itemIndex={params.index}
            items={bookings}
            dispatch={dispatch}
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
)(BookingView)
