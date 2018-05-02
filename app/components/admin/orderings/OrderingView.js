import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ErrorMessage from 'components/ErrorMessage'
import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import { showConfirmAlertDeleteItem } from 'lib/actions/showNotification'
import { deleteOrdering } from 'lib/actions/ordering'

class OrderingView extends ReactQueryParams {
  render() {
    const { error, loading, orderings, dispatch } = this.props
    const params = this.queryParams
    const arrLink = { create: 'ordering-create', edit: 'ordering-edit', view: 'ordering-view', list: 'orderings' }
    const itemIndex = params.index
    const ordering = orderings[itemIndex]

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
          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header' data-background-color='purple'>
                    <h4 className='title'>Thông tin hóa đơn</h4>
                  </div>
                  <div className='card-content'>
                    <div style={{ textAlign: 'center' }}>
                      <Link to={arrLink.list} className='btn btn-success btn-round' style={style.buttonMargin}>
                        Trở lại
                      </Link>
                      <Link to={arrLink.edit + '?index=' + itemIndex} className='btn btn-primary btn-round' style={style.buttonMargin}>
                        Chỉnh sửa dữ liệu
                      </Link>
                      <button onClick={showConfirmAlertDeleteItem(deleteOrdering, ordering.id, dispatch, itemIndex, 'view')} type='button' className='btn btn-danger btn-round' style={style.buttonMargin}>
                        Xóa dữ liệu
                      </button>
                    </div>
                    <div className='row'>
                      <h4 style={style.textHeader}>{'Ngày thanh toán: ' + ordering.createdAt }</h4>
                      <h4 style={style.textHeader}>{'Trạng thái: ' + ordering.status }</h4>
                      <div className='col-sm-4'>
                        Nhân viên thanh toán:
                        <address>
                          <strong>Nguyễn Văn A</strong><br/>
                        </address>
                      </div>
                      <div className='col-sm-4'>
                        Khách hàng:
                        <address>
                          <strong>{ordering.userName}</strong><br/>
                        </address>
                      </div>
                      <div className='col-xs-12 table-responsive'>
                        <table className='table table-striped'>
                          <thead>
                            <tr>
                              <th>Món ăn</th>
                              <th>Số lưọng</th>
                              <th>Trạng thái</th>
                              <th>Gía tiền</th>
                              <th>Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordering.items.map((value, index) => {
                              return (
                                <tr key={index}>
                                  <td>{value.name}</td>
                                  <td>{value.quantity}</td>
                                  <td>{value.status}</td>
                                  <td>{value.currentPrice + ' VNĐ'}</td>
                                  <td>{value.currentPrice + ' VNĐ'}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className='col-xs-12'>
                        <h4>{'Ngày xuất hóa đơn: ' + ordering.updatedAt}</h4>
                        <div className='table-responsive'>
                          <table className='table'>
                            <tbody>
                              <tr>
                                <th>Phương thức thanh toán:</th>
                                <td>Tiền mặt</td>
                              </tr>
                              <tr>
                                <th>Tông tiền:</th>
                                <td>{ordering.totalPrice + ' VNĐ'}</td>
                              </tr>
                              <tr>
                                <th>Mã khuyễn mãi:</th>
                                <td>0 VNĐ</td>
                              </tr>
                              <tr>
                                <th>Thuế (0%)</th>
                                <td>0 VNĐ</td>
                              </tr>
                              <tr>
                                <th>Tổng tiền đã có VAT</th>
                                <td>{ordering.totalPrice + ' VNĐ'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderings: state.ordering.items,
  loading: state.food.loading,
  error: state.food.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(OrderingView)

const style = {
  buttonMargin: {
    margin: '5px 15px 10px 15px'
  },
  imageItem: {
    width: '120px',
    margin: '10px',
    objectFit: 'contain'
  },
  textHeader: {
    padding: '0 15px'
  }
}
