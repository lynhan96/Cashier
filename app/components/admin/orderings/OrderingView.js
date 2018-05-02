import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { priceToString } from 'lib/objects'
import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import OrderingNotFound from 'components/OrderingNotFound'

class OrderingView extends ReactQueryParams {
  render() {
    const { error, loading, orderings } = this.props
    const params = this.queryParams
    const arrLink = { list: 'orderings' }
    const itemIndex = params.index

    let items = []
    let ordering = null

    if (orderings) {
      ordering = orderings[itemIndex]

      if (ordering.items) {
        items = ordering.items
      }
    }

    if (ordering == null || !ordering) {
      return <OrderingNotFound/>
    }

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
          <div className='row'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h4 className='title' style={style.header}>{'Mã hóa đơn: ' + ordering.transactionId}</h4>
                <h4 className='title' style={style.header}>{'Trạng thái: ' + ordering.status}</h4>
              </div>
              <div className='card-content'style={{ width: '100%', float: 'left', padding: '40px 20px' }}>
                <div className='row'>
                  <div className='col-md-12'>
                    <Link to={arrLink.list} className='btn btn-success btn-round'>
                      Trở lại
                    </Link>
                  </div>
                  <div className='col-md-12'>
                    <h4 style={style.textHeader}>{'Ngày tạo hóa đơn: ' + ordering.createdAt}</h4>
                  </div>
                  <div className='col-sm-4'>
                    Nhân viên phục vụ:
                    <strong style={{marginLeft: '10px'}}>{ordering.employeeName ? ordering.employeeName : ''}</strong><br/>
                  </div>
                  <div className='col-xs-12 table-responsive' style={{marginTop: '20px'}}>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th>Hình ảnh</th>
                          <th>Món ăn</th>
                          <th>Trạng thái</th>
                          <th>Số lưọng</th>
                          <th>Gía tiền</th>
                          <th>Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((value, index) => {
                          const image = R.values(value.imageUrl)

                          return (
                            <tr key={index}>
                              <td>
                                <img src={ image.length > 0 ? image[0] : '' } style={{ objectFit: 'contain', width: '70px', height: '70px' }}/>
                              </td>
                              <td>{value.name}</td>
                              <td>{value.status}</td>
                              <td>{value.quantity}</td>
                              <td>{priceToString(value.currentPrice)}</td>
                              <td>{priceToString(value.currentPrice * value.quantity)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className='col-xs-12'>
                    <div className='table-responsive'>
                      <table className='table'>
                        <tbody>
                          <tr>
                            <th>Phương thức thanh toán:</th>
                            <td style={{borderTop: '1px solid #ddd'}}>Tiền mặt</td>
                          </tr>
                          <tr>
                            <th>Tông tiền:</th>
                            <td>{priceToString(ordering.totalPrice)}</td>
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
                            <td>{priceToString(ordering.totalPrice)}</td>
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
  name: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  quantity: {
    userSelect: 'none'
  },
  header: {
    textAlign: 'center',
    fontSize: '25px'
  },
  description: {
    textAlign: 'center',
    fontSize: '20px'
  },
  status: {
    textAlign: 'center',
    fontSize: '20px',
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '20px',
    margin: '8px 0'
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '30px'
  },
  deleteFood: {
    float: 'left',
    textAlign: 'center',
    fontSize: '17px',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    margin: '8px 5px',
    fontWeight: '500'
  }
}
