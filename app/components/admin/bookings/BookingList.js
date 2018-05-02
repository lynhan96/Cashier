import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import { tableHeader, fetchBookings, deleteBooking, sortByKey, searchByKeyword, changePagination } from 'lib/actions/booking'
import TableListing from 'components/admin/table/TableListing'
import { updateActiveLink } from 'ducks/admin'
import ContentLoading from 'components/ContentLoading'

class BookingList extends ReactQueryParams {
  componentDidMount() {
    this.props.dispatch(fetchBookings())
    this.props.dispatch(updateActiveLink('bookings'))
  }

  render() {
    const { bookingState, error, dispatch } = this.props

    if (error) {
      return (
        <ContentLoading
          error={error}
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='col-md-12'>
              <TableListing
                itemState={bookingState}
                tableHeader={tableHeader()}
                viewHeader='Danh sách Lịch hẹn'
                arrLink={{ create: 'booking-create', edit: 'booking-edit', view: 'booking-view', list: 'bookings' }}
                deleteItem={deleteBooking}
                dispatch={dispatch}
                sortByKey={sortByKey}
                searchFunc={searchByKeyword}
                error={error}
                changePagination={changePagination}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bookingState: state.booking
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(BookingList)
