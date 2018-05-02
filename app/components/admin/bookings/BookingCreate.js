import React, {Component} from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import { createBooking, editFieldInfo } from 'lib/actions/booking'
import TableCreateItem from 'components/admin/table/TableCreateItem'

class BookingCreate extends Component {
  render() {
    const { loading, dispatch } = this.props

    if (loading) {
      return (
        <ContentLoading
          message='Đang Cập nhập dữ liệu ...'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <TableCreateItem
            editFieldInfo={editFieldInfo()}
            editHeader='Thêm Lịch hẹn'
            subHeader=''
            submitCreate={createBooking}
            arrLink={{ list: 'bookings' }}
            dispatch={dispatch}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.booking.loading,
  error: state.booking.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(BookingCreate)
