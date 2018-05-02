import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import { tableHeader, fetchOrderings, deleteOrdering, sortByKey, searchByKeyword, changePagination } from 'lib/actions/ordering'
import TableListing from 'components/admin/table/TableListing'
import { updateActiveLink } from 'ducks/admin'
import ContentLoading from 'components/ContentLoading'

class FoodList extends ReactQueryParams {
  componentDidMount() {
    this.props.dispatch(fetchOrderings())
    this.props.dispatch(updateActiveLink('orderings'))
  }

  render() {
    const { error, dispatch } = this.props
    let { orderingState } = this.props

    if (orderingState.items) {
      orderingState.items = R.values(orderingState.items)
    }

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
                itemState={orderingState}
                tableHeader={tableHeader()}
                viewHeader='Danh sách Hóa đơn'
                arrLink={{ create: 'ordering-create', edit: 'ordering-edit', view: 'ordering-view', list: 'orderings' }}
                deleteItem={deleteOrdering}
                dispatch={dispatch}
                sortByKey={sortByKey}
                searchFunc={searchByKeyword}
                visableCreateButton={true}
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
  orderingState: state.ordering
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(FoodList)
