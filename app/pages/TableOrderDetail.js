import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import Navigator from 'lib/Navigator'

import { isAdmin } from 'components/wrappers/isAdmin'
import { priceToString } from 'lib/objects'
import { fetchOrderings, changeOrderStatus } from 'lib/actions/ordering'
import { fetchNotifications } from 'lib/actions/notification'
import OrderingNotFound from 'components/OrderingNotFound'

class TableOrderDetail extends ReactQueryParams {
  constructor (props) {
    super(props)

    this.changeStatus = this.changeStatus.bind(this)
  }

  changeStatus(orderingID, newStatus) {
    this.props.dispatch(changeOrderStatus(orderingID, newStatus))

    Navigator.push('/map-tables')
  }

  componentDidMount() {
    this.props.dispatch(fetchNotifications())
    this.props.dispatch(fetchOrderings())
  }

  render() {
    const { orderings, tables } = this.props
    let params = this.queryParams
    const currentTable = tables[params.tableId]

    if (!currentTable.lastOrderingId || currentTable.lastOrderingId === '') {
      return <OrderingNotFound/>
    }

    let items = []
    let ordering = null

    if (orderings) {
      ordering = orderings[currentTable.lastOrderingId]

      if (ordering && ordering.items) {
        items = ordering.items
      }
    }

    if (ordering == null || !ordering) {
      return <OrderingNotFound/>
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h3 className='title' style={style.header}>{'Hóa đơn: ' + currentTable.name}</h3>
                <h4 className='title' style={style.header}>{'(' + priceToString(ordering.totalPrice) + ')'}</h4>
                <h4 className='title' style={style.header}>{ordering.status}</h4>
              </div>
              <div className='card-content'style={{ width: '100%', float: 'left', padding: '40px 20px' }}>
                <div className='row'>
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
                  <div className='col-xs-12' style={style.actionButton}>
                    <Link
                      className='button-delete-food'
                      to='#'
                      style={style.deleteFood}
                      onClick={e => { e.preventDefault() }}
                    >Nhập mã khuyến mãi</Link>
                    <Link
                      className='button-confirm-food'
                      to='#'
                      style={style.deleteFood}
                      onClick={e => { e.preventDefault() }}
                    >Yêu cầu sửa đổi hóa đơn</Link>
                    <Link
                      className='button-done-food'
                      to='#'
                      style={style.deleteFood}
                      onClick={e => { e.preventDefault() }}
                    >Xuất hóa đơn</Link>
                    <Link
                      className='button-confirm-food'
                      to='#'
                      style={style.deleteFood}
                      onClick={e => { e.preventDefault(); this.changeStatus(ordering.id, 'Đã thanh toán') }}
                    >Xác nhận hóa đơn đã thanh toán</Link>
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
  tables: state.table.items
})

export default R.pipe(
  isAdmin,
  connect(mapStateToProps)
)(TableOrderDetail)

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
